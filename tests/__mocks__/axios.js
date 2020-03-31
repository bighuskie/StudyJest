const undoList = {
  success: true,
  data: [
    {
      status: 'div',
      value: 'test'
    },
    {
      status: 'div',
      value: 'change'
    }
  ]
}

const defaultData = {
  success: true,
  data: []
}

export default {
  get (url) {
    if (url === '/fetchUndoList.json') {
      return Promise.resolve(undoList)
    } else {
      return Promise.resolve(defaultData)
    }
  }
}
