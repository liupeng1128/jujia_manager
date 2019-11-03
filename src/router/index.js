import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'E洁家政', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 动态路由，不同身份看到的路由信息不一样
 */
export const asyncRoutes = [
  // 顾客管理
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/customer',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/customer/customer'),
        name: 'customer',
        meta: { title: '顾客管理', icon: 'peoples', noCache: true }
      }
    ]
  },
  // 栏目管理
  {
    path: '/category',
    component: Layout,
    redirect: '/category/category',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/category/category'),
        name: 'category',
        meta: { title: '栏目管理', icon: 'list', noCache: true }
      }
    ]
  },
  // 产品管理
  {
    path: '/product',
    component: Layout,
    redirect: '/product/product',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/product/product'),
        name: 'product',
        meta: { title: '产品管理', icon: 'component', noCache: true }
      },
      {
        path: 'product_details',
        hidden: 'true',
        component: () => import('@/pages/product/Product_details'),
        name: 'product_details',
        meta: { title: '产品详情', icon: 'component', noCache: true }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/order/order'),
        name: 'order',
        meta: { title: '订单管理', icon: 'skill', noCache: true },
      },
      {
        path: 'details',
        hidden: true,
        component: () => import('@/pages/order/Details'),
        name: 'order',
        meta: { title: '订单详情', icon: 'skill', noCache: true }
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    meta: { title: '审核管理', icon: 'tab' },
    children: [
      {
        path: 'waiter',
        component: () => import('@/pages/check/WaiterCheck'),
        name: 'waiter',
        meta: { title: '员工审核', icon: 'skill', noCache: true }
      },
      {
        path: 'withdraw',
        component: () => import('@/pages/check/WithdrawCheck'),
        name: 'order',
        meta: { title: '订单详情', icon: 'skill', noCache: true }
      }
    ]
  },
  // 评价管理
  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/comments',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/comments/comments'),
        name: 'comments',
        meta: { title: '评价管理', icon: 'edit', noCache: true }
      }
    ]
  },
  // 员工管理
  {
    path: '/waiter',
    component: Layout,
    redirect: '/waiter/waiter',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/waiter/waiter'),
        name: 'waiter',
        meta: { title: '员工管理', icon: 'user', noCache: true }
      }
    ]
  },

  /*
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  */

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
