# Advanced Workflows - Sora & Higgsfield

**← Back to [Main Skill](../SKILL.md)**

Professional techniques for multi-shot sequences, character consistency, and production optimization.

---

## Multi-Shot Sequence Production

### The Challenge
Keeping your character looking the same across multiple videos (AI doesn't remember previous videos).

### The Solution: Write Down Your Character Details

Create a reference guide for your character before you start:

```
CHARACTER: Detective Sarah Chen

DISTINCTIVE FEATURES (use in EVERY prompt):
- Gray tailored blazer with silver buttons
- White collared shirt
- Silver watch on left wrist (always visible)
- Black straight hair in low bun
- Square silver earrings
- Black slim trousers
- Black leather ankle boots

FACIAL FEATURES ANCHOR:
"Sharp jawline, defined cheekbones, almond-shaped eyes, straight nose"

REUSABLE PROMPT BLOCK:
"Detective Chen (gray blazer with silver buttons, white shirt, silver watch
visible on left wrist, black hair in low bun, square silver earrings, sharp
jawline, defined cheekbones, almond eyes, maintain exact facial features)"
```

### Shot-by-Shot Workflow

**Shot 1: Establishing**
```
Wide shot. Detective Chen (gray blazer with silver buttons, white shirt,
silver watch visible on left wrist, black hair in low bun, square silver
earrings) enters precinct, walks five steps to desk. Same character details
throughout sequence.
```

**Shot 2: Action**
```
Same Detective Chen (gray blazer with silver buttons, white shirt, silver
watch on left wrist, black hair in low bun, square silver earrings, sharp
jawline, defined cheekbones, maintain exact features from previous shot).
Medium shot, sets briefcase on desk, opens it.
```

**Shot 3: Close-up**
```
Same Detective Chen (maintain all previous features: gray blazer, silver
watch, low bun, square earrings, same facial structure). Close-up, pulls
file from briefcase, expression focused.
```

### Key Principles

1. **Repeat exact phrasing** for distinctive elements
2. **Include "maintain exact/same features"** instruction
3. **Reference previous shot** explicitly
4. **Use distinctive accessories** (watch, jewelry, specific clothing items)
5. **Anchor facial features** with consistent description

---

## Remix Iteration Strategy

### Change One Thing at a Time

Only change **ONE thing** at a time so you know what makes it better or worse.

### Example Progression

**Base prompt:**
```
Cinematic. Woman walks through park. Camera follows.
```

**Iteration 1 - Add style detail:**
```
1970s film aesthetic. Woman walks through park. Camera follows.
```

**Iteration 2 - Improve action (keep previous change):**
```
1970s film aesthetic. Woman takes six steps down park path, pauses at bench.
Camera follows.
```

**Iteration 3 - Add lighting (keep all previous):**
```
1970s film aesthetic. Woman takes six steps down park path, pauses at bench.
Camera follows at eye level. Golden hour sunlight through trees, dappled shadows.
```

**Iteration 4 - Add color palette (keep all previous):**
```
1970s film aesthetic. Woman takes six steps down park path, pauses at bench.
Camera follows at eye level. Golden hour sunlight through trees, dappled shadows.
Colors: forest green, gold light, burgundy jacket, earth brown path.
```

### Recovery Protocol

**If a shot fails repeatedly:**

1. **Freeze the camera** - Change to static shot
2. **Simplify action** - One simple movement only
3. **Clear the background** - Minimal environment
4. **Test** - Does it work now?
5. **Layer complexity** - Add back elements one at a time

### Example Recovery

**Failing prompt:**
```
FPV drone weaving through crowded market, following running child through
vendors, shoppers, stalls, under canopies, around corners
```

**Step 1 - Freeze camera:**
```
Static wide shot. Child runs straight down market aisle between two vendor stalls.
```

**Step 2 - If that works, add camera back:**
```
Camera pans right following child running straight down market aisle between
two vendor stalls.
```

**Step 3 - If that works, add environment:**
```
Camera pans right following child running straight down market aisle between
two vendor stalls selling fruit, colorful awnings overhead.
```

**Step 4 - If that works, increase camera complexity:**
```
Camera tracking shot following child running down market aisle between vendor
stalls selling fruit, colorful awnings overhead.
```

Add things back slowly until you find what makes it fail.

---

## Higgsfield Multi-Model Workflow

### Choosing the Right Model

**Use Sora 2 when:**
- Photorealistic output required
- High production value commercial content
- Natural human motion and lip sync
- Complex lighting and cinematography

**Use WAN 2.5 when:**
- Camera control is paramount
- Need synchronized audio generation
- Character animation with expressive movements
- 10-second clips with complex camera choreography

**Use Kling when:**
- Dialogue-heavy scenes with multiple speakers
- Character interaction primary focus
- Specific lip-sync requirements

**Use Popcorn when:**
- Need to replace character in existing video
- Maintaining motion while changing appearance

### Integrated Pipeline Example

**Project: Product launch video with spokesperson**

1. **Generate base scene** (Sora 2 Max)
   - High-quality studio environment
   - Professional lighting setup
   - Product on pedestal

2. **Add camera movement** (WAN Camera Controls)
   - Dolly zoom on product
   - Adjust motion timing
   - Refine framing

3. **Generate spokesperson** (Kling)
   - Dialogue-focused generation
   - Speaking to camera
   - Lip sync with script

4. **Composite in Higgsfield Canvas**
   - Combine product shot with spokesperson
   - Match lighting
   - Create cohesive final video

---

## Character Consistency Techniques

### Technique 1: Distinctive Accessories

**Why it works:** Unique accessories are easier for AI to remember than faces.

**Examples:**
- Specific watch (silver Rolex on left wrist)
- Unique jewelry (gold chain with pendant)
- Distinctive clothing (red backpack with yellow straps)
- Props (always carrying blue notebook)

**Implementation:**
```
Shot 1: "Woman (red backpack with yellow straps, blue denim jacket,
silver hoop earrings)"

Shot 2: "Same woman (red backpack with yellow straps visible, blue denim
jacket, silver hoop earrings, maintain exact facial features from previous shot)"
```

---

### Technique 2: Color Anchors

**Why it works:** Specific colors help maintain consistency.

**Bad approach:**
```
Shot 1: "Man in dark suit"
Shot 2: "Same man in suit"
```
Result: Suit color changes

**Good approach:**
```
Shot 1: "Man in charcoal gray suit with burgundy tie"
Shot 2: "Same man (charcoal gray suit with burgundy tie, maintain colors)"
```

---

### Technique 3: Explicit Facial Feature Description

**Why it works:** Anchoring specific facial features helps AI maintain consistency.

**Template:**
```
"[Character name] ([distinctive features], [jawline description],
[eye shape], [nose description], maintain exact facial features and proportions)"
```

**Example:**
```
"Marcus (square jaw, wide-set brown eyes, aquiline nose, prominent cheekbones,
maintain exact facial structure)"
```

---

### Technique 4: Reference Image Workflow

**Best approach for character consistency:**

1. Generate initial character shot with detailed prompt
2. Save best result as reference image
3. Use image as input for subsequent shots
4. Add text prompt: "Same character [action]"

**Benefits:**
- Visual consistency guaranteed
- Less prompt repetition needed
- Facial features locked in
- Clothing/accessories consistent

---

## Production Optimization Checklist

### Pre-Generation

- [ ] **Define shot purpose** - What is this shot achieving?
- [ ] **Select model** - Sora/WAN/Kling based on requirements
- [ ] **Choose resolution** - Square format if aspect allows (50% credit savings)
- [ ] **Set duration** - Start with 4-5s, extend only if needed
- [ ] **Prepare references** - Character images, location photos, style examples
- [ ] **Draft dialogue** - If speech required, write brief, natural lines

### Prompt Construction

- [ ] **Establish style** - Lead with aesthetic/preset
- [ ] **Specify camera** - Shot type, angle, movement
- [ ] **One clear action** - Subject doing one main thing
- [ ] **Count beats** - "Three steps," "five-second pour"
- [ ] **Light sources** - Type, direction, quality
- [ ] **3-5 color anchors** - Specific hue names
- [ ] **Distinctive details** - Character markers for consistency
- [ ] **Audio cues** - Foley and ambient sounds
- [ ] **Dialogue block** - Separate from visual description if applicable

### Post-Generation

- [ ] **Review for issues** - Physics violations, inconsistencies
- [ ] **Iterate one variable** - If changes needed, modify one element
- [ ] **Use camera controls** - Higgsfield presets for motion refinement
- [ ] **Check continuity** - If multi-shot, verify consistency
- [ ] **Stitch sequences** - Combine shots in editing software
- [ ] **Add effects** - Transitions, color grading, sound design
- [ ] **Export settings** - Final resolution and format

---

## Common Production Scenarios

### Scenario 1: Product Demo Video

**Goal:** Create professional 30-second product demo

**Workflow:**
1. Create 6-8 short clips (4-5s each)
2. Mix angles: Wide → Medium → Close-up → Detail
3. Use consistent lighting across all shots
4. Add camera presets: Dolly In, Orbit, Crash Zoom
5. Stitch in editing software
6. Add music and voiceover

**Credit optimization:** Use square format for testing, final render at 16:9

---

### Scenario 2: Character Story Sequence

**Goal:** Multi-shot narrative with same character

**Workflow:**
1. Create character design document
2. Generate initial hero shot (save as reference image)
3. Use reference image + prompts for subsequent shots
4. Repeat distinctive details in every prompt
5. Progress camera: Wide → Medium → Close-up
6. Maintain environmental continuity

**Key challenge:** Character consistency
**Solution:** Reference image workflow + explicit feature descriptions

---

### Scenario 3: Social Media Content

**Goal:** Quick, engaging 8-second clip

**Workflow:**
1. Start with square format (1:1) for Instagram
2. Simple prompt: One action, handheld camera, authentic lighting
3. Add dialogue if needed (5-8 words max)
4. Test variations quickly (square = 50% fewer credits)
5. Export best result

**Credit optimization:** Square format, 4-8s duration, minimal iterations

---

## Troubleshooting Decision Tree

### Problem: Character looks different across shots

**Try:**
1. Use reference image from first shot as input
2. Repeat exact distinctive features (accessories, clothing)
3. Add "maintain exact facial features from previous shot"
4. Simplify: Focus on 2-3 unique markers

---

### Problem: Video quality is inconsistent

**Try:**
1. Use same style preset across all shots
2. Specify consistent lighting (direction, color temperature)
3. Match camera angles (all eye-level, or all low-angle)
4. Use same color palette

---

### Problem: Generation fails repeatedly

**Try:**
1. Freeze camera (static shot)
2. Simplify action (one movement only)
3. Reduce environment details
4. Remove complex lighting
5. Use beginner-level prompt structure

---

### Problem: Timing feels off

**Try:**
1. Count actions explicitly ("three steps," "five-second pour")
2. Use shorter duration (4s instead of 8s)
3. Simplify to single action per shot
4. Add temporal markers ("in first second," "at end")

---

### Problem: Colors keep changing

**Try:**
1. Specify 3-5 exact colors (not "warm tones")
2. Use color names in environment ("walnut counter," "brass lamp")
3. Add color palette line at end of prompt
4. Test with simpler prompt first

---

## Advanced Prompt Patterns

### Pattern 1: Layered Environment

**Structure:**
```
Foreground: [sharp focus elements]
Midground: [subject and main action]
Background: [soft focus environment]
```

**Example:**
```
Foreground: Water ripples in sharp focus. Midground: Perfume bottle emerging.
Background: Soft black gradient.
```

---

### Pattern 2: Progressive Lighting

**Structure:**
```
Shot 1: [Initial lighting state]
Shot 2: [Same environment, lighting evolved]
Shot 3: [Final lighting state]
```

**Example:**
```
Shot 1: Golden hour, dappled sunlight through trees
Shot 2: Same forest, golden hour with more shadows (deeper into forest)
Shot 3: Same forest, backlit by sun breaking through canopy
```

---

### Pattern 3: Emotional Blocking

**Structure:**
```
[Character A action showing emotion] [Character B reaction showing opposite]
```

**Example:**
```
Detective leans forward (aggressive), Suspect shifts back (defensive)
```

---

## Learning Path

### Week 1: Foundations
- Master 5 core principles
- Generate 10+ single-shot videos
- Test different style presets
- Experiment with camera movements

### Week 2: Sequences
- Create first 3-shot sequence
- Practice character consistency
- Add dialogue to clips
- Use remix iteration strategy

### Week 3: Professional
- Produce 30-60 second story (10+ shots)
- Use reference images
- Combine multiple models
- Optimize credit usage

### Week 4: Mastery
- Develop personal style
- Build prompt template library
- Create character design documents
- Plan productions with shot lists

---

**← Back to [Main Skill](../SKILL.md)** | **See also:** [Progressive Examples](PROGRESSIVE_EXAMPLES.md) | [Technical Reference](TECHNICAL_REFERENCE.md)
