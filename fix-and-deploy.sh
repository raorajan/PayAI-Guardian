#!/bin/bash

# PayAI Guardian - Complete Fix & Deployment Script
# Run this on your Ubuntu server: bash fix-and-deploy.sh

set -e  # Exit on error

echo "=========================================="
echo "🚀 PayAI Guardian - Fix & Deploy"
echo "=========================================="
echo ""

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "📍 Node: $(node --version)"
echo "📍 npm: $(npm --version)"
echo ""

# Step 1: Stop all services
echo "=========================================="
echo "🛑 Step 1: Stopping all PM2 services..."
echo "=========================================="
pm2 delete all 2>/dev/null || true
pm2 save
echo "✅ All services stopped"
echo ""

# Step 2: Pull latest code
echo "=========================================="
echo "📥 Step 2: Pulling latest code..."
echo "=========================================="
cd ~/payai-guardian
git pull
echo "✅ Code updated"
echo ""

# Step 3: Build backend services
echo "=========================================="
echo "🔨 Step 3: Building backend services..."
echo "=========================================="
cd ~/payai-guardian/server

FAILED_SERVICES=()

for service in api-gateway user-services payment-service fraud-detection-service ai-banking-service analytics-service notification-service; do
    echo ""
    echo "🔧 Building $service..."
    cd $service
    
    # Clean previous build
    rm -rf dist
    
    # Install dependencies (production only)
    npm ci --omit=dev
    
    # Build
    if npm run build; then
        echo "✅ $service built successfully"
    else
        echo "❌ $service build FAILED"
        FAILED_SERVICES+=($service)
    fi
    
    cd ..
done

if [ ${#FAILED_SERVICES[@]} -gt 0 ]; then
    echo ""
    echo "❌ The following services failed to build:"
    for service in "${FAILED_SERVICES[@]}"; do
        echo "   - $service"
    done
    echo ""
    echo "Please check the errors above and fix them manually."
    exit 1
fi

echo ""
echo "✅ All backend services built successfully!"
echo ""

# Step 4: Start backend with PM2
echo "=========================================="
echo "🚀 Step 4: Starting backend services..."
echo "=========================================="
cd ~/payai-guardian/server

pm2 start ecosystem.config.js --env production
pm2 save

echo "✅ Backend services started"
echo ""

# Step 5: Build frontend
echo "=========================================="
echo "🌐 Step 5: Building frontend..."
echo "=========================================="
cd ~/payai-guardian/client

# Clean previous build
rm -rf .next node_modules

# Install ALL dependencies (including devDependencies for Tailwind)
echo "📦 Installing dependencies (this may take a minute)..."
npm ci

# Build
echo "🔨 Building Next.js..."
npm run build

echo "✅ Frontend built successfully"
echo ""

# Step 6: Start frontend
echo "=========================================="
echo "🚀 Step 6: Starting frontend..."
echo "=========================================="

# Kill anything on port 3002
if lsof -i :3002 > /dev/null 2>&1; then
    echo "⚠️  Port 3002 in use, killing process..."
    fuser -k 3002/tcp 2>/dev/null || true
    sleep 2
fi

pm2 start npm --name "payai-frontend" -- start
pm2 save

echo "✅ Frontend started"
echo ""

# Step 7: Wait for services to initialize
echo "=========================================="
echo "⏳ Step 7: Waiting for services to start..."
echo "=========================================="
sleep 5

# Step 8: Check status
echo "=========================================="
echo "📊 Final Status:"
echo "=========================================="
pm2 status
echo ""

# Step 9: Show recent logs
echo "=========================================="
echo "📋 Recent Logs (last 20 lines):"
echo "=========================================="
pm2 logs --lines 20 --nostream
echo ""

# Step 10: Summary
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
echo ""
echo "📍 Services:"
echo "   Frontend:     http://your-server:3002"
echo "   API Gateway:  http://your-server:8000"
echo "   API Docs:     http://your-server:8000/api-docs"
echo ""
echo "🔍 Useful commands:"
echo "   pm2 status              - Check service status"
echo "   pm2 logs                - View live logs"
echo "   pm2 restart <name>      - Restart a service"
echo "   pm2 logs <name>         - View logs for specific service"
echo ""
echo "⚠️  If any service shows 'errored', run:"
echo "   pm2 logs <service-name> --lines 100"
echo "   to see the error details"
echo ""
