module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [{
    name: 'guide-app',
    script: 'index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'azbykov',
      host : 'horsejs.ru',
      ref  : 'origin/master',
      repo : 'git@github.com:azbykov/guide-app.git',
      path : '/opt/www/guide-prod',
      'post-deploy' : 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
    dev : {
      user : 'azbykov',
      host : 'horsejs.ru',
      ref  : 'origin/master',
      repo : 'git@github.com:azbykov/guide-app.git',
      path : '/opt/www/guide-dev',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
}
