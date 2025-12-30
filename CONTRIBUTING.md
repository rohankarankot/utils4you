# Contributing to Utils4You 🤝

First off, thank you for considering contributing to Utils4You! It's people like you who make this project better for everyone.

This guide will help you get started with your contribution.

## 🏁 Getting Started

### 1. Fork and Clone
Fork the repository on GitHub and clone your fork locally:
```bash
git clone https://github.com/your-username/mydailytools.git
cd mydailytools
```

### 2. Install Dependencies
Make sure you have Node.js 18+ installed.
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory. You can use `.env.example` as a template.
```bash
cp .env.example .env
```
Fill in the following variables (you'll need a [Sanity.io](https://www.sanity.io/) account and project):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`

### 4. Run Locally
```bash
npm run dev
```

## 📂 Project Structure

- `app/`: Next.js App Router pages and global layouts.
  - `(site)/`: Main website pages.
  - `studio/`: Sanity Studio configuration.
- `components/`: Reusable UI components and individual tools (e.g., `EMICalculator.tsx`).
- `lib/`: Utility functions, Sanity client, and SEO helpers.
- `public/`: Static assets like images and fonts.
- `sanity/`: Sanity schemas and local studio setup.
- `tests/`: Unit and integration tests using Vitest.
- `scripts/`: Maintenance and data seeding scripts.

## 🛠️ Contribution Workflow

1. **Create a Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```
2. **Make Changes**: Follow the existing coding style (TypeScript + Tailwind CSS).
3. **Write Tests**: If you're adding a new feature or fixing a bug, please add relevant tests in the `tests/` directory.
4. **Verify Build**: Ensure the project builds without errors.
   ```bash
   npm run build
   ```
5. **Run Tests**: Ensure all tests pass.
   ```bash
   npm run test
   ```

## 📤 Submitting a Pull Request

When you're ready to submit your PR, please ensure it includes:

1. **Clear Description**: Explain what the PR does and why it's needed.
2. **Issue Reference**: Link to any related issues.
3. **Short Video/GIF**: A brief visual description (max 30s) of the new feature or the bug fix in action.
4. **Build Screenshot**: A screenshot of a successful `npm run build` output in your terminal. This confirms the project is production-ready.

Example PR Description:
> Added a new "Unit Converter" tool to the Media category.
> [Video Link/Attachment]
> [Build Screenshot Link/Attachment]

## 📝 Coding Standards

- Use functional components and hooks.
- Use Tailwind CSS for all styling.
- Ensure proper TypeScript types for new components and functions.
- Add descriptive comments for complex logic.

Thank you for contributing! 🚀
