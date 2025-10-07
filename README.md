# Stylo - AI Headshot Stylizer

<p align="center">
  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq5LxdaRI_sb3HsOOQzQXSDlCIN44kboMb6c-4NWtmAs8NOKJ4pvcvlDilmDkgCUUpiVZupPYx9z6CrSMv3GfAke4lfrGOyE9CP78SkuBSlVkGd0944dznPPAaKxY6qlFynKXyAq_hgg4X6bkf_-efipNT8anpkdgBWlSZ53HuZXs0xX1xg5BhzU8JigNgpvgZIuIPDF2oCQPgtzRCgPusYSjRbCD5llgTgJvwg6GShFm42MFl0SRacq29cL3q8Pgy_iOI6fGg7aM2" alt="Stylo Logo" width="200">
</p>

<h1 align="center">Reimagine Your Wardrobe with AI</h1>

Stylo is a modern web application that leverages the power of Google's Gemini AI to transform your selfies into professional headshots. Upload a photo, choose from a variety of clothing and background styles, and let AI generate a new, polished image for you in seconds.

---

## ✨ Features

-   **User Authentication**: A mock sign-in flow to demonstrate a complete app structure.
-   **AI-Powered Headshot Generation**: Utilizes the `gemini-2.5-flash-image` model to intelligently edit your photo.
-   **Multiple Clothing Styles**: Choose from a curated list of professional and casual clothing options.
-   **Customizable Backgrounds**: Select from studio backdrops, office environments, cityscapes, and more.
-   **Selectable Aspect Ratios**: Generate images in square (1:1), portrait (3:4), or story (9:16) formats.
-   **Custom Text Prompts**: Add specific instructions (e.g., "add glasses," "change hair to blond") for fine-tuned results.
-   **Live Camera & Image Upload**: Take a new photo with your device's camera or upload an existing one.
-   **Responsive Design**: A mobile-first interface that works beautifully on all screen sizes.
-   **Light & Dark Mode**: An accessible UI that respects your system preferences or can be toggled manually.

## 🛠️ Tech Stack

-   **Frontend**: React & TypeScript
-   **Backend**: Node.js Serverless Functions
-   **AI Model**: Google Gemini (`gemini-2.5-flash`, `gemini-2.5-flash-image`)
-   **AI SDK**: `@google/genai`
-   **Styling**: Tailwind CSS
-   **Module Loading**: ES Modules with Import Maps
-   **Deployment**: Optimized for Vercel

## 🚀 Deployment on Vercel

This project is optimized for a seamless deployment on [Vercel](https://vercel.com).

1.  **Fork this repository** to your GitHub account.
2.  **Create a new project** on your Vercel dashboard and import the forked repository.
3.  **Configure Environment Variables**:
    -   In the project settings on Vercel, navigate to "Environment Variables".
    -   Add a new variable named `API_KEY`.
    -   Paste your Google Gemini API key as the value.
    -   Ensure the variable is available to all environments (Production, Preview, Development).
4.  **Deploy**: Vercel will automatically detect the project structure and deploy it. The serverless functions in the `/api` directory will be built and deployed as well.

Your application will be live at the domain provided by Vercel. For local development, use the Vercel CLI (`vercel dev`).

## 🔒 Security Considerations

Security is a top priority for this application. Here are the key measures and considerations:

-   **API Key Protection**: The Gemini API key is stored as a server-side environment variable and is **never exposed to the client's browser**. All API calls to Gemini are routed through secure serverless functions (`/api/generate`, `/api/generate-outfit`).
-   **Server-Side Input Validation**: All incoming requests to the API endpoints are strictly validated to prevent malformed data from being processed. This includes checks on data types, formats (e.g., for image data), and length to mitigate risks of injection or abuse.
-   **Mock Authentication**: The sign-in flow (`/api/auth`) is a **demonstration mock and is not secure for production use**. A production-ready implementation would require:
    -   Password hashing and salting (e.g., using `bcrypt`).
    -   Secure user storage in a database.
    -   Generation of signed, expiring JSON Web Tokens (JWTs).
-   **Rate Limiting**: For a production deployment, it is highly recommended to implement rate limiting on the API endpoints to prevent abuse and control costs. This can be done using Vercel's platform features or with services like Upstash.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available for anyone to use. Please refer to the `LICENSE` file for more details. (Note: A license file has not yet been added).