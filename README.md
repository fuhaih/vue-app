# 1 准备工作

## 1.1 需要用到的工具

> git
  
    可视化安装
> node

    可视化安装
>webpack
```bash
#全局安装webpack
npm install -g webpack
```
>vue-cli
```bash
#全局安装vue-cli
npm install -g vue-cli  
```
# 2 vue-app

## 2.1 程序初始化和使用
> 初始化程序
```bash
#初始化模板
vue init webpack vue-app
```
> 运行程序

```bash
npm run dev
```

>使用axios

```bash
#本地安装
npm install --save axios
```
# 3 组件使用

## 3.1 axios
>安装

```bash
npm install axios --save
```

>局部注册
```bash
import axios from 'axios';

export default {
  name: 'Todo',
  axios,
  data() {
    return {
      msg: 'test',
    };
  },
  methods: {
    say() {
      axios.get('/api/').then((response) => {
        window.console.log(response);
      });
    },
  },
};
```

>全局注册组件 使用vue-axios

安装vue-axios

```bash
npm install vue-axios --save
```
使用vue-axios注册axios
```bash
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
```
使用

```bash
this.axios.get('api/getNewsList').then((response)=>{
  this.newsList=response.data.data;
}).catch((response)=>{
  console.log(response);
})
```

>全局注册组件 使用vue原型(不推荐这样用)

直接写原型的话，不便于团队合作，使用vue-axios的话，ide能够智能识别vue中的axios对象。

组件注册
```bash
import axios from 'axios'
Vue.prototype.$ajax= axios
```
使用
```bash
this.$ajax.get('api/getNewsList')
.then((response)=>{
    this.newsList=response.data.data;
}).catch((response)=>{
    console.log(response);
})
```

>axios跨域问题

使用proxyTable来解决调试时的跨域问题

在config->index.js中进行配置

```js
proxyTable: {
  '/api': {
    target: 'https://www.baidu.com/', // 接口的域名
    // secure: false,  // 如果是https接口，需要配置这个参数
    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    pathRewrite: {
      '^/api': ''
    }
  }
},
```

使用

```js
this.axios.get('/api/').then((response) => {
  window.console.log(response);
});
```
vue会把`/api`替换成target也就是https://www.baidu.com/

在生产环境上可以使用nginx等来解决跨域问题。也可以使用document.domain来实现子域名间的跨域。
> A Vue.js project

## 3.2 vue-rout使用

>通过meta信息来设置每个路由的title

```js
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

```

## 3.3 调试

[vue-devtools安装和使用](https://github.com/vuejs/vue-devtools)

## 3.4 Vuex和localStorage

>vuex安装

```bash
npm install --save vuex
```

>vuex的使用

src->store 创建index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    key: 1,
  },
  mutations: {
    increment(state, num) {
      state.key += num;
    },
  },
});
```

main.js中引用store

```js
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
```

使用

```js
window.console.log(this.$store.state.key);
```

>vuex组件化使用

把store的各个部分拆分开来

src->store->state创建index.js
```js
export default {
  key: 6,
};
```

src->store->mutations创建index.js
```js
export default {
  increment(state, num) {
    state.key += num;
  },
};
```

修改src->store->index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
});
```
使用方法一样

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 4 坑

## 4.1 异常

>Missing trailing comma

    这个是JavaScript书写问题，vue中对象后面`{}`要使用逗号`{},`

>Newline required at end of file but not found

    这个是vue文件末尾需要换行

>Missing semicolon

    缺少分号

>Expected linebreaks to be 'LF' but found 'CRLF'

在.eslint.js中配置rules
```javascript
// 统一换行符，"\n" unix(for LF) and "\r\n" for windows(CRLF)，默认unix
// off或0: 禁用规则
添加'linebreak-style': 'off',
```

>Missing space before value for key 'todos'

    JavaScript对象在定义时需要有空格，这个是webpack.base.conf.js里面定义的规则


>Strings must use singlequote
 
    在进行import时需要使用单引号

>Expected indentation of 2 spaces but found 4

    这个一般是eslintrc检测问题，把vs code的tab设置为两个空格就行了。

>在vue中使用console

node_modules->eslint->conf->eslint-recommended.js
配置
```json
"no-console":"off"
```

>Absolute imports should come before relative imports

    一般已安装的组件导入要放在未安装的组件导入前面

>Unary operator '++' used

    ESLint认为一元操作符，是不安全的，所以禁止使用
    可以使用+=1替换

>'v-for' directives require 'v-bind:key' directives.

vue在升级到2.2后，当在组件中使用 v-for 时， key 现在是必须的
```vue
<li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
</li>
//或者
<li v-for="(todo,key) in todos" v-bind:key="key">
        {{todo.text}}
</li>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' },
      ],
    };
  },
};
```
## 4.2 其他情况

>vue-router的路径中会有#号

vue-router默认的路由模式是hash，我们要去掉url中的#需要将路由模式切换为history
```javascript
const router = new VueRouter({
  mode: 'history',
  ...
})
```