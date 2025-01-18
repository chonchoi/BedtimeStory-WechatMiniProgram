const { envList } = require("../../envList");

Page({
  data: {
    loading: true,
    showGuide: false,
    
    // 所有可选项
    allAnimals: [
      { id: 'rabbit', name: '小兔子', icon: '🐰' },
      { id: 'cat', name: '小猫咪', icon: '🐱' },
      { id: 'dog', name: '小狗狗', icon: '🐶' },
      { id: 'panda', name: '小熊猫', icon: '🐼' },
      { id: 'bear', name: '小熊熊', icon: '🧸' },
      { id: 'fox', name: '小狐狸', icon: '🦊' },
      { id: 'penguin', name: '小企鹅', icon: '🐧' },
      { id: 'elephant', name: '小象象', icon: '🐘' },
      { id: 'monkey', name: '小猴子', icon: '🐒' },
      { id: 'koala', name: '小考拉', icon: '🐨' },
      { id: 'tiger', name: '小老虎', icon: '🐯' },
      { id: 'lion', name: '小狮子', icon: '🦁' }
    ],
    allScenes: [
      { id: 'forest', name: '森林', icon: '🌳' },
      { id: 'ocean', name: '海洋', icon: '🌊' },
      { id: 'mountain', name: '山峰', icon: '⛰️' },
      { id: 'garden', name: '花园', icon: '🌸' },
      { id: 'desert', name: '沙漠', icon: '🏜️' },
      { id: 'jungle', name: '丛林', icon: '🌴' },
      { id: 'farm', name: '农场', icon: '🌾' },
      { id: 'park', name: '公园', icon: '🎡' },
      { id: 'beach', name: '海滩', icon: '🏖️' },
      { id: 'snow', name: '雪地', icon: '❄️' },
      { id: 'city', name: '城市', icon: '🌆' },
      { id: 'space', name: '太空', icon: '🚀' }
    ],
    allStyles: [
      { id: 'adventure', name: '冒险', icon: '🗺️' },
      { id: 'funny', name: '搞笑', icon: '😄' },
      { id: 'warm', name: '温馨', icon: '🌟' },
      { id: 'magic', name: '魔法', icon: '✨' },
      { id: 'dream', name: '梦幻', icon: '🌈' },
      { id: 'science', name: '科普', icon: '🔬' },
      { id: 'friendship', name: '友情', icon: '🤝' },
      { id: 'courage', name: '勇气', icon: '💪' },
      { id: 'wisdom', name: '智慧', icon: '🧠' },
      { id: 'love', name: '爱心', icon: '❤️' },
      { id: 'mystery', name: '神秘', icon: '🔮' },
      { id: 'fantasy', name: '奇幻', icon: '🦄' }
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
    console.log('页面加载');
    
    // 打印用户 openId
    getApp().logOpenId();

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
    this.refreshAnimals();
    this.refreshScenes();
    this.refreshStyles();
  },

  // 随机选择9个动物
  refreshAnimals() {
    const randomNine = (array) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    const animals = randomNine(this.data.allAnimals);
    
    // 确保已选中的动物在新的选项中
    if (this.data.selectedAnimal) {
      const selectedAnimal = this.data.allAnimals.find(a => a.id === this.data.selectedAnimal);
      if (selectedAnimal && !animals.find(a => a.id === this.data.selectedAnimal)) {
        animals[0] = selectedAnimal;
      }
    }
    
    this.setData({ animals });
  },

  // 随机选择9个场景
  refreshScenes() {
    const randomNine = (array) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    const scenes = randomNine(this.data.allScenes);
    
    // 确保已选中的场景在新的选项中
    if (this.data.selectedScene) {
      const selectedScene = this.data.allScenes.find(s => s.id === this.data.selectedScene);
      if (selectedScene && !scenes.find(s => s.id === this.data.selectedScene)) {
        scenes[0] = selectedScene;
      }
    }
    
    this.setData({ scenes });
  },

  // 随机选择9个风格
  refreshStyles() {
    const randomNine = (array) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    const styles = randomNine(this.data.allStyles);
    
    // 确保已选中的风格在新的选项中
    if (this.data.selectedStyle) {
      const selectedStyle = this.data.allStyles.find(s => s.id === this.data.selectedStyle);
      if (selectedStyle && !styles.find(s => s.id === this.data.selectedStyle)) {
        styles[0] = selectedStyle;
      }
    }
    
    this.setData({ styles });
  },

  // 选择动物
  selectAnimal(e) {
    console.log('选择动物:', e.currentTarget.dataset.id);
    const animal = e.currentTarget.dataset.id;
    this.setData({
      selectedAnimal: animal
    }, () => {
      console.log('当前选中的动物:', this.data.selectedAnimal);
    });
    this.vibrateOnSelect();
  },

  // 选择场景
  selectScene(e) {
    console.log('选择场景:', e.currentTarget.dataset.id);
    const scene = e.currentTarget.dataset.id;
    this.setData({
      selectedScene: scene
    }, () => {
      console.log('当前选中的场景:', this.data.selectedScene);
    });
    this.vibrateOnSelect();
  },

  // 选择风格
  selectStyle(e) {
    console.log('选择风格:', e.currentTarget.dataset.id);
    const style = e.currentTarget.dataset.id;
    this.setData({
      selectedStyle: style
    }, () => {
      console.log('当前选中的风格:', this.data.selectedStyle);
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
  async goToStoryPage() {
    const { selectedAnimal, selectedScene, selectedStyle } = this.data;
    
    // 检查是否已选择所有必要选项
    if (!selectedAnimal || !selectedScene || !selectedStyle) {
      wx.showToast({
        title: '请先选择主角、场景和风格',
        icon: 'none'
      });
      return;
    }
    
    // 获取选中项的名称（从所有选项中查找）
    const animal = this.data.allAnimals.find(a => a.id === selectedAnimal);
    const scene = this.data.allScenes.find(s => s.id === selectedScene);
    const style = this.data.allStyles.find(s => s.id === selectedStyle);

    if (!animal || !scene || !style) {
      wx.showToast({
        title: '选项数据错误，请重试',
        icon: 'none'
      });
      return;
    }

    try {
      wx.showLoading({
        title: '准备生成故事...',
        mask: true
      });

      // 获取数据库引用
      const db = wx.cloud.database();
      
      // 获取当前秒级时间戳
      const timestamp = Math.floor(Date.now() / 1000);
      
      // 插入数据到 story_list 表
      const result = await db.collection('story_list').add({
        data: {
          animal: selectedAnimal,
          scene: selectedScene,
          style: selectedStyle,
          is_ad_finished: false,
          create_time: timestamp,
          update_time: timestamp
        }
      });

      wx.hideLoading();

      // 跳转到故事页面，传递选择的参数和故事ID
      wx.navigateTo({
        url: `/pages/story/index?animal=${animal.name}&scene=${scene.name}&style=${style.name}&storyId=${result._id}`,
        fail: (err) => {
          console.error('页面跳转失败：', err);
          wx.showToast({
            title: '页面跳转失败，请重试',
            icon: 'none'
          });
        }
      });
    } catch (error) {
      wx.hideLoading();
      console.error('插入故事记录失败：', error);
      wx.showToast({
        title: '创建故事失败，请重试',
        icon: 'none'
      });
    }
  },

  goToMyStories() {
    wx.navigateTo({
      url: '/pages/my-stories/index'
    })
  },
});
