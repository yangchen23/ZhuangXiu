const store = require('../../utils/store');

Page({
  data: {
    info: {}
  },

  onShow() {
    const budget = store.getBudget();
    this.setData({
      info: {
        project: '阳光花园 3-201',
        style: '北欧风格',
        stage: '准备期 · 计划 9 月开工',
        total: '¥' + budget.total.toLocaleString('zh-CN')
      }
    });
  },

  resetData() {
    wx.showModal({
      title: '重置演示数据',
      content: '预算、记录、空间、收藏等全部恢复初始状态，确定吗？',
      success: res => {
        if (res.confirm) {
          store.resetDemo();
          wx.showToast({ title: '已重置，请重新编译', icon: 'success' });
        }
      }
    });
  },

  clearPhotos() {
    wx.showModal({
      title: '清空照片',
      content: '删除「拍照留档」里的全部照片（仅本地记录），确定吗？',
      success: res => {
        if (res.confirm) {
          store.clearPhotos();
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  },

  about() {
    wx.showModal({
      title: '关于筑家记',
      content: 'V4.5 本地演示版\nAI：DeepSeek（deepseek-v4-flash）\n天气：Open-Meteo + 腾讯位置服务\n纯个人项目，欢迎提出建议',
      showCancel: false,
      confirmText: '好的'
    });
  }
});
