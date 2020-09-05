import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { incrementWith } from "../actions";

const Home = ({ count, onClick }) => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new single-page application, built with:</p>
      <ul>
        <li>
          <Button onClick={(e) => onClick(5)}>Add 5</Button>
        </li>
        <li>{count}</li>
      </ul>
      <p>
        The <code>ClientApp</code> subdirectory is a standard React application
        based on the <code>create-react-app</code> template. If you open a
        command prompt in that directory, you can run <code>npm</code> commands
        such as <code>npm test</code> or <code>npm install</code>.
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  count: state.increment.count,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: (inc) => dispatch(incrementWith(inc)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
