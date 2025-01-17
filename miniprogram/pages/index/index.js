const { envList } = require("../../envList");

Page({
  data: {
    loading: true,  // 控制骨架屏显示
    showGuide: false, // 控制新手引导显示
    
    // 选择数据
    animals: [
      { id: 'rabbit', name: '小兔子', emoji: '🐰', description: '温柔可爱的小兔子' },
      { id: 'bear', name: '小熊', emoji: '🐻', description: '憨厚可爱的小熊' },
      { id: 'cat', name: '小猫', emoji: '🐱', description: '优雅灵巧的小猫' },
      { id: 'dog', name: '小狗', emoji: '🐶', description: '忠诚勇敢的小狗' },
      { id: 'panda', name: '小熊猫', emoji: '🐼', description: '憨态可掬的小熊猫' },
      { id: 'fox', name: '小狐狸', emoji: '🦊', description: '机智聪明的小狐狸' },
      { id: 'hamster', name: '小仓鼠', emoji: '🐹', description: '活泼可爱的小仓鼠' },
      { id: 'penguin', name: '小企鹅', emoji: '🐧', description: '可爱滑稽的小企鹅' }
    ],
    scenes: [
      { id: 'forest', name: '森林', emoji: '🌳', description: '神秘的森林冒险' },
      { id: 'home', name: '家里', emoji: '🏠', description: '温馨的家庭故事' },
      { id: 'park', name: '公园', emoji: '🎡', description: '欢乐的游乐园' },
      { id: 'school', name: '学校', emoji: '🏫', description: '有趣的校园生活' },
      { id: 'beach', name: '海滩', emoji: '🏖️', description: '阳光沙滩假日' },
      { id: 'farm', name: '农场', emoji: '🌾', description: '快乐的农场生活' },
      { id: 'zoo', name: '动物园', emoji: '🦁', description: '奇妙的动物世界' },
      { id: 'space', name: '太空', emoji: '🚀', description: '神奇的太空探险' }
    ],
    styles: [
      { id: 'funny', name: '搞笑', emoji: '😆', description: '让人开怀大笑' },
      { id: 'warm', name: '温馨', emoji: '🌟', description: '温暖人心的故事' },
      { id: 'adventure', name: '冒险', emoji: '🗺️', description: '惊险刺激的冒险' },
      { id: 'education', name: '教育', emoji: '📚', description: '寓教于乐的故事' },
      { id: 'magic', name: '魔法', emoji: '✨', description: '充满魔法的奇遇' },
      { id: 'mystery', name: '神秘', emoji: '🔮', description: '充满谜题的故事' },
      { id: 'friendship', name: '友情', emoji: '🤝', description: '关于友谊的故事' },
      { id: 'courage', name: '勇气', emoji: '💪', description: '激励人心的故事' }
    ],
    
    // 已选择的值
    selectedAnimal: '',
    selectedScene: '',
    selectedStyle: '',

    // 推荐组合
    recommendedCombos: [
      { animal: 'rabbit', scene: 'forest', style: 'adventure' },
      { animal: 'bear', scene: 'home', style: 'warm' },
      { animal: 'cat', scene: 'park', style: 'funny' }
    ]
  },

  onLoad() {
    // 检查是否是首次使用
    const isFirstTime = !wx.getStorageSync('hasUsedBefore');
    if (isFirstTime) {
      this.setData({ showGuide: true });
      wx.setStorageSync('hasUsedBefore', true);
    }

    // 延迟关闭骨架屏，让页面更流畅
    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 500);

    // 随机选择一个推荐组合
    if (isFirstTime) {
      const randomCombo = this.data.recommendedCombos[Math.floor(Math.random() * this.data.recommendedCombos.length)];
      this.setData({
        selectedAnimal: randomCombo.animal,
        selectedScene: randomCombo.scene,
        selectedStyle: randomCombo.style
      });
    }
  },

  // 选择动物
  selectAnimal(e) {
    const animal = e.currentTarget.dataset.id;
    this.setData({
      selectedAnimal: animal
    });
    this.vibrateOnSelect();
  },

  // 选择场景
  selectScene(e) {
    const scene = e.currentTarget.dataset.id;
    this.setData({
      selectedScene: scene
    });
    this.vibrateOnSelect();
  },

  // 选择风格
  selectStyle(e) {
    const style = e.currentTarget.dataset.id;
    this.setData({
      selectedStyle: style
    });
    this.vibrateOnSelect();
  },

  // 选择时的振动反馈
  vibrateOnSelect() {
    wx.vibrateShort({
      type: 'light'
    });
  },

  // 关闭新手引导
  closeGuide() {
    this.setData({
      showGuide: false
    });
  },

  // 阻止事件冒泡
  preventBubble() {
    // 空函数，用于阻止事件冒泡
  },

  // 跳转到故事页面
  goToStoryPage() {
    const { selectedAnimal, selectedScene, selectedStyle } = this.data;
    
    // 获取选中项的名称
    const animal = this.data.animals.find(a => a.id === selectedAnimal);
    const scene = this.data.scenes.find(s => s.id === selectedScene);
    const style = this.data.styles.find(s => s.id === selectedStyle);

    // 跳转到故事页面，传递选择的参数
    wx.navigateTo({
      url: `/pages/story/index?animal=${animal.name}&scene=${scene.name}&style=${style.name}`
    });
  }
});
