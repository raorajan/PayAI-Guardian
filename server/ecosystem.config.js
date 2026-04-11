module.exports = {
  apps: [
    {
      name: 'payai-api-gateway',
      script: './dist/server.js',
      cwd: './api-gateway',
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
      script: './dist/server.js',
      cwd: './user-services',
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
      script: './dist/server.js',
      cwd: './payment-service',
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
      script: './dist/server.js',
      cwd: './fraud-detection-service',
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
      script: './dist/server.js',
      cwd: './ai-banking-service',
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
      script: './dist/server.js',
      cwd: './analytics-service',
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
      script: './dist/server.js',
      cwd: './notification-service',
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