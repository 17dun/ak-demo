module.exports = {
  apps: [{
    name: 'anker-cn',
    script: 'yarn',
    args: 'start -p 8000', // string containing all arguments passed via CLI to script
    watch: true
  }]
};