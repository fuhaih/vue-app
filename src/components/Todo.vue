<template>
  <div>
    <h2>{{this.$store.state.test.test}}</h2>
    <!-- <input type="text" v-model="msg"  v-validate="'required|email'" name="email"/> -->
    <input type="text" v-model="msg"/>
    <span>{{ errors.first('email') }}</span>
    <button v-on:click="say">添加</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.text}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: ['todos'],
  model: {
    prop: 'todos',
  },
  data() {
    return {
      msg: '',
    };
  },
  methods: {
    say() {
      if (this.msg === null || this.msg === '') {
        return;
      }
      this.axios.get('/api/').then((response) => {
        window.console.log(response);
      });
      // this.$store.commit('increment',1);
      this.$store.dispatch('auth/updateValue');
      this.todos.push({ text: this.msg });
      window.console.log(this.msg);
      this.msg = '';
    },
  },
};
</script>

<style>

</style>
