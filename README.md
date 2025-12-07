# 🍌 Banana Scanner

**Banana Scanner** is a cutting-edge **LLM Brand Presence Test** application. It leverages the power of Google's **Gemini 3** models to determine if a specific brand or company is present in the training data of large language models, specifically through the lens of image generation.

![Banana Scanner Logo](./public/banana-scanner-logo.png)

## 🚀 Overview

In the age of Generative AI, understanding how your brand is perceived—or if it's "known" at all—by AI models is crucial. Banana Scanner automates this discovery process using a sophisticated multi-agent workflow.

### How it Works

1.  **Enrichment**: The app uses **Gemini 3 Pro** with **Google Search Grounding** to gather real-time, accurate information about your company.
2.  **Anonymization**: It then "scrubs" the description, removing all specific brand names and identifiers, leaving only a generic description of the services and value proposition.
3.  **Generation**: Using **Gemini 3 Pro Image**, it generates a professional infographic based *only* on the anonymized description.
4.  **Analysis**: Finally, **Gemini 3 Pro (Vision)** analyzes the generated image to see if the model "hallucinated" or correctly associated the generic description with your specific brand logo or name.

If your brand appears in the image generated from a generic description, it's a strong indicator of high brand presence in the model's training data!

## ✨ Features

*   **Brand Presence Test**: The core agentic workflow described above.
*   **Simple Connectivity Test**: A quick check to verify API connectivity and model access.
*   **Modern UI**: Built with Next.js and Tailwind CSS for a clean, responsive experience.
*   **Gemini 3 Integration**: Showcases the latest capabilities of Google's Gemini 3 Pro and Gemini 3 Pro Image models.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **AI Models**:
    *   `gemini-3-pro-preview` (Text, Reasoning, Vision)
    *   `gemini-3-pro-image-preview` (Image Generation)
*   **SDK**: Google Generative AI SDK

## 🏁 Getting Started

### Prerequisites

*   Node.js v18+
*   A Google Gemini API Key (with access to Gemini 3 models)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/modestapproach/banana-context.git
    cd banana-context
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your API key:
    ```bash
    GOOGLE_GEMINI_API_KEY=your_api_key_here
    ```
    *(Note: The current codebase has a hardcoded key for hackathon demo purposes, but using env vars is recommended for production).*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Navigate to `http://localhost:3000` in your browser.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built for the Vibe to Vibe Hackathon.*
