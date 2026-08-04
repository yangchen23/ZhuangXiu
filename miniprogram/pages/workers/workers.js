Page({
  data: {
    workers: [
      { name: '张师傅', trade: '瓦工', emoji: '👨‍🔧', status: '在场', statusCls: 'on', days: 12, phone: '138****6621', note: '贴砖手艺好，墙地砖对缝认真，卫生间坡度做得标准。' },
      { name: '王工长', trade: '工长', emoji: '🧑‍💼', status: '已离', statusCls: 'off', days: 38, phone: '136****8840', note: '负责整体协调，每天在群里同步进度，问题响应快。' },
      { name: '李师傅', trade: '水电工', emoji: '👷', status: '已完工', statusCls: 'off', days: 14, phone: '159****3327', note: '水电阶段已完工，点位验收时逐一核对，管路拍过照存档。' }
    ]
  },

  call(e) {
    wx.showModal({
      title: '拨打电话',
      content: '电话：' + e.currentTarget.dataset.phone + '\n（演示环境不实际拨号）',
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
