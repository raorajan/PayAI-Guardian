#!/bin/bash
echo "=== PayAI Guardian Domain Setup ==="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}1. Uploading Nginx configuration...${NC}"
scp -q nginx.conf ubuntu@210.79.128.199:~/payaiguardian-nginx.conf
echo -e "${GREEN}   ✓ Configuration uploaded${NC}"
echo ""

echo -e "${YELLOW}2. Setting up Nginx on server...${NC}"
ssh ubuntu@210.79.128.199 << 'ENDSSH'
# Copy to nginx sites-available
sudo cp ~/payaiguardian-nginx.conf /etc/nginx/sites-available/payaiguardian

# Create symbolic link
sudo ln -sf /etc/nginx/sites-available/payaiguardian /etc/nginx/sites-enabled/payaiguardian

# Test configuration
sudo nginx -t 2>&1 | tail -2

# Reload nginx
sudo systemctl reload nginx

echo "   ✓ Nginx configured"
ENDSSH
echo ""

echo -e "${YELLOW}3. Updating GitHub Secrets (manual step required)...${NC}"
echo ""
echo -e "${RED}Please add/update these secrets in GitHub:${NC}"
echo "   NEXT_PUBLIC_API_URL=https://api.payaiguardian.raorajan.pro"
echo "   FRONTEND_URL=https://payaiguardian.raorajan.pro"
echo ""
echo "   Go to: https://github.com/raorajan/PayAI-Guardian/settings/secrets/actions"
echo ""

echo -e "${YELLOW}4. Updating local .env file...${NC}"
cat > client/.env << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=https://api.payaiguardian.raorajan.pro
EOF
echo -e "${GREEN}   ✓ Local .env updated${NC}"
echo ""

echo -e "${GREEN}=== Setup Complete! ===${NC}"
echo ""
echo "Next Steps:"
echo "1. Configure DNS in Hostinger:"
echo "   - Add A record: payaiguardian → 210.79.128.199"
echo "   - Add A record: api.payaiguardian → 210.79.128.199"
echo ""
echo "2. Update GitHub secrets (see above)"
echo ""
echo "3. Push to trigger deployment:"
echo "   git add ."
echo "   git commit -m 'Configure domain: payaiguardian.raorajan.pro'"
echo "   git push origin master"
echo ""
echo "4. After DNS propagates, access:"
echo "   Frontend: https://payaiguardian.raorajan.pro"
echo "   Backend:  https://api.payaiguardian.raorajan.pro"
