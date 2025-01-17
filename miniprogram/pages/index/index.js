const { envList } = require("../../envList");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

Page({
  data: {
    loading: true,  // 控制骨架屏显示
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
    selectedStyle: ''
  },

  onLoad() {
    // 延迟关闭骨架屏，让页面更流畅
    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 500);
  },

  // 选择动物
  selectAnimal(e) {
    const animal = e.currentTarget.dataset.id;
    this.setData({
      selectedAnimal: animal
    });
  },

  // 选择场景
  selectScene(e) {
    const scene = e.currentTarget.dataset.id;
    this.setData({
      selectedScene: scene
    });
  },

  // 选择风格
  selectStyle(e) {
    const style = e.currentTarget.dataset.id;
    this.setData({
      selectedStyle: style
    });
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
