const { envList } = require("../../envList");
const { QuickStartPoints, QuickStartSteps } = require("./constants");

Page({
  data: {
    story: null
  },

  // 模拟调用扣子工作流 API
  getStory(e) {
    const animal = e.currentTarget.dataset.animal;
    
    // 模拟 API 调用
    setTimeout(() => {
      const stories = {
        rabbit: {
          title: "小兔子的胡萝卜",
          content: "从前有一只爱吃胡萝卜的小兔子,它在森林里种了一大片胡萝卜。有一天,它发现最大的一根胡萝卜不见了!原来是森林里的小动物们偷偷拿去办派对了。小兔子不但没有生气,还和大家一起分享了美味的胡萝卜派,从此森林里的小动物们都变成了好朋友。🥕✨"
        },
        bear: {
          title: "小熊采蜂蜜",
          content: "森林里住着一只贪吃的小熊,它最喜欢的就是甜甜的蜂蜜。一天,它闻到了香甜的蜂蜜味,但蜂巢在很高的树上。小熊想了个好主意,它邀请了长颈鹿帮忙,自己站在长颈鹿的脖子上,终于够到了蜂巢。小熊和长颈鹿分享了美味的蜂蜜,这是它吃过的最香甜的蜂蜜。🍯💫"
        },
        cat: {
          title: "小猫钓鱼",
          content: "有一天,小猫来到小河边想要钓鱼。它把鱼竿甩来甩去,却总是钓不到鱼。这时,一只老渔夫告诉它要有耐心。小猫学会了安静地等待,终于钓到了一条大鱼!它把鱼送给了照顾它的老奶奶,老奶奶高兴地做了一顿美味的鱼汤。🐟🎣"
        },
        dog: {
          title: "小狗守家",
          content: "这是一只非常尽职的小狗,每天都认真地守护着主人的家。一天晚上,它发现一只迷路的小鸟在外面淋雨。小狗把小鸟请到屋檐下躲雨,还分享了自己的狗粮。第二天太阳出来后,小鸟唱着歌飞走了,但每天早上都会飞来看望小狗,给它带来美妙的歌声。🏠🎵"
        }
      };

      this.setData({
        story: stories[animal]
      });
    }, 500);
  }
});
