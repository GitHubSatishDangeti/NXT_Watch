import React from 'react'

const Context = React.createContext({
  savedVideoList: [],
  addVideo: () => {},
  removeVideo: () => {},
})
export default Context
