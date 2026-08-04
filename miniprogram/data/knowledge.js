// ===== 知识文章 / 风格详情 / 家电 / 验收清单 内容库 =====

const articles = [
  {
    id: 'cizhuan-1', cat: '瓷砖', icon: '🧱', title: '瓷砖怎么选：800×800 还是 750×1500',
    summary: '从空间大小、损耗率、工费三个维度帮你做决定',
    sections: [
      { h: '先看空间', p: ['客厅、餐厅这种大空间，优先 750×1500，缝隙少、显大气，适合北欧风的浅色通铺；厨卫、阳台用 600×1200 或小砖，方便做坡度、损耗也小。'] },
      { h: '算算损耗和工费', p: ['800×800 损耗约 3-5%，750×1500 损耗 5-8%（裁切多）。工费方面大板普遍贵 10-20 元/㎡，预算紧就 800×800。'] },
      { h: '颜色怎么挑', p: ['北欧风选浅灰/米白哑光面，采光差选亮面；花纹要"乱纹"不要"死板重复"，下单前让商家排两箱看看整体效果。'] }
    ],
    tips: ['买砖多买 5% 备余量，同批次补货容易有色差', '到货验"色号+批次号"一致再签收']
  },
  {
    id: 'cizhuan-2', cat: '瓷砖', icon: '🧱', title: '通体、釉面、抛光、仿古怎么区分',
    summary: '看懂四种主流砖，不被销售绕晕',
    sections: [
      { h: '通体砖', p: ['表里同色、耐磨，适合阳台、户外；但抗污一般，厨房慎用。'] },
      { h: '釉面砖', p: ['花色最多、防滑抗污好，厨卫首选。注意看釉面是否平整、有无针孔。'] },
      { h: '抛光砖/抛釉砖', p: ['光泽度高、显亮堂，但亮面遇水较滑，卫生间别用；客厅采光差可选。'] },
      { h: '仿古砖', p: ['哑光做旧质感，配侘寂/日式好看，防滑好，耐磨但需要美缝突出效果。'] }
    ],
    tips: ['现场滴水测防滑，倒着看砖面反光找不平整']
  },
  {
    id: 'diban-1', cat: '地板', icon: '🪵', title: '实木、多层、强化、SPC 怎么选',
    summary: '按预算、环保、抗造三个需求对号入座',
    sections: [
      { h: '预算敏感型', p: ['强化地板 80-150 元/㎡，耐磨抗造，但脚感偏硬、遇水怕泡；SPC 石塑更防水，适合厨卫阳台。'] },
      { h: '品质兼顾型', p: ['多层实木 200-400 元/㎡，稳定性好、可做地暖，性价比最高；实木 400 元起，环保脚感最好但娇贵。'] },
      { h: '安装注意', p: ['地板要在油漆后、家具进场前铺；地面找平误差每 2 米不超过 3mm，否则会有响声。'] }
    ],
    tips: ['看环保等级认准 ENF/E0 级', '踢脚线、扣条提前确认含不含在报价里']
  },
  {
    id: 'tuliao-1', cat: '涂料', icon: '🎨', title: '乳胶漆选购与环保标准',
    summary: '看懂检测报告，别只认"儿童漆"三个字',
    sections: [
      { h: '环保怎么看', p: ['认准产品检测报告上的 VOC 和甲醛释放量，国标 GB18582-2020；ENF 级儿童漆不是必须，通风更重要。'] },
      { h: '档次怎么分', p: ['普通五合一 300-500 元/桶，耐擦洗次数低；中高端 600-1000 元/桶，抗污耐擦更好。乳胶漆成本在墙面总预算里占比不高，建议别省。'] },
      { h: '施工注意', p: ['墙面要 2 遍腻子+打磨+1 遍底漆+2 遍面漆；底漆不能省，否则面漆容易花。'] }
    ],
    tips: ['刷完通风 1-2 周再测甲醛，别信"零甲醛"噱头']
  },
  {
    id: 'weiyu-1', cat: '卫浴', icon: '🚿', title: '卫生间防水与卫浴安装顺序',
    summary: '防水做不好，返工代价最大',
    sections: [
      { h: '防水标准', p: ['淋浴区刷到 1.8 米，其余墙面 30cm 起，建议整墙刷到顶；地面刷 2-3 遍，门槛石处做挡水坎。'] },
      { h: '闭水试验', p: ['防水干透后蓄水 48 小时，楼下无渗漏才算过；做试验前先和楼下邻居打招呼。'] },
      { h: '安装顺序', p: ['墙砖贴完 → 吊顶 → 浴室柜/马桶/花洒安装 → 美缝 → 保洁。智能马桶要提前留插座和进水。'] }
    ],
    tips: ['地漏提前买好，贴砖时一起预埋', '闭水试验别省，出问题掀砖代价是几百倍']
  },
  {
    id: 'dengju-1', cat: '灯具', icon: '💡', title: '筒灯射灯怎么选：色温与开孔',
    summary: '无主灯设计前先搞懂这几件事',
    sections: [
      { h: '筒灯还是射灯', p: ['筒灯光线散、均匀照明，适合过道、厨房；射灯聚光、洗墙打画，适合沙发背景和玄关。'] },
      { h: '色温怎么定', p: ['客厅卧室 3000-3500K 暖光温馨，厨房卫生间 4000K 中性光清楚，全屋色温别混搭超过两种。'] },
      { h: '开孔尺寸', p: ['常规开孔 75mm（7.5cm），吊顶前和木工确认灯具深度，避免装不下。'] }
    ],
    tips: ['选显色指数 Ra≥90，照食物和肤色都自然']
  },
  {
    id: 'kaiguan-1', cat: '开关', icon: '🔌', title: '开关插座布局清单',
    summary: '水电定位前照着这张表核对一遍',
    sections: [
      { h: '客厅', p: ['沙发两侧各 1 个 USB+五孔，电视墙至少 4 个五孔，空调 16A 单独回路，扫地机器人基站留插座。'] },
      { h: '厨房', p: ['台面上方 4 个带开关五孔（烟机/净水/垃圾处理器/备用），冰箱单独回路，洗碗机 16A。'] },
      { h: '卫生间', p: ['智能马桶旁留插座，浴室柜旁吹风机插座离水远一点，加防溅盒。'] }
    ],
    tips: ['插座宁多勿少，但床头别对着头吹', '大功率电器单独回路更安全']
  },
  {
    id: 'menchuang-1', cat: '门窗', icon: '🪟', title: '断桥铝门窗怎么选',
    summary: '型材、玻璃、五金三个指标看懂报价差在哪',
    sections: [
      { h: '型材', p: ['看壁厚（国标 1.4mm+）和隔热条（PA66 尼龙优于 PVC），别只看"断桥铝"三个字。'] },
      { h: '玻璃', p: ['临街选中空+夹胶，追求保温上 LOW-E；大落地窗要钢化玻璃，带 3C 标志。'] },
      { h: '五金与安装', p: ['五金件决定密封和寿命，问清品牌；安装打胶要顺直饱满，防渗水。'] }
    ],
    tips: ['测量后先复尺再下单，窗台石别等门窗装完才做']
  },
  {
    id: 'jiadian-1', cat: '家电', icon: '🛁', title: '嵌入式家电尺寸与预留清单',
    summary: '水电前定家电，装修后少后悔',
    sections: [
      { h: '厨房', p: ['洗碗机 13 套宽 60cm，留 16A 插座+进水排水；蒸烤一体机嵌入柜体要留散热缝；烟机先定型号再吊顶。'] },
      { h: '卫生间', p: ['热水器先定（燃气/电热），留好烟道和插座位置；电热毛巾架留防水插座。'] },
      { h: '阳台', p: ['洗衣机+烘干机叠放高度 1.8m 内留够，壁挂小洗衣机要打在承重墙上。'] }
    ],
    tips: ['618/双11 先定型号锁价格，尺寸给装修用，晚发货']
  },
  {
    id: 'bikeng-1', cat: '避坑', icon: '⚠️', title: '水电改造避坑指南',
    summary: '7 个检查项，验收前逐条过',
    sections: [
      { h: '定位阶段', p: ['插座高度、数量按生活习惯画在墙上再开槽；冰箱/洗衣机/洗碗机这些大电器的位置先定死。'] },
      { h: '施工阶段', p: ['水管走顶便于检修；冷热水管间距 15cm，左热右冷；强弱电交叉处包锡纸防干扰。'] },
      { h: '验收阶段', p: ['打压 0.8MPa 保持 30 分钟不掉压；逐路测试电路通断；拍照留档管线路由，后期打孔避开。'] }
    ],
    tips: ['水电点位拍照+录视频存档，比合同还有用', '别信"经验够不用测"，闭水打压一样都不能少']
  },
  {
    id: 'bikeng-2', cat: '避坑', icon: '⚠️', title: '泥瓦阶段避坑清单',
    summary: '贴砖环节最常见的 6 个坑',
    sections: [
      { h: '铺贴前', p: ['瓷砖泡水 2 小时以上（瓷片）；墙面先拉毛再贴；排版图先确认，门边窗边不要小条砖。'] },
      { h: '铺贴中', p: ['留缝一致（建议 2mm 以上做美缝）；空鼓率控制在 5% 以内，墙砖上墙后敲击检查。'] },
      { h: '验收时', p: ['2 米靠尺检查平整度≤3mm；阴阳角方正；卫生间坡度向地漏，闭水试验 48 小时。'] }
    ],
    tips: ['留砖样，后期退补货对得上', '墙地砖对缝提前和师傅说']
  },
  {
    id: 'gonglue-1', cat: '攻略', icon: '🏗️', title: '泥瓦阶段全流程攻略',
    summary: '开工后第一件大事：把砖贴好',
    sections: [
      { h: '进场前准备', p: ['定好瓷砖（含踢脚线、过门石）、约瓦工、确认卫生间防水方案；先做闭水试验再贴砖。'] },
      { h: '施工顺序', p: ['防水 → 闭水试验 → 墙砖 → 地砖 → 过门石 → 美缝（隔 7 天以上）。卫生间墙压地更防水。'] },
      { h: '联动安排', p: ['贴砖期间同步定木门（周期 30-45 天）、约橱柜复尺，别等贴完再定。'] }
    ],
    tips: ['泥瓦阶段是"定货期"，柜子/门/家电尺寸都要在这阶段定下来']
  },
  {
    id: 'gonglue-2', cat: '攻略', icon: '🪵', title: '木工进场前准备清单',
    summary: '吊顶、柜体、灯具开孔一次想清楚',
    sections: [
      { h: '图纸先行', p: ['吊顶方案图、定制柜体设计图提前确认；筒灯/射灯开孔位置在吊顶图上标好。'] },
      { h: '材料确认', p: ['板材环保等级、龙骨间距（主龙骨≤1.2m）、石膏板品牌进场时验收。'] },
      { h: '交叉施工', p: ['中央空调、新风要在木工吊顶前装完；烟道止逆阀、排气孔提前打好。'] }
    ],
    tips: ['吊顶内预留检修口，灯具变压器位置要好换']
  },
  {
    id: 'huxing-1', cat: '户型方案', icon: '📐', title: '户型规划基础：先想清楚生活动线',
    summary: '动手改墙之前，先回答这三个问题',
    sections: [
      { h: '动线', p: ['买菜回家-进厨房-放冰箱；起床-洗漱-换衣-出门，两条主线的顺畅度决定日常舒服与否。'] },
      { h: '收纳', p: ['全屋收纳量按套内面积 12% 规划，玄关鞋柜、衣柜深度、厨房吊柜先算尺寸。'] },
      { h: '采光通风', p: ['承重墙不能动；非承重墙改造要权衡采光和隐私，卧室别对着卫生间门。'] }
    ],
    tips: ['改墙前先做全屋平面规划图，别边装边改']
  }
];

