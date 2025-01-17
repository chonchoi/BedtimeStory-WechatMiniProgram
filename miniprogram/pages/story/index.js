Page({
  data: {
    // 选择数据
    animals: [
      { id: 'rabbit', name: '小兔子', emoji: '🐰' },
      { id: 'bear', name: '小熊', emoji: '🐻' },
      { id: 'cat', name: '小猫', emoji: '🐱' }, 
      { id: 'dog', name: '小狗', emoji: '🐶' }
    ],
    scenes: [
      { id: 'forest', name: '森林', emoji: '🌳' },
      { id: 'home', name: '家里', emoji: '🏠' },
      { id: 'park', name: '公园', emoji: '🎡' },
      { id: 'school', name: '学校', emoji: '🏫' }
    ],
    styles: [
      { id: 'funny', name: '搞笑', emoji: '😆' },
      { id: 'warm', name: '温馨', emoji: '🌟' },
      { id: 'adventure', name: '冒险', emoji: '🗺️' },
      { id: 'education', name: '教育', emoji: '📚' }
    ],
    
    // 已选择的值
    selectedAnimal: '',
    selectedScene: '',
    selectedStyle: '',
    
    // 生成的故事
    story: null,
    
    // 当前步骤
    currentStep: 'animal' // animal -> scene -> style
  },

  // 选择动物
  selectAnimal(e) {
    const animal = e.currentTarget.dataset.id;
    this.setData({
      selectedAnimal: animal,
      currentStep: 'scene'
    });
  },

  // 选择场景
  selectScene(e) {
    const scene = e.currentTarget.dataset.id;
    this.setData({
      selectedScene: scene,
      currentStep: 'style'
    });
  },

  // 选择风格
  selectStyle(e) {
    const style = e.currentTarget.dataset.id;
    this.setData({
      selectedStyle: style
    });
  },

  // 生成故事
  generateStory() {
    if (!this.data.selectedAnimal || !this.data.selectedScene || !this.data.selectedStyle) {
      wx.showToast({
        title: '请完成所有选择',
        icon: 'none'
      });
      return;
    }

    // 模拟调用故事生成API
    wx.showLoading({
      title: '正在生成故事...'
    });

    setTimeout(() => {
      const story = {
        title: '小兔子的森林历险记',
        content: '这是一个温馨的故事...' // 实际项目中这里应该调用真实API
      };

      this.setData({ story });
      wx.hideLoading();
    }, 1500);
  },

  // 重新开始
  restart() {
    this.setData({
      selectedAnimal: '',
      selectedScene: '',
      selectedStyle: '',
      story: null,
      currentStep: 'animal'
    });
  }
}); 