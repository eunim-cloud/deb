<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17tTLQb6FBKKYleN7E_Mt6XkLurCzAGWQ

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and set your API keys:
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your API keys:
   - `GEMINI_API_KEY`: Your Gemini API key (for AI features)
   - `VITE_YOUTUBE_API_KEY`: Your YouTube Data API v3 key (for music recommendations)
   
   > **How to get YouTube API Key:**
   > 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   > 2. Create a new project or select an existing one
   > 3. Enable the "YouTube Data API v3"
   > 4. Go to "Credentials" and create an API key
   > 5. Copy the API key to your `.env.local` file

3. Run the app:
   ```bash
   npm run dev
   ```
