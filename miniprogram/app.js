const config = require('./config');
const store = require('./utils/store');

App({
  onLaunch() {
    // 云开发：配置了 CLOUD_ENV 后自动初始化；留空则全部走本地存储模拟数据
    this.globalData.cloudReady = false;
    if (config.CLOUD_ENV && wx.cloud) {
      try {
        wx.cloud.init({
          env: config.CLOUD_ENV,
          traceUser: true
        });
        this.globalData.cloudReady = true;
      } catch (e) {
        console.warn('云开发初始化失败，降级为本地模式', e);
      }
    }
    // 首次启动播种默认演示数据
    store.seedIfNeeded();
  },
  globalData: {
    cloudReady: false,
    refTab: 'insp' // 跨页传递：首页点击知识库时切到「知识」子Tab
  }
});
