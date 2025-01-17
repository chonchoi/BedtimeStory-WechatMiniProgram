const { envList } = require("../../envList");

Page({
  data: {
    loading: true,
    showGuide: false,
    
    // 所有可选项
    allAnimals: [
      { id: 'rabbit', name: '小兔子', emoji: '🐰', description: '温柔可爱的小兔子' },
      { id: 'bear', name: '小熊', emoji: '🐻', description: '憨厚可爱的小熊' },
      { id: 'cat', name: '小猫', emoji: '🐱', description: '优雅灵巧的小猫' },
      { id: 'dog', name: '小狗', emoji: '🐶', description: '忠诚勇敢的小狗' },
      { id: 'panda', name: '小熊猫', emoji: '🐼', description: '憨态可掬的小熊猫' },
      { id: 'fox', name: '小狐狸', emoji: '🦊', description: '机智聪明的小狐狸' },
      { id: 'hamster', name: '小仓鼠', emoji: '🐹', description: '活泼可爱的小仓鼠' },
      { id: 'penguin', name: '小企鹅', emoji: '🐧', description: '可爱滑稽的小企鹅' },
      { id: 'tiger', name: '小老虎', emoji: '🐯', description: '威武勇敢的小老虎' },
      { id: 'monkey', name: '小猴子', emoji: '🐒', description: '调皮捣蛋的小猴子' },
      { id: 'elephant', name: '小象', emoji: '🐘', description: '聪明伶俐的小象' },
      { id: 'koala', name: '考拉', emoji: '🐨', description: '慵懒可爱的考拉' },
      { id: 'lion', name: '小狮子', emoji: '🦁', description: '勇敢无畏的小狮子' },
      { id: 'giraffe', name: '长颈鹿', emoji: '🦒', description: '温和善良的长颈鹿' },
      { id: 'unicorn', name: '独角兽', emoji: '🦄', description: '神秘美丽的独角兽' }
    ],
    allScenes: [
      { id: 'forest', name: '森林', emoji: '🌳', description: '神秘的森林冒险' },
      { id: 'home', name: '家里', emoji: '🏠', description: '温馨的家庭故事' },
      { id: 'park', name: '公园', emoji: '🎡', description: '欢乐的游乐园' },
      { id: 'school', name: '学校', emoji: '🏫', description: '有趣的校园生活' },
      { id: 'beach', name: '海滩', emoji: '🏖️', description: '阳光沙滩假日' },
      { id: 'farm', name: '农场', emoji: '🌾', description: '快乐的农场生活' },
      { id: 'zoo', name: '动物园', emoji: '🦁', description: '奇妙的动物世界' },
      { id: 'space', name: '太空', emoji: '🚀', description: '神奇的太空探险' },
      { id: 'castle', name: '城堡', emoji: '🏰', description: '童话般的城堡' },
      { id: 'mountain', name: '山峰', emoji: '⛰️', description: '壮丽的山峰探险' },
      { id: 'desert', name: '沙漠', emoji: '🏜️', description: '神秘的沙漠探险' },
      { id: 'island', name: '小岛', emoji: '🏝️', description: '神秘的海岛冒险' },
      { id: 'garden', name: '花园', emoji: '🌸', description: '美丽的花园漫步' },
      { id: 'circus', name: '马戏团', emoji: '🎪', description: '欢乐的马戏表演' },
      { id: 'library', name: '图书馆', emoji: '📚', description: '安静的阅读时光' }
    ],
    allStyles: [
      { id: 'funny', name: '搞笑', emoji: '😆', description: '让人开怀大笑' },
      { id: 'warm', name: '温馨', emoji: '🌟', description: '温暖人心的故事' },
      { id: 'adventure', name: '冒险', emoji: '🗺️', description: '惊险刺激的冒险' },
      { id: 'education', name: '教育', emoji: '📚', description: '寓教于乐的故事' },
      { id: 'magic', name: '魔法', emoji: '✨', description: '充满魔法的奇遇' },
      { id: 'mystery', name: '神秘', emoji: '🔮', description: '充满谜题的故事' },
      { id: 'friendship', name: '友情', emoji: '🤝', description: '关于友谊的故事' },
      { id: 'courage', name: '勇气', emoji: '💪', description: '激励人心的故事' },
      { id: 'dream', name: '梦幻', emoji: '🌈', description: '梦幻般的故事' },
      { id: 'science', name: '科学', emoji: '🔬', description: '探索科学奥秘' },
      { id: 'music', name: '音乐', emoji: '🎵', description: '充满音乐的故事' },
      { id: 'sports', name: '运动', emoji: '⚽', description: '激情运动故事' },
      { id: 'food', name: '美食', emoji: '🍳', description: '美食探险记' },
      { id: 'nature', name: '自然', emoji: '🌿', description: '大自然的故事' },
      { id: 'fantasy', name: '奇幻', emoji: '🐉', description: '奇幻冒险故事' }
    ],
    
    // 当前展示的选项（随机9个）
    animals: [],
    scenes: [],
    styles: [],
    
    // 已选择的值
    selectedAnimal: '',
    selectedScene: '',
    selectedStyle: '',
  },

  onLoad() {
    // 检查是否是首次使用
    const isFirstTime = !wx.getStorageSync('hasUsedBefore');
    if (isFirstTime) {
      this.setData({ showGuide: true });
      wx.setStorageSync('hasUsedBefore', true);
    }

    // 随机选择9个选项展示
    this.refreshOptions();

    // 延迟关闭骨架屏，让页面更流畅
    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 500);
  },

  // 随机选择9个选项
  refreshOptions() {
    const randomNine = (array) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    this.setData({
      animals: randomNine(this.data.allAnimals),
      scenes: randomNine(this.data.allScenes),
      styles: randomNine(this.data.allStyles),
      // 重置选择
      selectedAnimal: '',
      selectedScene: '',
      selectedStyle: ''
    });
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
