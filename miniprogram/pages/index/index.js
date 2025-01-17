const { envList } = require("../../envList");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

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

  // 生成故事
  generateStory: function() {
    const that = this;
    if (!this.data.selectedAnimal || !this.data.selectedScene || !this.data.selectedStyle) {
      wx.showToast({
        title: '请先完成所有选择',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '正在生成故事...',
    });

    // 准备参数
    const params = {
      animal: this.getAnimalName(this.data.selectedAnimal),
      scene: this.getSceneName(this.data.selectedScene),
      style: this.getStyleName(this.data.selectedStyle)
    };

    // 调用扣子API
    wx.request({
      url: 'https://api.coze.cn/v1/workflow/stream_run',
      method: 'POST',
      header: {
        'Authorization': 'Bearer pat_VFbizD1rUOTOgztlvjS8SP8Uc2pBwHBOr1RiWZ8KhmTYj6fQEG8jIyfrbywBeRFg',
        'Content-Type': 'application/json'
      },
      data: {
        workflow_id: '7460787727132819468',
        parameters: params
      },
      success(res) {
        wx.hideLoading();
        console.log('API响应:', res.data);
        
        try {
          // 将响应文本按行分割
          const lines = res.data.split('\n');
          
          // 遍历每一行
          for (const line of lines) {
            // 跳过空行
            if (!line.trim()) continue;
            
            // 解析事件数据
            const eventMatch = line.match(/^event: (.+)/);
            const dataMatch = line.match(/^data: (.+)/);
            
            // 如果是消息事件且包含内容
            if (eventMatch && eventMatch[1] === 'Message' && dataMatch) {
              try {
                const eventData = JSON.parse(dataMatch[1]);
                if (eventData.content) {
                  const contentObj = JSON.parse(eventData.content);
                  if (contentObj.output) {
                    that.setData({
                      story: contentObj.output
                    });
                    return;
                  }
                }
              } catch (e) {
                console.error('解析事件数据失败:', e);
              }
            }
          }

          // 如果没有找到有效内容
          wx.showToast({
            title: '生成故事失败',
            icon: 'none'
          });
        } catch (error) {
          console.error('解析响应失败:', error);
          console.log('错误详情:', error.message);
          wx.showToast({
            title: '生成故事失败',
            icon: 'none'
          });
        }
      },
      fail(error) {
        wx.hideLoading();
        wx.showToast({
          title: '生成故事失败',
          icon: 'none'
        });
        console.error('调用扣子API失败:', error);
      }
    });
  },

  // 获取动物名称
  getAnimalName(id) {
    const animal = this.data.animals.find(a => a.id === id);
    return animal ? animal.name : '';
  },

  // 获取场景名称
  getSceneName(id) {
    const scene = this.data.scenes.find(s => s.id === id);
    return scene ? scene.name : '';
  },

  // 获取风格名称
  getStyleName(id) {
    const style = this.data.styles.find(s => s.id === id);
    return style ? style.name : '';
  },

  // 重新开始
  restart: function() {
    this.setData({
      selectedAnimal: null,
      selectedScene: null,
      selectedStyle: null,
      story: null
    });
  }
});
