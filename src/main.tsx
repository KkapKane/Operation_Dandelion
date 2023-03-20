import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./styles/canvasContainer.scss"
import { Store } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>

  )
