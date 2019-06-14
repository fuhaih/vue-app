<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <span v-bind:title="msg">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
    <!-- <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
      </li>
    </ul> -->
    <p>全名</p>
    <input v-model="fullname" />
    <p>全名:{{ fullname }}</p>
    <p>firstname:{{ firstname }}</p>
    <p>lastname:{{ lastname }}</p>
    <Todo v-for="todos in todogroup" v-bind:key="todos.id" v-bind:todos="todos"></Todo>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
import Todo from '@/components/Todo';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      fullname: '',
      firstname: '',
      lastname: '',
      todogroup: [
        [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' },
        ],
        [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' },
        ],
      ],

    };
  },
  components: {
    Todo,
  },
  created() {
    window.console.log('HelloWorld is created');
  },
  watch: {
    fullname(newvalue) {
      const names = newvalue.split(' ');
      this.firstname = names[1];
      this.lastname = names[0];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
