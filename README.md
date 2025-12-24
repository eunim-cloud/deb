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

## Deploy to Vercel

### Setting Environment Variables in Vercel

Vercel에서 환경 변수를 설정해야 합니다:

**방법 1: Vercel 대시보드에서 설정**
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. 프로젝트 선택
3. Settings → Environment Variables 메뉴로 이동
4. 다음 환경 변수 추가:
   - `VITE_YOUTUBE_API_KEY`: `AIzaSyBLSOOp2_kNMO3rrRUmbwO75Rl6UZogxeM`
   - `GEMINI_API_KEY`: (필요한 경우)
5. 각 환경(Production, Preview, Development)에 대해 설정
6. 저장 후 재배포

**방법 2: Vercel CLI로 설정**
```bash
vercel env add VITE_YOUTUBE_API_KEY
# 프롬프트에 API 키 입력: AIzaSyBLSOOp2_kNMO3rrRUmbwO75Rl6UZogxeM
# 환경 선택: Production, Preview, Development (모두 선택 권장)
```

환경 변수 설정 후 프로젝트를 재배포하면 유튜브 API가 정상 작동합니다.
