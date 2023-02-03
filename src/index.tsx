import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './state/store'
import { render } from 'react-dom'

const persistor = persistStore(store)

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
reportWebVitals()
