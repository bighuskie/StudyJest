import { mount } from '@vue/test-utils'
import TodoList from '@/layouts/TodoList/TodoList.vue'
import { findTestWrapper } from '@/utils/testUtils.js'
import Vue from 'vue'
import store from '@/store.js'

describe('TodoList 组件集成测试', () => {
  it(`
    1. 用户在header组件输入框输入内容
    2. 用户点击回车按钮确认输入
    3. UndoList组件会新增一条列表项
  `, async () => {
    const wrapper = mount(TodoList, { store })
    const inputValue = 'integration'
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.setValue(inputValue)
    inputElem.trigger('keyup.enter')
    await Vue.nextTick()
    const undoListItem = findTestWrapper(wrapper, 'item')
    expect(undoListItem.length).toBe(1)
    expect(undoListItem.at(0).text()).toContain(inputValue)
  })

  it.only(`
    1. 用户在首次访问TodoList时，请求远程数据
    2. UndoList组件会显示数据
  `, async () => {
    const wrapper = mount(TodoList, { store })
    await Vue.nextTick()
    const undoListItem = findTestWrapper(wrapper, 'item')
    expect(undoListItem.length).toBe(2)
  })
})
