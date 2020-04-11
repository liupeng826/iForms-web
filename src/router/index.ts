import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/list/list.vue'),
        meta: { navIndex: '/list', title: '我的问卷' }
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/create/create.vue'),
        meta: { navIndex: '/create', title: '创建问卷' }
      },
      {
        path: 'edit/:id',
        name: 'edit',
        component: () => import('@/views/edit/edit.vue'),
        meta: { navIndex: '/list', title: '编辑问卷' }
      },
      {
        path: 'translate/:id',
        name: 'translate',
        component: () => import('@/views/edit/translate.vue'),
        meta: { navIndex: '/list', title: '翻译问卷' }
      },
      {
        path: 'statistics/:id',
        name: 'statistics',
        component: () => import('@/views/statistics/index.vue'),
        meta: { hasSubNav: true, navIndex: '/list', title: '结果统计' },
        children: [
          {
            path: 'result',
            name: 'statisticsResult',
            component: () => import('@/views/statistics/result.vue'),
            meta: {
              navIndex: '/list',
              subNavIndex: 'result',
              title: '结果统计',
              hasSubNav: true
            }
          }
        ]
      },
      {
        path: 'statistics/',
        name: 'statistics',
        component: () => import('@/views/statistics/result.vue'),
        meta: { navIndex: '/statistics/', title: '统计分析' }
      },
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/views/dept/dept.vue'),
        meta: { navIndex: '/dept', title: '部门管理' }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/user.vue'),
        meta: { navIndex: '/user', title: '用户管理' }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/setting/setting.vue'),
        meta: { navIndex: '/setting', title: '修改密码' }
      },
      {
        path: '/i18n',
        name: 'i18n',
        component: () => import('@/views/i18n/index.vue'),
        meta: { navIndex: '/i18n/', title: 'i18n' }
      }
    ]
  },
  {
    path: '/view/:id',
    name: 'view',
    component: () => import('@/views/view/view.vue')
  },
  {
    path: '/feedback/:id',
    name: 'answer',
    component: () => import('@/views/answer/answer.vue')
  },
  {
    path: '/complete',
    name: 'complete',
    component: () => import('@/views/view/complete.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue')
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/error-page/redirect.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/statistics_phone',
    name: 'statistics',
    component: () => import('@/views/statistics/result.vue'),
    meta: { navIndex: '/statistics/', title: 'statistics' }
  }
]

const router = new VueRouter({
  routes
})

export default router
