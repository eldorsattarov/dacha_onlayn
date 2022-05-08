import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";
import "./css/style.css";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
const store = createStore(rootReducer,compose(applyMiddleware(thunk)));
ReactDOM.render(
     <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
     </Provider>,
    document.getElementById('root')
);
