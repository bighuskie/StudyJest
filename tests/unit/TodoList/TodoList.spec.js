import { shallowMount } from '@vue/test-utils'
import TodoList from '@/layouts/TodoList/TodoList.vue'
import UndoList from '@/layouts/TodoList/components/UndoList.vue'

describe('测试TodoList.vue', () => {
  it('组件初始化时，未完成项数据 undoList 默认为[]', () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.vm.$data.undoList
    expect(undoList).toEqual([])
  })

  it('组件监听到 Header 组件外发的add事件时，addUndoList执行，undoList 新增一条数据', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.addUndoList(4)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 2 },
      { status: 'div', value: 3 },
      { status: 'div', value: 4 }
    ])
  })

  it('组件初始化时，应该给UndoList组件传递 undoList', () => {
    const wrapper = shallowMount(TodoList)
    const UndoListWrapper = wrapper.find(UndoList)
    const undoList = UndoListWrapper.props('undoList')
    expect(undoList).toBeTruthy()
  })

  it('组件监听到 UndoList 组件外发的delete事件时，deleteItem执行，undoList 减少一条数据', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.deleteItem(1)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 3 }
    ])
  })

  it('组件监听到 UndoList 组件外发的changeStatus事件时，handleChangeStatus执行', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.handleChangeStatus(1)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'input', value: 2 },
      { status: 'div', value: 3 }
    ])
  })

  it('组件监听到 UndoList 组件外发的blurToReset事件时，handleBlurToReset执行', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.handleBlurToReset()
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 2 },
      { status: 'div', value: 3 }
    ])
  })

  it('组件监听到 UndoList 组件外发的changeValue事件时，handleChangeValue执行', () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.handleChangeValue('change', 1)
    expect(wrapper.vm.$data.undoList).toEqual([
      { status: 'div', value: 1 },
      { status: 'input', value: 'change' },
      { status: 'div', value: 3 }
    ])
  })
})
