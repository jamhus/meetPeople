import React from "react";
import thunk from "redux-thunk";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";
import { Home } from "./components/Home";
import Login from "./components/LoginPage";
import { Layout } from "./components/Layout";
import ValuesPage from "./components/ValuesPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./custom.css";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/values" component={ValuesPage} />
        </Switch>
      </Layout>
    </Provider>
  );
};
export default App;

/* <Route path='/counter' component={Counter} /> */
