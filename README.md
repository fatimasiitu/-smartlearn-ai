# SmartLearn AI

AI-powered personalized learning platform created as a diploma project at International Information Technology University (IITU).

## Overview

SmartLearn AI is a web learning platform designed around an AI-assisted learning experience. The project combines a multi-page learning interface with an AI tutor that can help users understand course material.

## Features

- AI tutor for general questions and lesson-specific assistance
- Course and lesson pages
- Student dashboard
- Course progress and profile pages
- Authentication and onboarding interfaces
- Certificate page
- Interactive lesson steps
- Responsive web UI
- Separate Node.js/Express server for the OpenAI integration

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- OpenAI API
- CORS
- dotenv

## Project Structure

```text
smartlearn-ai/
├── ai-server/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── assets/
├── *.html
├── *.css
├── *.js
├── .gitignore
└── README.md
```

## Running the AI server

1. Open the `ai-server` directory.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```env
OPENAI_API_KEY=your_api_key_here
```

4. Start the server:

```bash
node server.js
```

The server runs on:

```text
http://localhost:3000
```

> Never commit `.env` or a real API key to GitHub.

## Project Context

This project was developed as part of my Bachelor's degree in Information Systems at International Information Technology University (IITU), 2022–2026.

The project combines web development, UI/UX design, and AI integration.
