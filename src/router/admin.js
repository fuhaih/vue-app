const HelloWorld = () => import('@/components/HelloWorld');
export default {
  path: '/admin',
  children: [
    {
      path: 'home',
      meta: {
        title: '主页',
        active: 'home',
      },
      component: HelloWorld,
    },
    {
      path: 'about',
      meta: {
        title: '关于',
        active: 'about',
      },
      component: () => import('@/components/About'),
    },
    {
      path: 'markdown/:file',
      meta: {
        title: '说明',
      },
      component: () => import('@/components/admin/staticmd'),
      props: true,
    },
  ],
  component: () => import('@/Admin'),
  // 通过props来与$route解耦
  props: route => ({ active: route.meta.active || route.params.file }),
};
