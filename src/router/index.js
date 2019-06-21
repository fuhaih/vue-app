import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   meta: {
    //     title: '首页',
    //   },
    //   mode: 'history',
    //   name: 'HelloWorld',
    //   component: () => import('@/components/HelloWorld'),
    // },
    {
      path: '/',
      meta: {
        title: '首页',
        active: 'Home',
      },
      mode: 'history',
      name: 'Home',
      component: () => import('@/components/HelloWorld'),
    },
    {
      path: '/About',
      meta: {
        title: '关于',
        active: 'About',
      },
      mode: 'history',
      name: 'About',
      component: () => import('@/components/About'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
