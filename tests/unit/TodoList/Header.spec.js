import { shallowMount } from '@vue/test-utils'
import Header from '@/layouts/TodoList/components/Header.vue'
import { findTestWrapper } from '@/utils/testUtils.js'

describe('测试Header.vue', () => {
  it('组件样式变化做提示', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot()
  })

  it('组件中 Input 框初始值为空', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })

  it('组件中 Input 框输入值变化时，data数据应该同步更新', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('test')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('test')
  })

  it('组件中 Input 框输入回车，内容为空时，不外发事件', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  it('组件中 Input 框输入回车，内容不为空时，外发事件', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('test')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
  })

  it('组件中 Input 框输入回车，内容不为空时，外发事件，同时清空输入框', () => {
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper, 'input')
    input.setValue('test')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })
})
