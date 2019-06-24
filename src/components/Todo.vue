<template>
  <div>
    <h2>{{this.$store.state.other.Num}}</h2>
    <!-- <input type="text" v-model="msg"  v-validate="'required|email'" name="email"/> -->
    <input type="text" v-model="msg"/>
    <span>{{ errors.first('email') }}</span>
    <button v-on:click="say">添加</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
      </li>
    </ul>
    <div class="markdown_content" v-html="markdown">
      {{ markdown }}
    </div>
  </div>
</template>

<script>
const MarkdownIt = require('markdown-it');
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
      const md = new MarkdownIt();
      const mdStr = '``` \r\n测试\r\n ```\r\n # markdown-it rulezz! \r\n# markdown-it rulezz!\r\n    test';
      this.markdown = md.render(mdStr);
      window.console.log(this.markdown);
      this.$store.dispatch('auth/updateValue');
      this.todos.push({ text: this.msg });
      window.console.log(this.msg);
      this.msg = '';
    },
  },
};
</script>

<style scoped>

</style>
