import React from 'react'

const Context = React.createContext({
  savedVideoList: [],
  darkTheme: false,
  addVideo: () => {},
  removeVideo: () => {},
  changeTheme: () => {},
})
export default Context
