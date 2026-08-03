const seed = require('../../data/seed');

Page({
  data: {
    questions: seed.styleTestQuestions,
    idx: 0,
    total: seed.styleTestQuestions.length,
    picks: [],
    finished: false,
    result: null
  },

  select(e) {
    if (this.data.finished) return;
    const opt = e.currentTarget.dataset.opt; // 'a' | 'b'
    const picks = this.data.picks.concat([opt]);
    const idx = this.data.idx + 1;
    if (idx >= this.data.total) {
      this.finish(picks);
    } else {
      this.setData({ picks, idx });
    }
  },

  finish(picks) {
    const scores = {};
    this.data.questions.forEach((q, i) => {
      const style = picks[i] === 'a' ? q.a.style : q.b.style;
      scores[style] = (scores[style] || 0) + 1;
    });
    const ranked = Object.keys(scores).sort((x, y) => scores[y] - scores[x]);
    const primary = ranked[0];
    const secondary = ranked[1];
    const avoid = ranked[ranked.length - 1];
    this.setData({
      finished: true,
      picks,
      result: { primary, secondary, avoid, scores }
    });
  },

  restart() {
    this.setData({
      idx: 0,
      picks: [],
      finished: false,
      result: null
    });
  }
});
