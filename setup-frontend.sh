#!/bin/bash
echo "=== Setting up PayAI Guardian Frontend ==="

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "1. Installing frontend dependencies..."
cd ~/payai-guardian/client
npm install --production 2>&1 | tail -5

echo ""
echo "2. Starting frontend on port 3001..."
pm2 start ecosystem.config.js

echo ""
echo "3. Waiting 3 seconds..."
sleep 3

echo ""
echo "4. Checking PM2 status..."
pm2 list

echo ""
echo "5. Updating Nginx config..."
sudo cp ~/payaiguardian-nginx.conf /etc/nginx/sites-available/payaiguardian
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "6. Saving PM2 processes..."
pm2 save

echo ""
echo "=== Setup Complete! ==="
echo ""
echo "Check if frontend is running:"
curl -I http://localhost:3001
