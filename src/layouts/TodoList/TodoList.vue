<template>
  <div>
    <Header @add="addUndoList" />
    <UndoList
      :undoList="undoList"
      @delete="deleteItem"
      @changeStatus="handleChangeStatus"
      @blurToReset="handleBlurToReset"
      @changeValue="handleChangeValue"
    />
  </div>
</template>

<script>
import Header from '@/layouts/TodoList/components/Header.vue'
import UndoList from '@/layouts/TodoList/components/UndoList.vue'
import axios from 'axios'
export default {
  name: 'TodoList',
  data () {
    return {
      undoList: []
    }
  },
  mounted () {
    axios.get('/fetchUndoList.json').then(res => {
      this.undoList = res.data
    }).catch(e => {
      console.error('请求失败！')
    })
  },
  methods: {
    addUndoList (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    deleteItem (index) {
      this.undoList.splice(index, 1)
    },
    handleChangeStatus (index) {
      this.undoList = this.undoList.map((item, i) => {
        if (index === i) {
          return { status: 'input', value: item.value }
        } else {
          return { status: 'div', value: item.value }
        }
      })
    },
    handleBlurToReset () {
      this.undoList = this.undoList.map(item => {
        return { status: 'div', value: item.value }
      })
    },
    handleChangeValue (value, index) {
      const newValue = { status: 'input', value }
      this.undoList.length && this.undoList.splice(index, 1, newValue)
    }
  },
  components: {
    Header,
    UndoList
  }
}
</script>

<style scoped lang="scss">
</style>
