import React from "react";
import thunk from "redux-thunk";
import { Route } from "react-router";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";
import Home from "./components/Home";
import { Layout } from "./components/Layout";

import "./custom.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Route exact path="/" component={Home} />
      </Layout>
    </Provider>
  );
};
export default App;

/* <Route path='/counter' component={Counter} /> */
