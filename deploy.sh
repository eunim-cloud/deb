#!/bin/bash

echo "🚀 Vercel 배포를 시작합니다..."
echo ""

# 빌드 확인
if [ ! -d "dist" ]; then
  echo "📦 빌드를 실행합니다..."
  npm run build
fi

echo ""
echo "🔐 Vercel에 로그인합니다..."
vercel login

echo ""
echo "🌐 프로덕션 배포를 진행합니다..."
vercel --prod

echo ""
echo "✅ 배포가 완료되었습니다!"

