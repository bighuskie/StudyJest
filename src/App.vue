<template>
  <div id="app">
    <TodoList msg="Welcome to Your TodoList" />
  </div>
</template>

<script>
import TodoList from '@/layouts/TodoList/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
}
body {
  background-color: #CDCDCD;
}
</style>
