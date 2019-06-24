<template>
  <div>
    <p>文章{{ index }}</p>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: ['index'],
  watch: {
    index() {
      window.console.log(this.index);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