const styleDetails = [
  {
    name: '北欧', emoji: '🪵', desc: '浅色打底 + 原木家具 + 绿植点缀，明亮通透，预算友好',
    palette: ['#F5F0E6', '#C9A66B', '#8FA3A6'],
    keywords: ['原木', '棉麻', '大白墙', '绿植'],
    samples: [
      { title: '北欧·客厅', space: '客厅', bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)' },
      { title: '北欧·主卧', space: '主卧', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
      { title: '北欧·餐厅', space: '餐厅', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' },
      { title: '北欧·书房', space: '书房', bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)' }
    ]
  },
  {
    name: '日式', emoji: '🎋', desc: '原木 + 米白 + 低矮家具，收纳藏而不露，安静治愈',
    palette: ['#E8DFD0', '#A98B6F', '#5B6B54'],
    keywords: ['原木', '榻榻米', '暖光', '收纳'],
    samples: [
      { title: '日式·客厅', space: '客厅', bg: 'linear-gradient(135deg,#fefce8,#fef9c3)' },
      { title: '日式·厨房', space: '厨房', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)' },
      { title: '日式·玄关', space: '玄关', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' },
      { title: '日式·阳台', space: '阳台', bg: 'linear-gradient(135deg,#fef9c3,#fde68a)' }
    ]
  },
  {
    name: '侘寂', emoji: '🏺', desc: '微水泥、素色、自然光，接受不完美的美',
    palette: ['#D8CFC4', '#9B9183', '#6F6A60'],
    keywords: ['微水泥', '素色', '留白', '陶器'],
    samples: [
      { title: '侘寂·客厅', space: '客厅', bg: 'linear-gradient(135deg,#faf5ff,#f3e8ff)' },
      { title: '侘寂·卧室', space: '主卧', bg: 'linear-gradient(135deg,#f5f5f4,#e7e5e4)' },
      { title: '侘寂·卫浴', space: '主卫', bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' },
      { title: '侘寂·茶室', space: '书房', bg: 'linear-gradient(135deg,#fefce8,#f5f5f4)' }
    ]
  },
  {
    name: '极简', emoji: '⬜', desc: '黑白灰 + 隐形收纳，线条干净，好打理',
    palette: ['#F5F5F5', '#333333', '#9CA3AF'],
    keywords: ['黑白灰', '无主灯', '隐形门', '直线条'],
    samples: [
      { title: '极简·客厅', space: '客厅', bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)' },
      { title: '极简·主卧', space: '主卧', bg: 'linear-gradient(135deg,#f3f4f6,#e5e7eb)' },
      { title: '极简·厨房', space: '厨房', bg: 'linear-gradient(135deg,#fafafa,#f4f4f5)' },
      { title: '极简·书房', space: '书房', bg: 'linear-gradient(135deg,#f8fafc,#e2e8f0)' }
    ]
  },
  {
    name: '新中式', emoji: '🏮', desc: '深木色 + 对称布局 + 现代线条，沉稳大气',
    palette: ['#7A5C3E', '#D9C7A7', '#2F2A26'],
    keywords: ['深木', '对称', '格栅', '山水'],
    samples: [
      { title: '新中式·客厅', space: '客厅', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' },
      { title: '新中式·餐厅', space: '餐厅', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
      { title: '新中式·书房', space: '书房', bg: 'linear-gradient(135deg,#f5f5f4,#e7e5e4)' },
      { title: '新中式·卧室', space: '主卧', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)' }
    ]
  },
  {
    name: '轻奢', emoji: '✨', desc: '金属线条 + 大理石纹理 + 丝绒，精致不浮夸',
    palette: ['#D4AF6A', '#F3EEE8', '#4A4453'],
    keywords: ['黄铜', '大理石', '丝绒', '水晶'],
    samples: [
      { title: '轻奢·客厅', space: '客厅', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)' },
      { title: '轻奢·餐厅', space: '餐厅', bg: 'linear-gradient(135deg,#faf5ff,#f3e8ff)' },
      { title: '轻奢·主卧', space: '主卧', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
      { title: '轻奢·玄关', space: '玄关', bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)' }
    ]
  },
  {
    name: '法式', emoji: '🥐', desc: '奶油白 + 石膏线 + 拱形元素，浪漫优雅',
    palette: ['#F7F1E8', '#C8A990', '#7D6B5F'],
    keywords: ['石膏线', '拱门', '奶油白', '百叶窗'],
    samples: [
      { title: '法式·客厅', space: '客厅', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)' },
      { title: '法式·卧室', space: '主卧', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)' },
      { title: '法式·阳台', space: '阳台', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)' },
      { title: '法式·餐厅', space: '餐厅', bg: 'linear-gradient(135deg,#f5f5f4,#e7e5e4)' }
    ]
  },
  {
    name: '美式', emoji: '🛋️', desc: '实木家具 + 复古色调 + 舒适厚重',
    palette: ['#8B5E3C', '#D8C3A5', '#3E3A35'],
    keywords: ['实木', '皮质', '复古', '壁炉'],
    samples: [
      { title: '美式·客厅', space: '客厅', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' },
      { title: '美式·书房', space: '书房', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)' },
      { title: '美式·餐厅', space: '餐厅', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)' },
      { title: '美式·卧室', space: '主卧', bg: 'linear-gradient(135deg,#f3e8ff,#e9d5ff)' }
    ]
  }
];

const applianceGroups = [
  {
    space: '厨房', icon: '🍳',
    items: [
      { name: '烟机灶具', price: '¥2,000-6,000', note: '油烟机距灶台 65-75cm；先定型号再吊顶', condition: '预留 16A 插座 + 排烟管' },
      { name: '洗碗机', price: '¥3,000-8,000', note: '13 套宽 60cm，水电前定型号', condition: '16A 插座 + 进水 + 排水' },
      { name: '蒸烤一体机', price: '¥3,000-10,000', note: '嵌入柜体需留散热缝', condition: '16A 插座 + 柜体尺寸' },
      { name: '净水器/垃圾处理器', price: '¥1,000-4,000', note: '台盆下空间要预留', condition: '插座 + 进水 + 排水' }
    ]
  },
  {
    space: '卫生间', icon: '🚿',
    items: [
      { name: '燃气/电热水器', price: '¥1,500-5,000', note: '先定类型再走水电', condition: '燃气需烟道，电热需 16A 专线' },
      { name: '智能马桶', price: '¥2,000-8,000', note: '贴砖前确认孔距（305/400mm）', condition: '插座 + 进水' },
      { name: '电热毛巾架', price: '¥500-1,500', note: '水电阶段预留防水插座', condition: '防水插座' }
    ]
  },
  {
    space: '客厅', icon: '🛋️',
    items: [
      { name: '电视/投影', price: '¥2,000-10,000', note: '投影提前埋 HDIM 线和电源', condition: '电视墙插座组' },
      { name: '中央空调', price: '¥15,000-40,000', note: '吊顶前装完内机+铜管', condition: '单独回路 + 吊顶空间' },
      { name: '扫地机器人基站', price: '¥2,000-6,000', note: '柜内或阳台预留', condition: '插座 + 上下水（自动上下水款）' }
    ]
  },
  {
    space: '阳台', icon: '🌳',
    items: [
      { name: '洗衣机+烘干机', price: '¥4,000-12,000', note: '叠放高度 1.8m 内，先定型号', condition: '插座 + 进排水' },
      { name: '壁挂小洗衣机', price: '¥1,500-4,000', note: '内裤机/宝宝洗衣机', condition: '承重墙 + 进排水' }
    ]
  }
];

const acceptanceStages = [
  {
    stage: '开工交底', icon: '🎉',
    items: [
      { id: 'a1', text: '物业手续 / 垃圾清运确认', done: true },
      { id: 'a2', text: '水电点位现场交底确认', done: true },
      { id: 'a3', text: '成品保护（门窗/电梯间）', done: true }
    ]
  },
  {
    stage: '水电验收', icon: '🔌',
    items: [
      { id: 'b1', text: '水管打压 0.8MPa 保 30 分钟', done: false },
      { id: 'b2', text: '电路逐路通断测试', done: false },
      { id: 'b3', text: '强弱电交叉处防干扰', done: false },
      { id: 'b4', text: '管线路由拍照留档', done: false }
    ]
  },
  {
    stage: '防水验收', icon: '💧',
    items: [
      { id: 'c1', text: '淋浴区防水 1.8m 以上', done: false },
      { id: 'c2', text: '闭水试验 48 小时无渗漏', done: false },
      { id: 'c3', text: '门槛石挡水坎', done: false }
    ]
  },
  {
    stage: '泥瓦验收', icon: '🧱',
    items: [
      { id: 'd1', text: '表面平整度（2m 靠尺≤3mm）', done: false },
      { id: 'd2', text: '阴阳角方正', done: false },
      { id: 'd3', text: '留缝宽度一致（2mm）', done: false },
      { id: 'd4', text: '卫生间坡度向地漏', done: false },
      { id: 'd5', text: '空鼓率检查（敲击）', done: false }
    ]
  },
  {
    stage: '木工验收', icon: '🪵',
    items: [
      { id: 'e1', text: '吊顶平整、无裂缝', done: false },
      { id: 'e2', text: '柜体封边、五金顺滑', done: false },
      { id: 'e3', text: '筒灯开孔位置准确', done: false }
    ]
  },
  {
    stage: '油漆验收', icon: '🎨',
    items: [
      { id: 'f1', text: '墙面无明显流坠/色差', done: false },
      { id: 'f2', text: '阴阳角线条顺直', done: false },
      { id: 'f3', text: '踢脚线收口严密', done: false }
    ]
  },
  {
    stage: '安装验收', icon: '🔧',
    items: [
      { id: 'g1', text: '门/柜开合顺畅无刮蹭', done: false },
      { id: 'g2', text: '灯具插座全部通电', done: false },
      { id: 'g3', text: '开荒保洁后整体巡检', done: false }
    ]
  }
];

module.exports = {
  articles,
  styleDetails,
  applianceGroups,
  acceptanceStages
};
