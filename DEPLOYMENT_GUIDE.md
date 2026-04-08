# 🚀 PayAI Guardian - Deployment Guide

## Overview

Your workflow now supports **individual service deployment**! You can deploy:
- ✅ Frontend independently
- ✅ Each backend microservice independently
- ✅ All backend services at once

---

## 📋 Two Deployment Methods

### Method 1: Automatic (Push to main/master)
When you push code to `main` or `master` branch, **ALL services deploy automatically**.

```bash
git push origin master
# or
git push origin main
```

---

### Method 2: Manual (GitHub Actions UI)

Go to: **GitHub → Your Repo → Actions → Deploy PayAI Guardian → Run workflow**

You'll see checkboxes for each service:

```
☐ Deploy Frontend
☐ Deploy API Gateway (Port 8000)
☐ Deploy User Service (Port 8001)
☐ Deploy Payment Service (Port 8002)
☐ Deploy Fraud Detection (Port 8003)
☐ Deploy AI Banking (Port 8004)
☐ Deploy Analytics (Port 8005)
☐ Deploy Notification (Port 8006)
☐ Deploy ALL Backend Services
```

---

## 🎯 Common Deployment Scenarios

### Scenario 1: Deploy ONLY Frontend
```
✅ Deploy Frontend
☐ Everything else: unchecked
```
**Result**: Only Next.js frontend updates (Port 3002)

---

### Scenario 2: Deploy ONLY API Gateway
```
☐ Deploy Frontend
✅ Deploy API Gateway (Port 8000)
☐ Everything else: unchecked
```
**Result**: Only API Gateway restarts (Port 8000)

---

### Scenario 3: Deploy Specific Services
Example: Updated Payment and User services only
```
☐ Deploy Frontend
☐ Deploy API Gateway
✅ Deploy User Service (Port 8001)
✅ Deploy Payment Service (Port 8002)
☐ Everything else: unchecked
```
**Result**: Only User & Payment services deploy

---

### Scenario 4: Deploy ALL Backend Services
```
☐ Deploy Frontend
✅ Deploy ALL Backend Services
```
**Result**: All 7 backend services deploy (ports 8000-8006)

---

### Scenario 5: Deploy Everything
```
✅ Deploy Frontend
✅ Deploy ALL Backend Services
```
**Result**: Full deployment of frontend + all backend services

---

## 🏗️ Service Architecture

```
Frontend (Next.js) - Port 3002
        ↓
API Gateway - Port 8000
        ↓
    ┌───┴──────────────────┐
    ↓                      ↓
User Service          Payment Service
(Port 8001)           (Port 8002)
    ↓                      ↓
Fraud Detection       AI Banking
(Port 8003)           (Port 8004)
    ↓                      ↓
Analytics            Notification
(Port 8005)          (Port 8006)
```

---

## 🔧 What Each Service Does

| Service | Port | Purpose |
|---------|------|---------|
| **Frontend** | 3002 | Next.js UI application |
| **API Gateway** | 8000 | Request routing, auth, CORS |
| **User Service** | 8001 | User management, authentication |
| **Payment Service** | 8002 | Payment processing |
| **Fraud Detection** | 8003 | Fraud detection & prevention |
| **AI Banking** | 8004 | AI-powered banking assistant |
| **Analytics** | 8005 | Analytics & reporting |
| **Notification** | 8006 | Email, SMS, push notifications |

---

## 📝 Deployment Steps (What Happens)

For **each service**, the workflow:

1. ✅ Pulls latest code from GitHub
2. ✅ Installs dependencies (`npm ci`)
3. ✅ Builds TypeScript (`npm run build`)
4. ✅ Restarts PM2 process
5. ✅ Saves PM2 process list

---

## 🔍 Verify Deployment

### Check on Server:
```bash
ssh ubuntu@your-server

# Check all services
pm2 status

# Check specific service logs
pm2 logs payai-gateway
pm2 logs payai-user-service
pm2 logs payai-frontend

# Check service details
pm2 show payai-gateway
```

### Check via Browser:
- **Frontend**: https://your-domain.com or http://your-ip:3002
- **API Gateway**: http://your-ip:8000
- **Swagger Docs**: http://your-ip:8000/api-docs

### Check via curl:
```bash
# Frontend
curl -I http://your-server-ip:3002

# API Gateway
curl http://your-server-ip:8000

# Health check (if implemented)
curl http://your-server-ip:8000/health
```

---

## ⚡ Quick Commands

### Restart a service manually:
```bash
pm2 restart payai-gateway
pm2 restart payai-user-service
pm2 restart payai-frontend
```

### View logs:
```bash
pm2 logs                    # All services
pm2 logs payai-gateway      # Specific service
pm2 logs --lines 100        # Last 100 lines
```

### Check status:
```bash
pm2 status                  # All services
pm2 list                    # Same as status
```

### Monitor in real-time:
```bash
pm2 monit
```

---

## 🐛 Troubleshooting

### Issue: Service won't start
```bash
# Check logs
pm2 logs payai-gateway --lines 50

# Try manual restart
pm2 restart payai-gateway

# Check if port is in use
netstat -tlnp | grep 8000
```

### Issue: Build fails
```bash
# SSH into server
cd ~/payai-guardian/server/api-gateway

# Build manually
npm run build

# Check for errors
```

### Issue: Port already in use
```bash
# Kill the old process
pm2 delete payai-gateway

# Start fresh
pm2 start ecosystem.config.js --env production
```

### Issue: Deployment didn't work
```bash
# Pull latest code manually
cd ~/payai-guardian
git pull origin master

# Rebuild and restart
cd server/api-gateway
npm ci --omit=dev
npm run build
pm2 restart payai-gateway
```

---

## 🎉 Benefits of This Setup

✅ **Flexible**: Deploy only what you changed
✅ **Fast**: No need to deploy everything
✅ **Safe**: Test services individually
✅ **Manual Control**: Choose what to deploy
✅ **Automatic**: Push to deploy everything
✅ **Independent**: Services don't block each other

---

## 📊 Example Workflows

### Daily Development:
```
Push to master → Everything deploys automatically
```

### Hotfix on Payment Service:
```
Manual trigger → ✅ Payment Service only
```

### Frontend UI Update:
```
Manual trigger → ✅ Frontend only
```

### Major Release:
```
Manual trigger → ✅ Frontend + ✅ All Backend
```

### Test New AI Feature:
```
Manual trigger → ✅ AI Banking only
```

---

## 🔐 Required GitHub Secrets

Make sure these are set in your repository:

```
SERVER_HOST           = Your server IP (e.g., 210.79.128.199)
SERVER_USER           = SSH username (e.g., ubuntu)
SERVER_SSH_KEY        = Private SSH key
NEXT_PUBLIC_API_URL   = API URL for frontend
API_URL               = Backend API URL for health checks
FRONTEND_URL          = Frontend URL for health checks
```

---

## 🎓 Tips

1. **Test individually first**: Deploy one service, verify it works
2. **Use manual for testing**: Don't auto-deploy during development
3. **Monitor logs**: Always check `pm2 logs` after deployment
4. **Backup before major changes**: Export your database
5. **Use staging environment**: Test before production

---

**Happy Deploying! 🚀**
