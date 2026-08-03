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
  },

  // 真实天气配置
  WEATHER: {
    // 定位失败/拒绝授权时的默认位置（深圳）
    DEFAULT_LOCATION: {
      latitude: 22.5415,
      longitude: 114.0596,
      label: '深圳（默认定位）'
    },
    // 腾讯位置服务 WebService key（可选）：
    // 到 https://lbs.qq.com 注册小程序 key（勾选 WebServiceAPI），
    // 填入后天气卡片会显示具体街道地址；留空则显示「当前定位」
    TENCENT_MAP_KEY: ''
  }
};
