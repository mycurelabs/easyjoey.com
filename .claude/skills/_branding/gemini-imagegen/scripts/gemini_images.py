"""
Gemini Image Generation Library

A simple Python library for generating and editing images with the Gemini API.

Usage:
    from gemini_images import GeminiImageGenerator
    
    gen = GeminiImageGenerator()
    gen.generate("A sunset over mountains", "sunset.png")
    gen.edit("input.png", "Add clouds", "output.png")

Environment:
    GEMINI_API_KEY - Required API key
"""

import os
from pathlib import Path
from typing import Literal, Optional, Union, List, Tuple

from PIL import Image
from google import genai
from google.genai import types
from google.api_core.exceptions import ResourceExhausted


AspectRatio = Literal["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"]
ImageSize = Literal["1K", "2K", "4K"]
Model = Literal["gemini-2.5-flash-image", "gemini-3-pro-image-preview"]


class QuotaExhaustedError(Exception):
    """Raised when the Gemini API quota is exhausted.

    This provides a user-friendly wrapper around ResourceExhausted errors
    with helpful context about fallback options.

    Attributes:
        prompt: The prompt or instruction that couldn't be processed
        fallback_url: URL to the web interface (separate quota)
        images: Optional list of input images involved
    """

    def __init__(
        self,
        prompt: str,
        message: str = "API quota exhausted",
        fallback_url: str = "https://gemini.google.com",
        images: Optional[List[str]] = None,
    ):
        self.prompt = prompt
        self.fallback_url = fallback_url
        self.images = images or []
        super().__init__(message)

    def format_error(self) -> str:
        """Format a user-friendly error message with fallback instructions."""
        separator = "━" * 60
        header = "=" * 60

        msg = f"""
{header}
ERROR: API Quota Exhausted
{header}

Your prompt:
{separator}
{self.prompt}
{separator}
"""

        if self.images:
            images_list = "\n".join(f"  - {img}" for img in self.images)
            msg += f"\nInput images ({len(self.images)}):\n{images_list}\n"

        msg += f"""
Fallback Instructions:
1. Visit {self.fallback_url}
2. Copy your prompt above and paste it
"""

        if self.images:
            msg += f"3. Upload the {len(self.images)} image(s) listed above\n"

        msg += """4. The web interface has a SEPARATE quota from the API

Note: You can continue working immediately via the web interface.
Check your API usage at: https://ai.dev/usage?tab=rate-limit
"""

        return msg


