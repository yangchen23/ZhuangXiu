const knowledge = require('../../data/knowledge');
const store = require('../../utils/store');

Page({
  data: {
    style: null,
    fav: false
  },

  onLoad(options) {
    const style = knowledge.styleDetails.find(s => s.name === options.style) || knowledge.styleDetails[0];
    this.setData({ style });
    this.refreshFav();
  },

  refreshFav() {
    const style = this.data.style;
    if (!style) return;
    const favorites = store.getFavorites();
    this.setData({ fav: favorites.some(f => f.id === 'style-' + style.name) });
  },

  toggleFav() {
    const style = this.data.style;
    const favorites = store.toggleFavorite({
      id: 'style-' + style.name,
      style: style.name,
      emoji: style.emoji,
      title: style.name + ' 风格',
      bg: style.samples[0].bg
    });
    const fav = favorites.some(f => f.id === 'style-' + style.name);
    this.setData({ fav });
    wx.showToast({ title: fav ? '已收藏到风格库' : '已取消收藏', icon: 'none' });
  },

  goArticles() {
    wx.navigateTo({ url: '/pages/article-list/article-list?category=攻略' });
  }
});
