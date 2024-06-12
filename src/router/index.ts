import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import routes from 'virtual:generated-pages'
// console.log(routes,'打印生成自动生成的路由')

let constantRoutes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/start',
    component: () => import('@/pages/start/index.vue'),
    children: [
      {
        path: "/start/commuse",
        component: () => import('@/pages/start/components/commuse.vue'),
      },
      {
        path: "/start/player",
        component: () => import('@/pages/start/components/player.vue'),
      },
      {
        path: "/start/note",
        component: () => import('@/pages/start/components/note.vue'),
      },
      {
        path: "/start/suggest",
        component: () => import('@/pages/start/components/suggest.vue'),
      },
      {
        path: "/start/about",
        component: () => import('@/pages/start/components/about.vue'),
      },
      {
        path: "/start/thing",
        component: () => import('@/pages/start/components/thing.vue'),
      },
      {
        path: "/start/role",
        component: () => import('@/pages/start/components/role.vue'),
      },
      {
        path: "/start/holyrelic",
        component: () => import('@/pages/start/components/holyrelic.vue'),
      },
      {
        path: "/start/holyrelic2",
        component: () => import('@/pages/start/components/holyrelic2.vue'),
      },
      {
        path: "/start/monster",
        component: () => import('@/pages/start/components/monster.vue'),
      },
      {
        path: "/start/other",
        component: () => import('@/pages/start/components/other.vue'),
      },
      {
        path: "/start/control",
        component: () => import('@/pages/start/components/control.vue'),
      },
      {
        path: "/start/weapon",
        component: () => import('@/pages/start/components/weapon.vue'),
      },
      {
        path: "/start/wss",
        component: () => import('@/pages/login/index.vue'),
      },
      {
        path: "/start/consoled",
        component: () => import('@/pages/consoled/index.vue'),
      },
      {
        path: "/start/personnel",
        component: () => import('@/pages/start/components/personnel.vue'),
      },
      {
        path: "/start/login",
        component: () => import('@/pages/start/GCAuth/login.vue'),
      },
      {
        path: "/start/register",
        component: () => import('@/pages/start/GCAuth/register.vue'),
      },
      {
        path: "/start/avatar",
        component: () => import('@/pages/start/components/avatar.vue'),
      },
      {
        path: "/start/food",
        component: () => import('@/pages/start/components/food.vue'),
      },
      {
        path: "/start/page1",
        component: () => import('@/pages/start/components/page1.vue'),
      },
      {
        path: "/start/changepassword",
        component: () => import('@/pages/start/GCAuth/changepassword.vue'),
      },
      {
        path: "/start/scene",
        component: () => import('@/pages/start/components/scene.vue'),
      }
    ]
  }

]



//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
