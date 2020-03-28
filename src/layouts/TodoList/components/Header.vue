<template>
  <div class="header-wrapper">
    <div class="header-content">
      TodoList
      <input
        class="header-input"
        placeholder="TodoItem"
        data-test="input"
        v-model="inputValue"
        @keyup.enter="addItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    addItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrapper {
  line-height: 60px;
  background-color: #333;
  .header-content {
    width: 600px;
    margin: 0 auto;
    color: #fff;
    font-size: 24px;
    .header-input {
      float: right;
      width: 360px;
      margin-top: 14px;
      line-height: 24px;
      outline: none;
      color: #333;
      text-indent: 12px;
    }
  }
}
</style>
