import { shallowMount } from '@vue/test-utils'
import UndoList from '@/layouts/TodoList/components/UndoList.vue'
import { findTestWrapper } from '@/utils/testUtils.js'

describe('测试UndoList.vue', () => {
  it('组件初始化时，props参数undoList 默认为[]，count为0，列表无内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: { undoList: [] }
    })
    const count = findTestWrapper(wrapper, 'count').at(0)
    const listItem = findTestWrapper(wrapper, 'item')
    expect(count.text()).toEqual('0')
    expect(listItem.length).toEqual(0)
  })

  it('props参数undoList 不为[]时，count不为0，列表有内容,且有删除按钮', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const count = findTestWrapper(wrapper, 'count').at(0)
    const listItem = findTestWrapper(wrapper, 'item')
    const deleteBtn = findTestWrapper(wrapper, 'delete-btn')
    expect(count.text()).toEqual('3')
    expect(listItem.length).toEqual(3)
    expect(deleteBtn.length).toEqual(3)
  })

  it('点击一次删除按钮，外发删除事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const deleteBtn = findTestWrapper(wrapper, 'delete-btn').at(0)
    deleteBtn.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
    expect(wrapper.emitted().delete[0][0]).toBe(0)
  })

  it('点击列表项，emit外发 changeStatus 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const item = findTestWrapper(wrapper, 'item').at(1)
    item.trigger('click')
    expect(wrapper.emitted().changeStatus).toBeTruthy()
    expect(wrapper.emitted().changeStatus[0][0]).toBe(1)
  })

  it('点击一个列表项，该列表变为输入框，其他列表不变', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'input', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const itemInput = findTestWrapper(wrapper, 'item-input')
    expect(itemInput.length).toBe(1)
    expect(itemInput.at(0).element.value).toBe('2')
  })

  it('列表项输入框失去焦点，emit外发 blurToReset 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'input', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const itemInput = findTestWrapper(wrapper, 'item-input').at(0)
    itemInput.trigger('blur')
    expect(wrapper.emitted().blurToReset).toBeTruthy()
  })

  it('改变列表项输入值，emit外发 changeValue 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        undoList: [
          { status: 'div', value: 1 },
          { status: 'input', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const itemInput = findTestWrapper(wrapper, 'item-input').at(0)
    itemInput.trigger('change')
    expect(wrapper.emitted().changeValue).toBeTruthy()
  })
})
