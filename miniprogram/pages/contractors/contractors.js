const DATA = [
  {
    id: 'c1', name: '李工长 · 精装队', type: '工长直装', emoji: '👷',
    rating: 4.8, orders: 126, price: '¥1,600-2,200/㎡',
    tags: ['泥瓦见长', '水电规范', '报价透明'],
    desc: '12 年经验，主要做北欧/日式，工地干净，验收时主动配合查空鼓。'
  },
  {
    id: 'c2', name: '筑家优选装修公司', type: '整装公司', emoji: '🏢',
    rating: 4.6, orders: 342, price: '¥1,800-2,600/㎡',
    tags: ['设计师免费', '主材套餐', '合同规范'],
    desc: '整装一条龙，含设计+主材+施工，适合没时间盯现场的上班族。'
  },
  {
    id: 'c3', name: '张师傅 · 泥瓦工作室', type: '单项师傅', emoji: '🧱',
    rating: 4.9, orders: 88, price: '贴砖 ¥65-90/㎡',
    tags: ['贴砖口碑好', '排砖细致', '可看工地'],
    desc: '专注贴砖 8 年，墙地砖对缝做得漂亮，适合单包泥瓦阶段。'
  }
];

Page({
  data: {
    list: DATA
  },

  contact(e) {
    const name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '联系 ' + name,
      content: '电话联系功能即将开通。\n装修行业水深，建议至少对比 3 家报价，实地看 2 个在施工地。',
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
