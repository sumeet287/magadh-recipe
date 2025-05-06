#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first."
    exit 1
fi

# Check if pm2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ pm2 is not installed. Please install it first."
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🏗️ Building frontend..."
pnpm run build

echo "🔄 Restarting PM2 process..."
pm2 delete craft-bihar-frontend || true
pm2 start pnpm --name "craft-bihar-frontend" -- run start

echo "✅ Deployment complete!"
echo "📊 Checking PM2 status..."
pm2 status 