<template>
  <div class="markdown-body" v-html="markdown">
    {{ markdown }}
  </div>
</template>

<script>
import config from '@/components/admin/staticmdconfig';

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
export default {
  name: 'staticmd',
  props: ['file'],
  data() {
    return {
      markdown: '',
    };
  },
  methods: {
    getMarkdown() {
      const fileurl = config[this.file];
      this.axios.get(fileurl)
        .then((response) => {
          this.markdown = md.render(response.data);
        })
        .catch((error) => {
          window.console.log(error);
          this.markdown = '';
        });
    },
  },
  watch: {
    file() {
      this.getMarkdown();
    },
  },
  created() {
    this.getMarkdown();
  },
};
</script>

<style lang="scss">
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
