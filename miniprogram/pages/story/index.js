const { request } = require('../../utils/stream.js');

Page({
  data: {
    // 生成的故事
    story: null,
    isGenerating: false,
    
    // 生成进度
    generatingProgress: 0,
    generatingStatusText: '',
    generationSteps: [
      { text: '正在构思故事大纲...', progress: 15 },
      { text: '正在设计故事情节...', progress: 35 },
      { text: '正在丰富故事细节...', progress: 55 },
      { text: '正在润色故事语言...', progress: 75 },
      { text: '正在完成最后修饰...', progress: 90 },
      { text: '故事即将完成...', progress: 95 }
    ],

    // 故事参数
    animal: '',
    scene: '',
    style: ''
  },

  onLoad: function(options) {
    console.log('Story page options:', options);
    
    // 设置参数
    this.setData({
      animal: options.animal || '',
      scene: options.scene || '',
      style: options.style || ''
    });

    // 自动开始生成故事
    this.generateStory();
  },

  // 生成故事
  async generateStory() {
    if (!this.data.animal || !this.data.scene || !this.data.style) {
      wx.showToast({
        title: '参数不完整',
        icon: 'none'
      });
      return;
    }

    this.setData({
      isGenerating: true,
      story: null,
      generatingProgress: 0,
      generatingStatusText: this.data.generationSteps[0].text
    });

    const token = 'pat_VFbizD1rUOTOgztlvjS8SP8Uc2pBwHBOr1RiWZ8KhmTYj6fQEG8jIyfrbywBeRFg';
    const data = {
      workflow_id: '7460787727132819468',
      parameters: {
        animal: this.data.animal,
        scene: this.data.scene,
        style: this.data.style
      }
    };

    // 创建一个进度更新函数
    const updateProgress = (step) => {
      if (step >= this.data.generationSteps.length) return;
      
      const currentStep = this.data.generationSteps[step];
      this.setData({
        generatingProgress: currentStep.progress,
        generatingStatusText: currentStep.text
      });
    };

    try {
      // 立即显示第一个状态
      updateProgress(0);
      
      // 设置进度更新定时器
      let currentStep = 1;
      const progressInterval = setInterval(() => {
        if (currentStep < this.data.generationSteps.length) {
          updateProgress(currentStep);
          currentStep++;
        }
      }, 2500); // 每2.5秒更新一次状态

      const storyContent = await request(null, token, data);
      clearInterval(progressInterval);
      
      if (storyContent) {
        // 确保显示最终进度
        this.setData({
          story: {
            content: storyContent,
            timestamp: new Date().toLocaleString()
          },
          isGenerating: false,
          generatingProgress: 100,
          generatingStatusText: '故事生成完成!'
        });
      } else {
        throw new Error('生成的故事内容为空');
      }
    } catch (error) {
      console.error('生成故事失败:', error);
      
      this.setData({
        isGenerating: false,
        story: null,
        generatingProgress: 0,
        generatingStatusText: ''
      });
      
      wx.showToast({
        title: error.message || '生成故事失败，请重试',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 重新开始
  restart() {
    // 返回首页
    wx.navigateBack();
  }
}); 