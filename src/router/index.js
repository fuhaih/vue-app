import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: '首页',
      },
      mode: 'history',
      name: 'HelloWorld',
      component: HelloWorld,
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
