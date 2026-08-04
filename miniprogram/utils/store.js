// ===== 本地数据仓库（模拟云数据库；接入云开发后替换为 db 读写） =====
const seed = require('../data/seed');
const util = require('./util');

const KEYS = {
  spaces: 'zjx_spaces',
  records: 'zjx_records',
  budget: 'zjx_budget',
  prep: 'zjx_prep',
  tasks: 'zjx_tasks',
  checks: 'zjx_checks',
  bookmarks: 'zjx_bookmarks',
  favorites: 'zjx_favorites',
  members: 'zjx_members',
  acceptance: 'zjx_acceptance',
  weather: 'zjx_weather',
  photos: 'zjx_photos',
  realWeather: 'zjx_real_weather'
};

function get(key, fallback) {
  const v = wx.getStorageSync(key);
  return v === '' || v === undefined || v === null ? fallback : v;
}

function set(key, value) {
  wx.setStorageSync(key, value);
}

function seedIfNeeded() {
  if (!wx.getStorageSync('zjx_seeded')) {
    set(KEYS.spaces, seed.spaces);
    set(KEYS.records, seed.records);
    set(KEYS.budget, seed.budget);
    set(KEYS.prep, seed.prep);
    set(KEYS.tasks, seed.tasks);
    set(KEYS.checks, seed.checks);
    set(KEYS.bookmarks, seed.bookmarks);
    set(KEYS.weather, 1); // 默认雨天主题
    set(KEYS.photos, []);
    wx.setStorageSync('zjx_seeded', true);
  }
}

function resetDemo() {
  const keys = Object.keys(KEYS).map(k => KEYS[k]);
  keys.push('zjx_seeded');
  keys.forEach(k => wx.removeStorageSync(k));
  seedIfNeeded();
}

// ===== 空间 =====
function getSpaces() {
  return get(KEYS.spaces, []);
}

function addSpace(name, emoji) {
  const spaces = getSpaces();
  if (spaces.some(s => s.name === name)) return false;
  const bgs = [
    'linear-gradient(135deg,#fce7f3,#fbcfe8)',
    'linear-gradient(135deg,#dbeafe,#bfdbfe)',
    'linear-gradient(135deg,#dcfce7,#bbf7d0)',
    'linear-gradient(135deg,#fef3c7,#fde68a)',
    'linear-gradient(135deg,#f3e8ff,#e9d5ff)',
    'linear-gradient(135deg,#fff7ed,#ffedd5)',
    'linear-gradient(135deg,#e0f2fe,#bae6fd)'
  ];
  spaces.push({
    name,
    emoji,
    bg: bgs[Math.floor(Math.random() * bgs.length)],
    custom: true
  });
  set(KEYS.spaces, spaces);
  return true;
}

function removeSpace(name) {
  const spaces = getSpaces().filter(s => s.name !== name || !s.custom);
  set(KEYS.spaces, spaces);
  return spaces;
}

function spaceCount(records, space) {
  return records.filter(r => r.space === space).length;
}

// ===== 记录 =====
function getRecords() {
  return get(KEYS.records, []);
}

function removeRecord(id) {
  const records = getRecords().filter(r => r.id !== id);
  set(KEYS.records, records);
  return records;
}

function addTask(text) {
  const tasks = getTasks();
  tasks.push({ text, done: false });
  setTasks(tasks);
  return tasks;
}

function addRecord(record) {
  const records = getRecords();
  records.unshift({
    id: util.uid(),
    icon: record.icon || '📝',
    title: record.title,
    space: record.space,
    meta: record.meta,
    date: record.date || new Date().toISOString().slice(0, 10),
    desc: record.desc,
    tags: record.tags || [],
    images: record.images || []
  });
  set(KEYS.records, records);
  return records;
}

// ===== 预算 =====
function getBudget() {
  return get(KEYS.budget, {
    total: 200000,
    spent: 0,
    byCategory: { material: 0, labor: 0, furniture: 0, appliance: 0 },
    categoryBudget: { material: 80000, labor: 60000, furniture: 40000, appliance: 20000 },
    flow: []
  });
}

function addExpense(exp) {
  const budget = getBudget();
  const amount = Number(exp.amount) || 0;
  if (amount <= 0) return budget;
  const category = exp.category || 'material';
  budget.flow.unshift({
    id: util.uid(),
    icon: exp.icon || '🧾',
    title: exp.title || '一笔支出',
    meta: exp.meta || (exp.space ? exp.space + ' · 刚刚' : '刚刚'),
    amount,
    category,
    typeLabel: exp.typeLabel || '材料',
    createdAt: Date.now()
  });
  budget.spent += amount;
  budget.byCategory[category] = (budget.byCategory[category] || 0) + amount;
  set(KEYS.budget, budget);
  return budget;
}

// ===== 开工准备 =====
function getPrep() {
  return get(KEYS.prep, []);
}

function togglePrep(name) {
  const prep = getPrep().map(p => {
    if (p.name !== name) return p;
    const done = !p.done;
    return { ...p, done, next: false };
  });
  // 重新计算 next：第一个未完成项
  let nextSet = false;
  prep.forEach(p => {
    if (!p.done && !nextSet) {
      p.next = true;
      nextSet = true;
    } else {
      p.next = false;
    }
  });
  set(KEYS.prep, prep);
  return prep;
}

