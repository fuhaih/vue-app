export default {
  path: '/admin',
  children: [
    {
      path: 'home',
      meta: {
        title: '主页',
        active: 'home',
      },
      component: () => import('@/components/Home'),
    },
    {
      path: 'about',
      meta: {
        title: '关于',
        active: 'about',
      },
      component: () => import('@/components/About'),
    },
  ],
  component: () => import('@/Admin'),
  // 通过props来与$route解耦
  props: route => ({ active: route.meta.active }),
};
