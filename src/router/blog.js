export default {
  path: '/Blog',
  children: [
    {
      path: 'summary',
      meta: {
        title: '主页',
        active: 'summary',
      },
      component: () => import('@/components/Summary'),
      props: { index: 0 },
    },
    {
      path: 'summary/:index',
      meta: {
        title: '主页',
        active: 'summary',
      },
      component: () => import('@/components/Summary'),
      props: true,
    },
    {
      path: 'article',
      meta: {
        title: '关于',
        active: 'article',
      },
      component: () => import('@/components/Article'),
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
  component: () => import('@/Blog'),
};
