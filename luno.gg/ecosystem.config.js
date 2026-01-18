module.exports = {
  apps: [
    {
      name: 'luno-web',
      script: 'npm',
      args: 'run start',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
    {
      name: 'luno-voice',
      script: 'server.js',
      cwd: './voice-server',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
    {
      name: 'luno-python',
      script: 'main.py',
      cwd: './python-api',
      interpreter: 'python3',
      env: {
        PYTHON_API_PORT: 3002,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
    },
  ],
};
