#!/bin/bash
echo "=== Setting up PayAI Guardian Frontend on Port 3001 ==="

# Create PM2 ecosystem file for frontend
cat > ~/payai-guardian/client/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'payaiguardian-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/payai-guardian/client',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      NEXT_PUBLIC_API_URL: 'https://api.payaiguardian.raorajan.pro'
    }
  }]
};
EOF

echo "✓ PM2 config created"
echo ""
echo "Now run these commands on the server:"
echo ""
echo "cd ~/payai-guardian/client"
echo "npm install --production"
echo "pm2 start ecosystem.config.js"
echo "pm2 save"
echo ""
echo "Then upload the fixed nginx.conf and reload"
