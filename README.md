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

>路由按需加载

一般路由会把所有vue组件都打包到一块，也就是当访问首页时，其他页面组件也都加载到浏览器了，这个时候会导致访问首页很慢，
解决方案就是按需加载，访问一个路由时才加载该路由所需的组件。

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
      component: () => import('@/components/HelloWorld'),
    },
    {
      path: '/About',
      meta: {
        title: '关于',
      },
      mode: 'history',
      name: 'About',
      component: () => import('@/components/About'),
    },
  ],
});
```
`component: () => import('@/components/HelloWorld')`会实现懒加载

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

## 3.5 vee-validate

> 安装

```bash
npm install --save vee-validate
```

>全局引用并本地化

main.js中

```js
import VueAxios from 'vue-axios';
import ZhCN from 'vee-validate/dist/locale/zh_CN';
Vue.use(Veevalidae);
Validator.localize('Zh_CN', ZhCN);
```

>简单使用

```js
<input type="text" v-model="msg"  v-validate="'required|email'" name="email"/>
    <span>{{ errors.first('email') }}</span>
```

## 3.6 iview
>vue-style-loader !css-loader错误

这个是样式加载问题
```bash
npm install sass-loader --save;
npm install node-sass --save;
```

>Parsing error: x-invalid-end-tag

有两种解决办法：  
1、MenuItem修改为：menu-item

2、在根目录下 .eslintrc.js 文件 rules 下添加：

`"vue/no-parsing-error": [2, { "x-invalid-end-tag": false }]`

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

# 发布

## 使用nginx发布

>编译vue

```bash
npm run build
```

编译好的文件会放在dist文件夹中，包含一个static文件夹和一个index.html文件。

把这两个文件上传到linux服务器的/var/www/vueapp路径下。



>配置nginx

nginx默认配置文件路径为/etc/nginx/nginx.conf;

在配置中添加include

```conf
http {
  include vhosts/*.host;
}
```
在nginx配置文件目录下添加一个vhosts文件夹，在该文件夹下配置需要托管的程序。
这里需要托管的就是vue-app程序

在vhosts目录下添加一个vueapp.host文件

```bash
vim vueapp.host
```

配置vueapp.host如下

```conf
server{

    listen 8080 default;

    server_name vueapp;
    #vueapp路径
    root /var/www/vueapp;
    #默认页面
    index index.html;
    #uri匹配
    location / {
        try_files $uri $uri/ @rewrites;
    }

    location @rewrites{
        rewrite ^(.+)$ /index.html last;
    }
    #匹配到api时跳转到代理
    location /api/ {
        proxy_pass http://127.0.0.1:9002;
    }
}
```

>重启nginx

```bash
sudo nginx -s reload
```

>promise未定义

这个是因为浏览器不支持es6，一般出现在ie旧版本。
解决方法是在项目中安装@babel/polyfill

```bash
npm install -save @babel/polyfill
```

修改build->webpack.base.conf.js文件

```conf
module.exports = {
  entry: {
    app: './src/main.js'
  },
}
```

修改为
```conf
module.exports = {
  entry: {
    //app: './src/main.js'
    app: ["@babel/polyfill", "./src/main.js"]
  },
}
```

# 测试

## 单元测试

使用@vue/test-utils和jest进行单元测试

jest已经在使用vue-cli脚手架时默认安装

>安装@vue/test-utils

```bash
npm install --save-dev jest @vue/test-utils
```

>修改测试用例HelloWorld.spec.js

[参考文档](https://vue-test-utils.vuejs.org/guides/#testing-vuex-in-components)
```js
import Vue from 'vue';
import { shallowMount , createLocalVue} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld';
import store from '@/store';

const localVue = createLocalVue()

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    // const Constructor = Vue.extend(HelloWorld,{
    //   $store: store
    // });
    // const vm = new Constructor().$mount();
    // expect(vm.$el.querySelector('.hello h1').textContent)
    // .toEqual('Welcome to Your Vue.js App');    

    const wrapper = shallowMount(HelloWorld, {
      store,
      localVue
    });
    expect(wrapper.vm.$el.querySelector('.hello h1').textContent)
    .toEqual('Welcome to Your Vue.js App');
  });
});
```
HelloWorld.vue中依赖有store，所以在测试的时候需要用到store，并且添加上localVue

>进行测试

```bash
npm run unit
```

>localStorage is not available for opaque origins

在jest.conf.js中配置

```conf
module.exports = {
  runner: 'jest-runner',
  testURL: "http://localhost/",
}
```

## 自动化测试e2e

在用vue-cli脚手架进行项目创建的时候，会提示创建e2e自动化测试，这里使用的是nightwatch进行自动化测试。

需要环境:

    java 因为nightwatch使用selenium进行自动化测试，selenium依赖java环境。
    chrome 自动化测试需要启动浏览器，默认配置中是使用chrome，所以安装chrome会比较方便，其他浏览器需要自行配置。
>安装java，配置java环境变量

>进行测试
```bash
npm run e2e
```

> Cannot find module 'chromedriver'

这个是没有安装chromedriver模块

```bash
npm install chromedriver
```

> Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`

单行的方法可以直接返回，而不使用大括号。

```js
value: state => {
  return state.value;
},
```
应该写成

```js
value: state =>  state.value,
```

>函数式方法坑

* 单参数不能使用括号
* 多参数需要用括号括起来
* 单行方法不能使用大括号括起来。

>Your test suite must contain at least one test.

可能是有其他文件命名为test