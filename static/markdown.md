* 测试
* 测试2

## markdown-it
> 安装

```
npm install markdown-it --save

```

> 使用

```js
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');
```

## markdown样式

使用github-markdown-css

> 安装

```bash
npm install github-markdown-css
```

> 使用

```css
@import 'github-markdown-css';

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
      padding: 15px;
  }
}

```

这里不需要使用域样式，markdown转换的html需要在markdown-body内

## markdown代码高亮

> 安装

```bash
npm install highlight.js
```

>使用

```js
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        window.console.log('error');
      }
    }
    return ''; // use external default escaping
  },
});
const mdStr = '```js \r\nvar MarkdownIt = require(\'markdown-it\')\r\n ```\r\n # markdown-it rulezz! \r\n# markdown-it rulezz!\r\n    test';
this.markdown = md.render(mdStr);
```
样式引用
```css
<style>
@import 'github-markdown-css';
@import 'highlight.js/styles/googlecode.css';

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
      padding: 15px;
  }
}
</style>
```

## highlight过大问题

>使用cdn方式引用

index.html中添加引用
```html
<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">  
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script> 
```

main.js中给vue添加指令
```js
Vue.directive('highlight', (el) => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((bk) => {
    window.hljs.highlightBlock(bk);
  });
});
```
在需要高亮的代码中使用指令`v-highlight`

```html
<div class="markdown-body" v-html="markdown" v-highlight>
</div>
```

>按需加载

只加载需要的语言的高亮

```javascript
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js/lib/highlight');
const javascript = require('highlight.js/lib/languages/javascript');
const bash = require('highlight.js/lib/languages/bash');
const css = require('highlight.js/lib/languages/css');
const haml = require('highlight.js/lib/languages/haml');
const csp = require('highlight.js/lib/languages/csp');
const emoji = require('markdown-it-emoji');

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('haml', haml);
hljs.registerLanguage('csp', csp);
const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        window.console.log('error');
      }
    }
    return ''; // use external default escaping
  },
});
md.use(emoji);
```
## 代码块加行号

思路 ul/ol
```css
list-style-type:decimal
```
## markdown emoji表情

  `angry:            [ '>:(', '>:-(' ]` >:(

  `blush:            [ ':")', ':-")' ]` :")

  `broken_heart:     [ '</3', '<\\3' ]` </3

  `confused:         [ ':/', ':-/' ]` :/
 
  `cry:              [ ":'(", ":'-(", ':,(', ':,-(' ]` :'(

  `frowning:         [ ':(', ':-(' ]` :(

  `heart:            [ '<3' ]` <3

  `imp:              [ ']:(', ']:-(' ]` ]:(

  `innocent:         [ 'o:)', 'O:)', 'o:-)', 'O:-)', '0:)', '0:-)' ]` o:)

  `joy:              [ ":')", ":'-)", ':,)', ':,-)', ":'D", ":'-D", ':,D', ':,-D' ]` :')

  `kissing:          [ ':*', ':-*' ]` :*

  `laughing:         [ 'x-)', 'X-)' ]` x-)

  `neutral_face:     [ ':|', ':-|' ]` :|

  `open_mouth:       [ ':o', ':-o', ':O', ':-O' ]` :o

  `rage:             [ ':@', ':-@' ]` :@

  `smile:            [ ':D', ':-D' ]` :D'

  `smiley:           [ ':)', ':-)' ]` :)

  `smiling_imp:      [ ']:)', ']:-)' ]` ]:)

  `sob:              [ ":,'(", ":,'-(", ';(', ';-(' ]` :,'(

  `stuck_out_tongue: [ ':P', ':-P' ]` :P

  `sunglasses:       [ '8-)', 'B-)' ]` 8-)

  `sweat:            [ ',:(', ',:-(' ]` ,:(

  `sweat_smile:      [ ',:)', ',:-)' ]` ,:)

  `unamused:         [ ':s', ':-S', ':z', ':-Z', ':$', ':-$' ]` :s

  `wink:             [ ';)', ';-)' ]` ;)

## markdown-toc
生成markdown 目录

个人感觉不是很好用
* 1需要在markdown文件添加多余标记 @[toc]
* 2不能指定目录生成位置(有时候需要在markdown文档外生成)
* 3目录的结构不好变更

**最后自己通过自定义指令来生成markdown目录**

## 通过自定义指令来生成markdown目录
在main.js函数中添加自定义指令，在指令中还加上了锚点。
```js
Vue.directive('toc', (el) => {
  const GetNode = (hel) => {
    const nodeli = document.createElement('li');
    const text = document.createElement('a');
    text.href = `#${hel.id}`;
    text.innerHTML = hel.innerHTML;
    nodeli.appendChild(text);
    return nodeli;
  };
  const head = el.querySelectorAll('h1,h2,h3,h4,h5,h6,h7');
  const stack = [];
  const root = document.createElement('ul');
  let currentIndex = 0;
  let tag = 0;
  let currentparent = root;
  currentparent.dataset.level = 0;
  for (let i = 0; i < head.length; i += 1) {
    const index = head[i].tagName.substring(1);
    if (currentIndex > 0 && currentIndex < index) {
      const ulnode = document.createElement('ul');
      ulnode.dataset.level = index - 1;
      currentparent.appendChild(ulnode);
      stack.push(currentparent);
      currentparent = ulnode;
    } else if (currentIndex > 0 && currentIndex > index) {
      while (currentparent.dataset.level >= index) {
        currentparent = stack.pop();
      }
    }

    tag += 1;
    currentIndex = index;
    // head[i].id = `${currentparent.dataset.level}-${tag}`;
    head[i].id = `toc-${tag}`;
    const current = GetNode(head[i]);
    currentparent.appendChild(current);
  }
  el.insertBefore(root, el.firstChild);
});
```

在使用锚点的时候会有点问题，路径会变，这时候需要修改Router,给Router添加上scrollBehavior

**注意：** 需要在history模式下

[scrollBehavior用法](https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js)
```js
const router = new Router({
  mode: 'history',
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
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return { x: 0, y: 0 };
  },
});

