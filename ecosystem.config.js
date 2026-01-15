module.exports = {
  apps: [{
    name: 'markdown-pro',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/markdown',
    env: {
      PORT: 3001,
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