class GeminiImageGenerator:
    """High-level interface for Gemini image generation."""
    
    FLASH = "gemini-2.5-flash-image"
    PRO = "gemini-3-pro-image-preview"
    
    def __init__(self, api_key: Optional[str] = None, model: Model = FLASH):
        """Initialize the generator.
        
        Args:
            api_key: Gemini API key (defaults to GEMINI_API_KEY env var)
            model: Default model to use
        """
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise EnvironmentError("GEMINI_API_KEY not set")
        
        self.client = genai.Client(api_key=self.api_key)
        self.model = model
    
    def _build_config(
        self,
        aspect_ratio: Optional[AspectRatio] = None,
        image_size: Optional[ImageSize] = None,
        google_search: bool = False,
    ) -> types.GenerateContentConfig:
        """Build generation config."""
        kwargs = {"response_modalities": ["TEXT", "IMAGE"]}
        
        img_config = {}
        if aspect_ratio:
            img_config["aspect_ratio"] = aspect_ratio
        if image_size:
            img_config["image_size"] = image_size
        
        if img_config:
            kwargs["image_config"] = types.ImageConfig(**img_config)
        
        if google_search:
            kwargs["tools"] = [{"google_search": {}}]
        
        return types.GenerateContentConfig(**kwargs)
    
    def generate(
        self,
        prompt: str,
        output: Union[str, Path],
        *,
        model: Optional[Model] = None,
        aspect_ratio: Optional[AspectRatio] = None,
        image_size: Optional[ImageSize] = None,
        google_search: bool = False,
    ) -> Tuple[Path, Optional[str]]:
        """Generate an image from a text prompt.
        
        Args:
            prompt: Text description
            output: Output file path
            model: Override default model
            aspect_ratio: Output aspect ratio
            image_size: Output resolution
            google_search: Enable Google Search grounding (Pro only)
        
        Returns:
            Tuple of (output path, optional text response)
        """
        output = Path(output)
        config = self._build_config(aspect_ratio, image_size, google_search)

        try:
            response = self.client.models.generate_content(
                model=model or self.model,
                contents=[prompt],
                config=config,
            )

            text = None
            for part in response.parts:
                if part.text:
                    text = part.text
                elif part.inline_data:
                    part.as_image().save(output)

            return output, text

        except ResourceExhausted as e:
            raise QuotaExhaustedError(
                prompt=prompt,
                message="API quota exhausted while generating image",
            ) from e
    
    def edit(
        self,
        input_image: Union[str, Path, Image.Image],
        instruction: str,
        output: Union[str, Path],
        *,
        model: Optional[Model] = None,
        aspect_ratio: Optional[AspectRatio] = None,
        image_size: Optional[ImageSize] = None,
    ) -> Tuple[Path, Optional[str]]:
        """Edit an existing image.
        
        Args:
            input_image: Input image (path or PIL Image)
            instruction: Edit instruction
            output: Output file path
            model: Override default model
            aspect_ratio: Output aspect ratio
            image_size: Output resolution
        
        Returns:
            Tuple of (output path, optional text response)
        """
        output = Path(output)

        # Track the input path for error reporting
        input_path = str(input_image) if isinstance(input_image, (str, Path)) else None

        if isinstance(input_image, (str, Path)):
            input_image = Image.open(input_image)

        config = self._build_config(aspect_ratio, image_size)

        try:
            response = self.client.models.generate_content(
                model=model or self.model,
                contents=[instruction, input_image],
                config=config,
            )

            text = None
            for part in response.parts:
                if part.text:
                    text = part.text
                elif part.inline_data:
                    part.as_image().save(output)

            return output, text

        except ResourceExhausted as e:
            raise QuotaExhaustedError(
                prompt=instruction,
                message="API quota exhausted while editing image",
                images=[input_path] if input_path else [],
            ) from e
    
    def compose(
        self,
        instruction: str,
        images: List[Union[str, Path, Image.Image]],
        output: Union[str, Path],
        *,
        model: Optional[Model] = None,
        aspect_ratio: Optional[AspectRatio] = None,
        image_size: Optional[ImageSize] = None,
    ) -> Tuple[Path, Optional[str]]:
        """Compose multiple images into one.
        
        Args:
            instruction: Composition instruction
            images: List of input images (up to 14)
            output: Output file path
            model: Override default model (Pro recommended)
            aspect_ratio: Output aspect ratio
            image_size: Output resolution
        
        Returns:
            Tuple of (output path, optional text response)
        """
        output = Path(output)

        # Load images and track paths for error reporting
        loaded = []
        image_paths = []
        for img in images:
            if isinstance(img, (str, Path)):
                image_paths.append(str(img))
                loaded.append(Image.open(img))
            else:
                loaded.append(img)

        config = self._build_config(aspect_ratio, image_size)
        contents = [instruction] + loaded

        try:
            response = self.client.models.generate_content(
                model=model or self.PRO,  # Pro recommended for composition
                contents=contents,
                config=config,
            )

            text = None
            for part in response.parts:
                if part.text:
                    text = part.text
                elif part.inline_data:
                    part.as_image().save(output)

            return output, text

        except ResourceExhausted as e:
            raise QuotaExhaustedError(
                prompt=instruction,
                message="API quota exhausted while composing images",
                images=image_paths,
            ) from e
    
    def chat(self) -> "ImageChat":
        """Start an interactive chat session for iterative refinement."""
        return ImageChat(self.client, self.model)


class ImageChat:
    """Multi-turn chat session for iterative image generation."""
    
    def __init__(self, client: genai.Client, model: Model):
        self.client = client
        self.model = model
        self._chat = client.chats.create(
            model=model,
            config=types.GenerateContentConfig(response_modalities=["TEXT", "IMAGE"]),
        )
        self.current_image: Optional[Image.Image] = None

    def send(
        self,
        message: str,
        image: Optional[Union[Image.Image, str, Path]] = None,
    ) -> Tuple[Optional[Image.Image], Optional[str]]:
        """Send a message and optionally an image.
        
        Returns:
            Tuple of (generated image or None, text response or None)
        """
        contents = [message]
        if image:
            if isinstance(image, (str, Path)):
                image = Image.open(image)
            contents.append(image)
        
        response = self._chat.send_message(contents)
        
        text = None
        img = None
        for part in response.parts:
            if part.text:
                text = part.text
            elif part.inline_data:
                img = part.as_image()
                self.current_image = img
        
        return img, text
    
    def reset(self):
        """Reset the chat session."""
        self._chat = self.client.chats.create(
            model=self.model,
            config=types.GenerateContentConfig(response_modalities=["TEXT", "IMAGE"]),
        )
        self.current_image = None
