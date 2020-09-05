import React from "react";
import { createStore } from "redux";
import { Route } from "react-router";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import rootReducer from "./reducers";
import Home from "./components/Home";
import { Layout } from "./components/Layout";

import "./custom.css";

const store = createStore(rootReducer, devToolsEnhancer());

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
