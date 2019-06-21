<template>
  <div>
    {{ msg }}
    <p>{{ $route.meta.active }}</p>
  </div>
</template>

<script>
export default{
  data() {
    return {
      msg: '关于本网站',
    };
  },
};
</script>

<style>

</style>
