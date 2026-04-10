module.exports = {
  apps: [
    {
      name: 'payai-api-gateway',
      script: './api-gateway/server.js',
      cwd: './server',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000
      },
      error_file: './logs/api-gateway-error.log',
      out_file: './logs/api-gateway-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'payai-user-service',
      script: './user-services/server.js',
      cwd: './server',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '300M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8001
      }
    },
    {
      name: 'payai-payment-service',
      script: './payment-service/server.js',
      cwd: './server',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '400M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8002
      }
    },
    {
      name: 'payai-fraud-detection',
      script: './fraud-detection-service/server.js',
      cwd: './server',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8003
      }
    },
    {
      name: 'payai-ai-banking',
      script: './ai-banking-service/server.js',
      cwd: './server',
      instances: 2,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '800M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8004
      }
    },
    {
      name: 'payai-analytics',
      script: './analytics-service/server.js',
      cwd: './server',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '600M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8005
      }
    },
    {
      name: 'payai-notification',
      script: './notification-service/server.js',
      cwd: './server',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '200M',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8006
      }
    }
  ]
};