import Vue from 'vue';
import Router from 'vue-router';
import adminrouter from './/admin';
import blogrouter from './/blog';

// const adminrouter = require('./admin');
// const blogrouter = require('./blog');

Vue.use(Router);

const router = new Router({
  // mode: 'history',
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

// const router = new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       redirect: '/admin/home',
//     },
//     // /admin下子路径
//     adminrouter,
//     // /blog下子路径
//     blogrouter,
//   ],
//   scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//       // savedPosition is only available for popstate navigations.
//       return savedPosition;
//     }
//     // 如果你的連結是帶 # 這種
//     // to.hash 就會有值(值就是連結)
//     // 例如 #3
//     const position = {};
//     if (to.hash) {
//       position.selector = to.hash;

//       if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
//         return position;
//       }

//       return false;
//     }
//     // return { x: 0, y: 0 };
//     return new Promise((resolve) => {
//       // check if any matched route config has meta that requires scrolling to top
//       // 路由是可以嵌套的，需要通过to.matched.some来遍历嵌套路由的元信息，当路由中包含scrollToTop时，直接跳转到顶部
//       if (to.matched.some(m => m.meta.scrollToTop)) {
//         // coords will be used if no selector is provided,
//         // or if the selector didn't match any element.
//         position.x = 0;
//         position.y = 0;
//       }
//       // wait for the out transition to complete (if necessary)
//       this.app.$root.$once('triggerScroll', () => {
//         // if the resolved position is falsy or an empty object,
//         // will retain current scroll position.
//         resolve(position);
//       });
//     });
//   },
// });

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
router.afterEach((to) => {
  if (to.hash) {
    setTimeout(() => {
      const anchor = document.querySelector(to.hash);
      anchor.scrollIntoView({ behavior: 'smooth' });
      // document.body.scrollTop = anchor.offsetTop;
    }, 500);
  }
});

export default router;
