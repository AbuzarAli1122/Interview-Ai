import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.scss'
import { Provider } from 'react-redux'
import { store } from '../src/app/store.js'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
     <ToastContainer
      position="top-center"
      autoClose={3000}
      theme="colored"
    />
    </Provider>
  </StrictMode>,
)
