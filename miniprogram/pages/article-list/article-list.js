const knowledge = require('../../data/knowledge');

Page({
  data: {
    category: 'all',
    articles: []
  },

  onLoad(options) {
    const category = options.category || 'all';
    const articles = category === 'all'
      ? knowledge.articles
      : knowledge.articles.filter(a => a.cat === category);
    this.setData({ category, articles });
    wx.setNavigationBarTitle({ title: category === 'all' ? '全部文章' : category + '·精选' });
  },

  goArticle(e) {
    wx.navigateTo({ url: '/pages/article/article?id=' + e.currentTarget.dataset.id });
  }
});
