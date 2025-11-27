# EasyJoey - Clinic Management System

A modern, SEO-friendly website for EasyJoey, a clinic management system designed for healthcare professionals.

## Features

- **Header**: Fixed navigation with responsive mobile menu
- **Hero Section**: Compelling headline with call-to-action buttons
- **Features Section**: 8 key features displayed in a grid layout
- **Pricing Section**: Three-tier pricing plans (Starter, Professional, Enterprise)
- **Footer**: Complete with product links, social media, and legal links

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI (Button, Card)
- **Icons**: Lucide React
- **Font**: Inter

## Design

- **Primary Color**: #009688 (Teal)
- **Font Family**: Inter
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles with CSS variables
│   ├── layout.tsx       # Root layout with SEO metadata
│   └── page.tsx         # Home page
├── components/
│   ├── ui/              # ShadCN UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features grid
│   ├── Pricing.tsx      # Pricing cards
│   └── Footer.tsx       # Site footer
└── lib/
    └── utils.ts         # Utility functions
```

## Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
