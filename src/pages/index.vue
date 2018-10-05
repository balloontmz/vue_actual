<template>
    <div class="index-wrap">
      <div class="index-left">
        <div class="index-left-block">
          <h2>全部产品</h2>
          <template v-for="product in productList">
            <h3>{{ product.title }}</h3>
            <ul>
              <li v-for="item in product.list" :key="item.name">
                <a :href="item.url">{{ item.name }}</a>
                <span v-if="item.hot" class="hot-tag">HOT</span>
              </li>
            </ul>
            <!--如果不是最后一条数据，都加上分割线,数据中标记最后一项的last属性为true-->
            <div v-if="!product.last" class="hr"></div>
          </template>
        </div>
        <div class="index-left-block lastest-news">
          <h2>最新消息</h2>
          <ul>
            <li v-for="item in newsList" :key="item.title">
              <a :href="item.url" class="new-item">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="index-right">
        <slideshow :slides="slides" :inv="slideSpeed" @onchange="doSomethingChange">
        </slideshow>
        <div class="index-board-list">
          <!--以下这一块语法特点有点多，需要多看-->
          <div class="index-board-item"
               v-for="(item, index) in boardList"
               :key="index"
               :class="[{'line-last': index % 2 !== 0}, 'index-board-' + item.id]">
            <div class="index-board-item-inner">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="index-board-button">
                <a href="" class="button">立即购买</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import slideshow from '../components/slideshow'

export default {
  name: 'index',
  components: {
    slideshow
  },
  created: function () {
    this.$http.get('api/getNewsList')
      .then((res) => {
        this.newsList = res.data
      }, (err) => {
        console.log(err)
      })
  },
  methods: {
    // 以下方法用于测试
    doSomethingChange () {
      // console.log('doSomethingChange run')
    }
  },
  data () {
    return {
      slideSpeed: 2000,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],
      // 可以从后端获取
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'loud',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'earth',
          saleout: true
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          saleout: false
        }
      ],
      newsList: [],
      productList: {
        pc: {
          title: 'PC产品',
          list: [
            {
              name: 'app',
              url: 'http://www.baidu.com',
              hot: true
            },
            {
              name: '数据预测',
              url: 'http://warcraft.com'
            },
            {
              name: '流量分析',
              url: 'http://overwatch.com',
              hot: true
            },
            {
              name: '广告发布',
              url: 'http://hearstone.com'
            }
          ]
        },
        app: {
          last: true,
          title: 'APP产品',
          list: [
            {
              name: '流量分析',
              url: 'http://overwatch.com',
              hot: true
            },
            {
              name: '广告发布',
              url: 'http://hearstone.com'
            }
          ]
        }
      }
    }
  }
}
// 避免样式污染，设置scoped
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }
  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }
  .index-right {
    float: left;
    width: 900px;
  }
  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }
  .index-left-block .hr {
    margin-bottom: 20px;
  }
  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }
  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }
  .index-left-block ul {
    padding: 10px 15px;
  }
  .index-left-block li {
    padding: 5px;
  }
  .index-board-list {
    overflow: hidden;
  }
  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }
  .index-board-car .index-board-item-inner{
    background: url(../assets/images/1.png) no-repeat;
  }
  .index-board-loud .index-board-item-inner{
    background: url(../assets/images/2.png) no-repeat;
  }
  .index-board-earth .index-board-item-inner{
    background: url(../assets/images/3.png) no-repeat;
  }
  .index-board-hill .index-board-item-inner{
    background: url(../assets/images/4.png) no-repeat;
  }
  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }
  .line-last {
    margin-right: 0;
  }
  .index-board-button {
    margin-top: 20px;
  }
  .lastest-news {
    min-height: 512px;
  }
  .hot-tag {
    background: red;
    color: #fff;
  }
  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
