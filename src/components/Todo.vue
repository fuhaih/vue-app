<template>
  <div>
    <h2>{{this.$store.state.other.Num}}</h2>
    <!-- <input type="text" v-model="msg"  v-validate="'required|email'" name="email"/> -->
    <input type="text" v-model="msg"/>
    <!-- <span>{{ errors.first('email') }}</span> -->
    <button v-on:click="say">添加</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
      </li>
    </ul>
    <div class="markdown-body" v-html="markdown" v-highlight>
      {{ markdown }}
    </div>
  </div>
</template>
<script>
const MarkdownIt = require('markdown-it');
// const hljs = require('highlight.js');
const emoji = require('markdown-it-emoji');

// MarkdownIt
// 原理：使用不同的rule来匹配每一行
// codeblock还需要看一下


export default {
  name: 'Todo',
  props: ['todos'],
  model: {
    prop: 'todos',
  },
  data() {
    return {
      msg: '',
      markdown: '',
    };
  },
  methods: {
    say() {
      if (this.msg === null || this.msg === '') {
        return;
      }
      // this.axios.get('/api/').then((response) => {
      //   window.console.log(response);
      // });
      // this.$store.commit('increment',1);
      const md = new MarkdownIt({
        html: true,
      });
      md.use(emoji);
      this.axios.get('/static/test.md').then((response) => {
        this.markdown = md.render(response.data);
      });
      this.$store.dispatch('auth/updateValue');
      this.todos.push({ text: this.msg });
      window.console.log(this.msg);
      this.msg = '';
    },
  },
};
</script>

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
