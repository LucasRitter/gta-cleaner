import React from 'react'
import { render } from 'react-dom'
import { registerSW } from 'virtual:pwa-register'
import { App } from './App'
import './index.css'

const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
})

render(<App />, document.getElementById('root'))