function prepProgress(prep) {
  const total = prep.length;
  const done = prep.filter(p => p.done).length;
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

// ===== 任务 / 验收 =====
function getTasks() { return get(KEYS.tasks, []); }
function setTasks(tasks) { set(KEYS.tasks, tasks); }
function getChecks() { return get(KEYS.checks, []); }
function setChecks(checks) { set(KEYS.checks, checks); }

// ===== 收藏 =====
function getBookmarks() { return get(KEYS.bookmarks, []); }

function addBookmark(bm) {
  const bookmarks = getBookmarks();
  bookmarks.unshift({
    id: util.uid(),
    thumb: bm.thumb || '📥',
    bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    title: bm.title || '外部内容',
    source: bm.source || '刚刚收藏'
  });
  set(KEYS.bookmarks, bookmarks);
  return bookmarks;
}

function removeBookmark(id) {
  const bookmarks = getBookmarks().filter(b => b.id !== id);
  set(KEYS.bookmarks, bookmarks);
  return bookmarks;
}

// ===== 风格收藏 =====
function getFavorites() { return get(KEYS.favorites, []); }

function toggleFavorite(fav) {
  const favorites = getFavorites();
  const idx = favorites.findIndex(f => f.id === fav.id);
  if (idx >= 0) favorites.splice(idx, 1);
  else favorites.unshift(Object.assign({}, fav, { id: fav.id || util.uid() }));
  set(KEYS.favorites, favorites);
  return favorites;
}

// ===== 家庭成员 =====
function getMembers() {
  const members = get(KEYS.members, []);
  return members.length ? members : [
    { id: 'owner', name: '小熊', role: '决策人', emoji: '🐻', owner: true },
    { id: 'wife', name: '老婆', role: '审美担当', emoji: '👩', owner: false }
  ];
}

function addMember(name, role, emoji) {
  const members = getMembers();
  members.push({ id: util.uid(), name, role, emoji, owner: false });
  set(KEYS.members, members);
  return members;
}

function removeMember(id) {
  const members = getMembers().filter(m => m.id !== id && !m.owner);
  set(KEYS.members, members);
  return members;
}

// ===== 验收清单 =====
function getAcceptance() {
  const saved = get(KEYS.acceptance, null);
  if (saved) return saved;
  return seed.acceptanceStages
    ? seed.acceptanceStages
    : require('../data/knowledge').acceptanceStages;
}

function toggleAcceptance(stageIdx, itemIdx) {
  const stages = getAcceptance();
  if (!stages[stageIdx] || !stages[stageIdx].items[itemIdx]) return stages;
  const item = stages[stageIdx].items[itemIdx];
  item.done = !item.done;
  set(KEYS.acceptance, stages);
  return stages;
}

function resetAcceptance() {
  const stages = require('../data/knowledge').acceptanceStages.map(s => Object.assign({}, s, {
    items: s.items.map(i => Object.assign({}, i, { done: false }))
  }));
  set(KEYS.acceptance, stages);
  return stages;
}

// ===== 预算 =====
function setBudgetTotal(total) {
  const budget = getBudget();
  budget.total = Math.round(Number(total) || budget.total);
  set(KEYS.budget, budget);
  return budget;
}

// ===== 天气 =====
function getWeatherIndex() { return get(KEYS.weather, 1); }
function cycleWeather() {
  const next = (getWeatherIndex() + 1) % seed.weatherConfigs.length;
  set(KEYS.weather, next);
  return next;
}

// 真实天气缓存（10 分钟内不重复请求）
function getRealWeather() {
  const w = get(KEYS.realWeather, null);
  // v3：配置腾讯 key 后立即刷新街道地址，作废旧缓存
  if (w && w.v === 3 && w.fetchedAt && Date.now() - w.fetchedAt < 10 * 60 * 1000) return w;
  return null;
}

function setRealWeather(w) {
  set(KEYS.realWeather, Object.assign({}, w, { v: 3, fetchedAt: Date.now() }));
}

// ===== 拍照留档 =====
function getPhotos() { return get(KEYS.photos, []); }
function clearPhotos() { set(KEYS.photos, []); }
function addPhotos(paths) {
  const photos = getPhotos();
  paths.forEach(p => {
    photos.unshift({
      id: util.uid(),
      path: p,
      date: util.formatShort(new Date())
    });
  });
  set(KEYS.photos, photos);
  return photos;
}
function removePhoto(id) {
  const photos = getPhotos().filter(p => p.id !== id);
  set(KEYS.photos, photos);
  return photos;
}

module.exports = {
  seedIfNeeded,
  resetDemo,
  getSpaces,
  addSpace,
  removeSpace,
  spaceCount,
  getRecords,
  removeRecord,
  addRecord,
  addTask,
  getBudget,
  addExpense,
  setBudgetTotal,
  getPrep,
  togglePrep,
  prepProgress,
  getTasks,
  setTasks,
  getChecks,
  setChecks,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getFavorites,
  toggleFavorite,
  getMembers,
  addMember,
  removeMember,
  getAcceptance,
  toggleAcceptance,
  resetAcceptance,
  getWeatherIndex,
  cycleWeather,
  getRealWeather,
  setRealWeather,
  getPhotos,
  addPhotos,
  removePhoto,
  clearPhotos
};
