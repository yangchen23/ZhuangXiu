const store = require('../../utils/store');

Page({
  data: {
    item: null
  },

  onLoad(options) {
    const item = store.getBookmarks().find(b => b.id === options.id);
    if (!item) {
      wx.showToast({ title: '收藏不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 600);
      return;
    }
    this.setData({ item });
  },

  deleteBookmark() {
    wx.showModal({
      title: '删除收藏',
      content: '删除后无法恢复，确定吗？',
      success: res => {
        if (res.confirm) {
          store.removeBookmark(this.data.item.id);
          wx.showToast({ title: '已删除', icon: 'success' });
          setTimeout(() => wx.navigateBack(), 600);
        }
      }
    });
  },

  askAI() {
    wx.navigateTo({ url: '/pages/ai-chat/ai-chat' });
  }
});
