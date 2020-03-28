<template>
  <div class="undolist-wrapper">
    <div class="title">
      正在进行
      <span class="count" data-test="count">{{undoList.length}}</span>
    </div>
    <ul class="item-wrapper">
      <li
        class="item"
        data-test="item"
        v-for="(item, index) in undoList"
        :key="index"
        @click="changeStatus(index)"
      >
        <input
          data-test="item-input"
          v-if="item.status === 'input'"
          :value="item.value"
          @blur="blurToReset"
          @change="(e) => changeValue(e.target.value, index)"
        />
        <span v-else>{{item.value}}</span>
        <span class="delete-btn" data-test="delete-btn" @click="handleDelete(index)">-</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: {
    undoList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('changeStatus', index)
    },
    blurToReset () {
      this.$emit('blurToReset')
    },
    changeValue (value, index) {
      this.$emit('changeValue', value, index)
    }
  }
}
</script>

<style scoped lang="scss">
.undolist-wrapper {
  width: 600px;
  margin: 0 auto;
  .title {
    margin: 10px 0;
    line-height: 30px;
    font-size: 24px;
    font-weight: bold;
    .count {
      margin-top: 5px;
      float: right;
      display: block;
      height: 20px;
      width: 20px;
      border-radius: 10px;
      line-height: 20px;
      text-align: center;
      background-color: #e6e6e6;
      font-size: 12px;
      color: #000;
    }
  }
  .item-wrapper {
    list-style-type: none;
    padding: 0;
    margin: 0;
    .item {
      margin-bottom: 10px;
      line-height: 32px;
      background-color: #fff;
      border-left: 5px solid #629a9a;
      border-radius: 3px;
      font-size: 12px;
      text-indent: 12px;
      .delete-btn {
        float: right;
        display: block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 6px 10px 0 0;
        background-color: #e6e6e6;
        border-radius: 10px;
        font-size: 12px;
        text-align: center;
        text-indent: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
