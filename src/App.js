import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Redux Files/Reducers'
import thunk from "redux-thunk";
import { Home } from './UI Components/Home'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const App = () => {


  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact strict path="/" children={<Home />} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
