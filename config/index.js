module.exports = {
  build: {
    DisableF12: true,
    env: require('./prod.env'),
    // 示例
    hotPublishUrl:"http://umbrella22.github.io/electron-vite-template",
    hotPublishConfigName: "update-config"
  },
  dev: {
    env: require('./dev.env'),
    removeElectronJunk: true,
    chineseLog: false,
    port: 9080,
  },
  HotUpdateFolder: 'update',
  UseStartupChart: false,
  IsUseSysTitle: false,
  BuiltInServerPort: 25565
}