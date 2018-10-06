import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import IndexPage from '../pages/index'
import DetailPage from '../pages/detail'
import Forecast from '../pages/detail/forecast'
import Analysis from '../pages/detail/analysis'
import Count from '../pages/detail/count'
import Publish from '../pages/detail/publish'
import OrderListPage from '../pages/orderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'forecast',
          name: 'Forecast',
          component: Forecast
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: Analysis
        },
        {
          path: 'count',
          name: 'Count',
          component: Count
        },
        {
          path: 'publish',
          name: 'Publish',
          component: Publish
        }
      ]
    },
    {
      path: '/orderList',
      name: 'OrderListPage',
      component: OrderListPage
    }
  ]
})
