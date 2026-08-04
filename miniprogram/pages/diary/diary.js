const store = require('../../utils/store');
const seed = require('../../data/seed');
const util = require('../../utils/util');

const FLOW = [
  { label: '拆除', state: 'done' },
  { label: '空调', state: 'done' },
  { label: '水电', state: 'done' },
  { label: '泥瓦', state: 'current' },
  { label: '木工', state: '' },
  { label: '油漆', state: '' },
  { label: '安装', state: '' }
];

Page({
  data: {
    diaryTab: 'overview',
    flow: FLOW,
    // 总览
    tasks: [],
    taskDone: 0,
    taskTotal: 0,
    checks: [],
    checkDone: 0,
    checkTotal: 0,
    tasksOpen: true,
    checksOpen: false,
    // 计划
    calCells: [],
    calMonth: '',
    events: [],
    todayLabel: '',
    // 记录
    keyword: '',
    tags: ['全部', '客厅', '水电', '防水', '验收', '开工'],
    activeTag: '全部',
    spaces: [],
    records: [],
    shownRecords: [],
    activeSpace: '',
    spaceFilterBanner: false,
    spaceFilterName: '',
    // 添加空间弹窗
    spaceModalOpen: false,
    spaceName: '',
    spaceEmoji: '🪑',
    emojiList: ['🪑', '🚪', '🧺', '👕', '📦', '🚗', '🏋️', '🎮', '🎨', '🛋️', '🌸', '🏊']
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
    this.refreshAll();
  },

  refreshAll() {
    const tasks = store.getTasks();
    const checks = store.getChecks();
    this.setData({
      tasks,
      taskDone: tasks.filter(t => t.done).length,
      taskTotal: tasks.length,
      checks,
      checkDone: checks.filter(c => c.done).length,
      checkTotal: checks.length,
      records: store.getRecords()
    });
    this.refreshSpaces();
    this.buildCalendar();
    this.applyFilter();
  },

  // ===== 子Tab =====
  switchTab(e) {
    this.setData({ diaryTab: e.currentTarget.dataset.tab });
  },

  // ===== 总览 =====
  toggleTasks() {
    this.setData({ tasksOpen: !this.data.tasksOpen });
  },

  toggleChecks() {
    this.setData({ checksOpen: !this.data.checksOpen });
  },

  toggleTask(e) {
    const idx = e.currentTarget.dataset.index;
    const tasks = this.data.tasks.map((t, i) => (i === idx ? Object.assign({}, t, { done: !t.done }) : t));
    store.setTasks(tasks);
    this.setData({ tasks, taskDone: tasks.filter(t => t.done).length });
  },

  toggleCheck(e) {
    const idx = e.currentTarget.dataset.index;
    const checks = this.data.checks.map((c, i) => (i === idx ? Object.assign({}, c, { done: !c.done }) : c));
    store.setChecks(checks);
    this.setData({ checks, checkDone: checks.filter(c => c.done).length });
  },

  showTip(e) {
    wx.showToast({ title: e.currentTarget.dataset.tip || '功能开发中', icon: 'none' });
  },

  // ===== 计划日历 =====
  buildCalendar() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const firstWeekday = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const today = now.getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ id: 'pad' + i, day: '', other: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const ev = seed.calendarEvents.find(e => e.day === d);
      cells.push({
        id: 'd' + d,
        day: d,
        other: false,
        today: d === today,
        dot: ev ? ev.color : ''
      });
    }
    const trail = 7 - (cells.length % 7);
    if (trail < 7) {
      for (let i = 1; i <= trail; i++) {
        cells.push({ id: 'tail' + i, day: '', other: true });
      }
    }
    const todayEvents = seed.calendarEvents.filter(e => e.day === today);
    this.setData({
      calCells: cells,
      calMonth: y + '年' + (m + 1) + '月',
      events: todayEvents.length
        ? todayEvents
        : [{ day: today, color: '', text: '今天没有安排', time: '' }],
      todayLabel: util.formatToday(now)
    });
  },

  // ===== 记录 =====
  onSearch(e) {
    this.setData({ keyword: e.detail.value });
    this.applyFilter();
  },

  filterTag(e) {
    this.setData({ activeTag: e.currentTarget.dataset.tag });
    this.applyFilter();
  },

  filterBySpace(e) {
    const space = e.currentTarget.dataset.space;
    const next = this.data.activeSpace === space ? '' : space;
    this.setData({
      activeSpace: next,
      spaceFilterBanner: !!next,
      spaceFilterName: next
    });
    this.applyFilter();
  },

  clearSpaceFilter() {
    this.setData({ activeSpace: '', spaceFilterBanner: false, spaceFilterName: '' });
    this.applyFilter();
  },

  deleteRecord(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除记录',
      content: '删除后无法恢复，确定要删除这条记录吗？',
      success: res => {
        if (res.confirm) {
          const records = store.removeRecord(id);
          this.setData({ records });
          this.refreshSpaces();
          this.applyFilter();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  },

  applyFilter() {
    const keyword = this.data.keyword.trim();
    const tag = this.data.activeTag;
    const space = this.data.activeSpace;
    let list = this.data.records.slice();
    if (keyword) {
      list = list.filter(r => (r.title + r.desc + (r.tags || []).join(' ')).indexOf(keyword) !== -1);
    }
    if (tag !== '全部') {
      list = list.filter(r => (r.tags || []).indexOf(tag) !== -1);
    }
    if (space) {
      list = list.filter(r => r.space === space);
    }
    this.setData({ shownRecords: list });
  },

  refreshSpaces() {
    const records = store.getRecords();
    const spaces = store.getSpaces().map(s => Object.assign({}, s, {
      count: store.spaceCount(records, s.name),
      active: s.name === this.data.activeSpace
    }));
    this.setData({ spaces });
  },

  // ===== 添加空间弹窗 =====
  openAddSpace() {
    this.setData({ spaceModalOpen: true, spaceName: '', spaceEmoji: '🪑' });
  },

  closeAddSpace() {
    this.setData({ spaceModalOpen: false });
  },

  onSpaceName(e) {
    this.setData({ spaceName: e.detail.value });
  },

  selectEmoji(e) {
    this.setData({ spaceEmoji: e.currentTarget.dataset.emoji });
  },

  confirmAddSpace() {
    const name = this.data.spaceName.trim();
    if (!name) {
      wx.showToast({ title: '请输入空间名称', icon: 'none' });
      return;
    }
    const ok = store.addSpace(name, this.data.spaceEmoji);
    if (!ok) {
      wx.showToast({ title: '该空间已存在', icon: 'none' });
      return;
    }
    this.setData({ spaceModalOpen: false });
    this.refreshSpaces();
    wx.showToast({ title: '已添加空间：' + this.data.spaceEmoji + ' ' + name, icon: 'none' });
  },

  noop() {}
});
