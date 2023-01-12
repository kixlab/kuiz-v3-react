import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './state/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
reportWebVitals()
