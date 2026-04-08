module.exports = {
  apps: [
    // API Gateway
    {
      name: 'payai-gateway',
      script: 'api-gateway/dist/server.js',
      cwd: './api-gateway',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    },

    // User Service
    {
      name: 'payai-user-service',
      script: 'user-services/dist/server.js',
      cwd: './user-services',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8001
      }
    },

    // Payment Service
    {
      name: 'payai-payment-service',
      script: 'payment-service/dist/server.js',
      cwd: './payment-service',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8002
      }
    },

    // Fraud Detection Service
    {
      name: 'payai-fraud-service',
      script: 'fraud-detection-service/dist/server.js',
      cwd: './fraud-detection-service',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8003
      }
    },

    // AI Banking Service
    {
      name: 'payai-ai-service',
      script: 'ai-banking-service/dist/server.js',
      cwd: './ai-banking-service',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8004
      }
    },

    // Analytics Service
    {
      name: 'payai-analytics-service',
      script: 'analytics-service/dist/server.js',
      cwd: './analytics-service',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8005
      }
    },

    // Notification Service
    {
      name: 'payai-notification-service',
      script: 'notification-service/dist/server.js',
      cwd: './notification-service',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8006
      }
    }
  ]
};
