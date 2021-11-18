// shipitfile.js
/* eslint-disable global-require */
module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  const project = 'anker-cn';

  shipit.initConfig({
    default: {
      deployTo: `/home/deploy/apps/${project}`,
      keepReleases: 4,
      updateSubmodules: true,
      ignores: ['.git', 'node_modules'],
      repositoryUrl: `git@git.anker-in.com:bpit/msd/${project}.git`
    },
    production: {
      servers: ['deploy@8.136.201.13'],
      branch: 'main',
      shared: {
        overwrite: true,
        files: ['.env']
      }
    },
    development: {
      servers: ['deploy@47.111.177.146'],
      branch: 'develop',
      shared: {
        overwrite: true,
        files: ['.env']
      }
    }
  });

  // yarn build && pm2 start
  shipit.on('deployed', () => {
    const cmd = `cd ${shipit.releasePath} && yarn install && yarn build && (
      pm2 delete -s ${project} ; pm2 start )`;
    shipit.remote(cmd);
  });

  // secrets copy
  shipit.task('push', async () => {
    const environment = shipit.config.branch === 'main' ? 'production' : 'development';
    await shipit.remote(`mkdir -p /home/deploy/apps/${project}/shared`);
    await shipit.copyToRemote(
      `.env.${environment}`,
      `/home/deploy/apps/${project}/shared/.env`,
    );
  });

  // secrets copy
  shipit.task('pull', async () => {
    const environment = shipit.config.branch === 'main' ? 'production' : 'development';
    await shipit.copyFromRemote(
      `/home/deploy/apps/${project}/shared/.env`,
      `.env.${environment}`,
    );
  });
};
