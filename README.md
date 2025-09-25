# Stylo - AI Headshot Stylizer

<p align="center">
  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq5LxdaRI_sb3HsOOQzQXSDlCIN44kboMb6c-4NWtmAs8NOKJ4pvcvlDilmDkgCUUpiVZupPYx9z6CrSMv3GfAke4lfrGOyE9CP78SkuBSlVkGd0944dznPPAaKxY6qlFynKXyAq_hgg4X6bkf_-efipNT8anpkdgBWlSZ53HuZXs0xX1xg5BhzU8JigNgpvgZIuIPDF2oCQPgtzRCgPusYSjRbCD5llgTgJvwg6GShFm42MFl0SRacq29cL3q8Pgy_iOI6fGg7aM2" alt="Stylo Logo" width="200">
</p>

<h1 align="center">Reimagine Your Wardrobe with AI</h1>

Stylo is a modern web application that leverages the power of Google's Gemini AI to transform your selfies into professional headshots. Upload a photo, choose from a variety of clothing and background styles, and let AI generate a new, polished image for you in seconds.

---

## ✨ Features

-   **AI-Powered Headshot Generation**: Utilizes the `gemini-2.5-flash-image-preview` model to intelligently edit your photo.
-   **Multiple Clothing Styles**: Choose from a curated list of professional and casual clothing options.
-   **Customizable Backgrounds**: Select from studio backdrops, office environments, cityscapes, and more.
-   **Selectable Aspect Ratios**: Generate images in square (1:1), portrait (3:4), or story (9:16) formats.
-   **Custom Text Prompts**: Add specific instructions (e.g., "add glasses," "change hair to blond") for fine-tuned results.
-   **Live Camera & Image Upload**: Take a new photo with your device's camera or upload an existing one.
-   **Responsive Design**: A mobile-first interface that works beautifully on all screen sizes.
-   **Light & Dark Mode**: An accessible UI that respects your system preferences or can be toggled manually.

## 🛠️ Tech Stack

-   **Frontend**: React & TypeScript
-   **Backend**: Serverless Function (Proxy)
-   **AI Model**: Google Gemini (`gemini-2.5-flash-image-preview`)
-   **AI SDK**: `@google/genai`
-   **Styling**: Tailwind CSS
-   **Module Loading**: ES Modules with Import Maps

## 🚀 Getting Started

### Prerequisites

-   A modern web browser (e.g., Chrome, Firefox, Safari).
-   A local development server that can run the frontend and the serverless function proxy (e.g., Vercel CLI, Netlify CLI).
-   A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Configuration

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stylo.git
    cd stylo
    ```

2.  **Configure API Key:**

    This application uses a backend proxy (`/api/generate`) to protect your API key. You need to make your key available as an environment variable to this server-side function.

    -   Create a file named `.env.local` (or equivalent for your platform) in the root of your project.
    -   Add your API key to this file:
        ```
        API_KEY="YOUR_API_KEY_HERE"
        ```
    -   Ensure that your deployment platform is configured to use this environment variable.

3.  **Run the application:**
    -   Start your local development server from the root of the project directory (e.g., `vercel dev`).
    -   The server will serve the frontend and make the `/api/generate` endpoint available.
    -   The application will open in your default browser.

## 🔒 Security

The Gemini API key is handled securely on the server-side by a proxy endpoint located in `api/generate.ts`. This endpoint receives requests from the frontend, adds the secret API key from its environment variables, and forwards the request to the Gemini API. This architecture ensures the API key is **never exposed in the browser**.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available for anyone to use. Please refer to the `LICENSE` file for more details. (Note: A license file has not yet been added).