// 个人感觉scrollBehavior没其到什么作用，在history模式下就能实现锚点
```

修改自定义指令，通过点击事件来跳转锚点。通过点击事件来跳转的好处是，可以进行平滑跳转(smooth)

```js
Vue.directive('toc', (el, binding) => {
  const GetNode = (hel) => {
    const nodeli = document.createElement('li');
    const text = document.createElement('a');
    // text.href = 'javascript:void(0)';
    text.innerHTML = hel.innerHTML;
    text.dataset.toc = hel.id;
    text.onclick = (item) => {
      const anchor = document.querySelector(`#${item.currentTarget.dataset.toc}`);
      anchor.scrollIntoView({ behavior: 'smooth' });
    };
    nodeli.appendChild(text);
    return nodeli;
  };
  const head = el.querySelectorAll('h1,h2,h3,h4,h5,h6,h7');
  const stack = [];
  const root = document.createElement('ul');
  let currentIndex = 0;
  let tag = 0;
  let currentparent = root;
  currentparent.dataset.level = 0;
  for (let i = 0; i < head.length; i += 1) {
    const index = head[i].tagName.substring(1);
    if (currentIndex > 0 && currentIndex < index) {
      const ulnode = document.createElement('ul');
      ulnode.dataset.level = index - 1;
      currentparent.appendChild(ulnode);
      stack.push(currentparent);
      currentparent = ulnode;
    } else if (currentIndex > 0 && currentIndex > index) {
      while (currentparent.dataset.level >= index) {
        currentparent = stack.pop();
      }
    }
    tag += 1;
    currentIndex = index;
    // head[i].id = `${currentparent.dataset.level}-${tag}`;
    head[i].id = `toc-${tag}`;
    const current = GetNode(head[i]);
    currentparent.appendChild(current);
  }
  if (binding.value === null || binding.value === undefined) {
    el.insertBefore(root, el.firstChild);
  } else {
    const content = document.querySelector(binding.value);
    if (content === null) {
      return;
    }
    content.innerHTML = '';
    content.appendChild(root);
  }
});
```

用法:指定元素来放目录

```jsx
<template>
  <div class="content">
    <div id="markdown-toc">
    </div>
    <div class="markdown-body" v-html="markdown" v-toc="'#markdown-toc'">
      {{ markdown }}
    </div>
  </div>
</template>
export default {
  name: 'staticmd',
  props: ['file'],
  data() {
    return {
      markdown: '',
    };
  },
};
```

用法：当不指定元素时，会直接插入到markdown的前面

```jsx
<template>
  <div class="content">
    <div id="markdown-toc">
    </div>
    <div class="markdown-body" v-html="markdown" v-toc>
      {{ markdown }}
    </div>
  </div>
</template>
```


## markdown不解析原生html

```js
const md = new MarkdownIt({
  html: true,
});
```

效果：把鼠标移动到下面这句话

<br/>
<br/>
<style>
  .desc {
      height:20px;
      display: block;
      position:relative;
  }
  .desc p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .desc:before {
    content: attr(data-desc);
    display: none;
    /* border: 1px solid #C3C3C3; */
    position: absolute;
    bottom: 40px;
    background: black;
    z-index: 10000;
    opacity: 0.6;
    color: white;
    padding: 15px 15px;
    border-radius: 10px;
    width:100%;
    border-radius: 8px;
  }
  .desc:after{
    content: "";
    display: none;
    position: absolute;
    border-top: 20px solid black;
    border-left: 15px solid transparent;
    bottom: 20px;
    left: 40px;
    opacity: 0.6;
    border-right: 15px solid transparent;
  }
  .desc:hover:before {
    display: block;
  } 
  .desc:hover:after {
    display: block;
  } 
</style>
<div style="width:400px;margin: 120px auto auto 40px">
  <div class="desc" data-desc="描述：测试描述信息的信息的四季豆is金佛ID瑟吉欧if就打死傲娇浮动is阿奇偶if的数据OAif激动死傲娇佛ID是数据都筛分机度搜为金佛你打算">
    <p>描述：测试描述信息的信息的四季豆is金佛ID瑟吉欧if就打死傲娇浮动is阿奇偶if的数据OAif激动死傲娇佛ID是数据都筛分机度搜为金佛你打算</p>
  </div>
</div>


## markdown-it-jsx(不好用)

    npm install markdown-it-jsx --save

使用

```js
const MarkdownIt = require('markdown-it');
const jsx = require('markdown-it-jsx');

const md = new MarkdownIt();
md.use(jsx);
```

目前发现该插件和```标记冲突
## 测试c#高亮

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VirtualPowerPlant.DataHandle;

namespace VirtualPowerPlant.Controllers
{
    public class CommonController : Controller
    {
        public PartialViewResult Banner()
        {
            return PartialView(CommonDataHandle.GetBannerData());
        }

        public PartialViewResult Header()
        {
            return PartialView(CommonDataHandle.HeaderData());
        }

        public PartialViewResult Footer()
        {
            return PartialView(CommonDataHandle.FooterData());
        }
    }
}
```