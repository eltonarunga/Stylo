# Stylo - AI Headshot Generator

Stylo is a web-based application that uses generative AI to transform your selfies into professional-looking headshots. Upload a photo, choose your desired style, and let our AI do the rest.

## Features

*   **AI Headshot Stylizer:** Transform your selfies into professional headshots with a variety of clothing styles.
*   **AI Outfit Generator:** (Coming Soon) Generate different outfits for your headshots.
*   **Image Upload:** Easily upload your images in-app.
*   **Style Selection:** Choose from a wide range of clothing styles (e.g., Suit, Blazer, Sweater).
*   **Background Selection:** Select from various background options (e.g., Studio, Office, Wall).
*   **Aspect Ratio Control:** Adjust the aspect ratio of your generated headshot.
*   **Custom Prompts:** Fine-tune your results with custom text prompts.
*   **Dark Mode:** A sleek, eye-friendly dark mode for a better user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A Google Gemini API key.

### Installation

1.  Clone the repo:
    ```sh
    git clone https://github.com/your-username/stylo.git
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env.local` file in the root of the project and add your Gemini API key:
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  Start the development server:
    ```sh
    npm run dev
    ```
5.  Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).

## Usage

1.  **Upload a Photo:** Click on the upload area to select a selfie from your device.
2.  **Choose a Style:** Select a clothing style from the available options.
3.  **Select a Background:** Pick a background that suits your preference.
4.  **(Optional) Add a Custom Prompt:** Enter any additional details or modifications you'd like to see.
5.  **Generate:** Click the "Stylize Me" button and wait for the AI to generate your new headshot.
6.  **Save:** Once you're happy with the result, you can download your new headshot.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server for modern web projects.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Google Gemini API:** The generative AI model used for image transformation.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
