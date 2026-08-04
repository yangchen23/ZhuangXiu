const knowledge = require('../../data/knowledge');

Page({
  data: {
    article: null
  },

  onLoad(options) {
    const article = knowledge.articles.find(a => a.id === options.id);
    if (!article) {
      wx.showToast({ title: '文章不存在', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 600);
      return;
    }
    this.setData({ article });
    wx.setNavigationBarTitle({ title: article.title.length > 10 ? article.title.slice(0, 10) + '…' : article.title });
  }
});
