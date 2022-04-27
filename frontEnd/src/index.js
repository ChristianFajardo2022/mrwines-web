import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

//importo los componentes de REDUX:
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'

const reduxStore = createStore(mainReducer,applyMiddleware(thunk))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
)
