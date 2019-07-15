<template>
  <div class="appcontent">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'CustomApp',
};
</script>

<style lang="scss">
html,body{
  height: 100%;
}
.appcontent{
  height: 100%;
}
</style>
