module.exports = {
  // 云开发环境 ID：如 'zhujiaji-1a2b3c'。
  // 留空 = 本地模拟模式（所有数据存本地 storage，可直接在开发者工具中预览）。
  CLOUD_ENV: '',

  // DeepSeek 配置
  DEEPSEEK: {
    BASE_URL: 'https://api.deepseek.com',
    // 模型：默认 deepseek-v4-flash；若接口返回模型不存在会自动兜底 deepseek-chat
    MODEL: 'deepseek-v4-flash',
    FALLBACK_MODEL: 'deepseek-chat',
    // API Key 不要写在这里（会随代码公开），请填到 config.local.js：
    //   module.exports = { DEEPSEEK_API_KEY: 'sk-xxx' }
    // 生产环境建议走云函数（cloudfunctions/aiChat），密钥放在云函数环境变量里。
    API_KEY: ''
  }
};
