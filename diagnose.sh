#!/bin/bash

# PayAI Guardian - Server Diagnostic Script
# Run this on your Ubuntu server: bash diagnose.sh

echo "=========================================="
echo "🔍 PayAI Guardian Server Diagnostics"
echo "=========================================="
echo ""

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "📍 Node version: $(node --version)"
echo "📍 npm version: $(npm --version)"
echo "📍 PM2 version: $(pm2 --version 2>/dev/null || echo 'Not installed')"
echo ""

# Check directory structure
echo "📁 Checking directory structure..."
if [ -d "$HOME/payai-guardian/server" ]; then
    echo "✅ Server directory exists"
else
    echo "❌ Server directory NOT found"
    exit 1
fi

if [ -d "$HOME/payai-guardian/client" ]; then
    echo "✅ Client directory exists"
else
    echo "❌ Client directory NOT found"
    exit 1
fi
echo ""

# Check PM2 status
echo "🚀 Current PM2 Status:"
pm2 status
echo ""

# Check which services are errored
echo "❌ Services in ERROR state:"
pm2 jlist | grep -E '"name":"payai-[^"]*","status":"errored"' | grep -oP '"name":"[^"]*"' || echo "None"
echo ""

# Check logs for errored services
echo "📋 Recent errors from PM2 logs:"
pm2 logs --lines 30 --nostream 2>&1 | grep -i "error\|failed\|exception" | tail -20
echo ""

# Check tsconfig files
echo "🔧 Checking TypeScript configurations..."
cd ~/payai-guardian/server
for service in api-gateway user-services payment-service fraud-detection-service ai-banking-service analytics-service notification-service; do
    if [ -f "$service/tsconfig.json" ]; then
        if grep -q "ignoreDeprecations" "$service/tsconfig.json"; then
            echo "✅ $service/tsconfig.json - Has ignoreDeprecations fix"
        else
            echo "❌ $service/tsconfig.json - MISSING ignoreDeprecations fix"
        fi
    else
        echo "❌ $service/tsconfig.json - File not found"
    fi
done
echo ""

# Check if dist folders exist
echo "📦 Checking build artifacts:"
for service in api-gateway user-services payment-service fraud-detection-service ai-banking-service analytics-service notification-service; do
    if [ -d "$service/dist" ]; then
        echo "✅ $service/dist - Built"
    else
        echo "❌ $service/dist - NOT BUILT"
    fi
done
echo ""

# Check client build
echo "🌐 Checking frontend:"
cd ~/payai-guardian/client
if [ -d ".next" ]; then
    echo "✅ .next folder exists"
else
    echo "❌ .next folder NOT found - Frontend not built"
fi

if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
    if [ -d "node_modules/@tailwindcss/postcss" ]; then
        echo "✅ @tailwindcss/postcss installed"
    else
        echo "❌ @tailwindcss/postcss NOT installed"
    fi
else
    echo "❌ node_modules NOT found"
fi
echo ""

# Check ports
echo "🔌 Checking port availability:"
for port in 3002 8000 8001 8002 8003 8004 8005 8006; do
    if lsof -i :$port > /dev/null 2>&1; then
        PID=$(lsof -ti :$port)
        echo "⚠️  Port $port - IN USE by PID $PID"
    else
        echo "✅ Port $port - Available"
    fi
done
echo ""

# Check .env files
echo "🔐 Checking environment files:"
if [ -f "$HOME/payai-guardian/server/api-gateway/.env" ]; then
    echo "✅ api-gateway/.env exists"
else
    echo "❌ api-gateway/.env MISSING"
fi

if [ -f "$HOME/payai-guardian/server/user-services/.env" ]; then
    echo "✅ user-services/.env exists"
else
    echo "❌ user-services/.env MISSING"
fi

if [ -f "$HOME/payai-guardian/client/.env" ]; then
    echo "✅ client/.env exists"
else
    echo "❌ client/.env MISSING"
fi
echo ""

# Check git status
echo "📝 Git status:"
cd ~/payai-guardian
git status --short | head -20
echo ""

echo "=========================================="
echo "✅ Diagnostics Complete!"
echo "=========================================="
echo ""
echo "📌 Next steps:"
echo "1. If tsconfig shows ❌, run: git pull"
echo "2. If services are errored, run: pm2 delete all"
echo "3. Rebuild everything with the deployment script"
echo ""
