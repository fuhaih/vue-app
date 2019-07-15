## markdown-it

>markdown-it缺点

不兼容html标签

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