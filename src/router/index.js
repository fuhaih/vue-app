import Vue from 'vue';
import Router from 'vue-router';
import adminrouter from './/admin';
import blogrouter from './/blog';

// const adminrouter = require('./admin');
// const blogrouter = require('./blog');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/admin/home',
    },
    // /admin下子路径
    adminrouter,
    // /blog下子路径
    blogrouter,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
