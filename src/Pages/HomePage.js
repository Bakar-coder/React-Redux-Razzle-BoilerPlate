import React from "react";
import logo from "../react.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Helmet } from "react-helmet";
import "./Home.css";

const Home = props => {
  const head = () => (
    <Helmet>
      <title>{`SSR REACT REDUX BOILERPLATE`}</title>
      <meta property="og:title" content="Movies List" />
    </Helmet>
  );

  return (
    <div className="Home">
      {head()}
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h1>
          SERVER SIDE RENDERED REACT & REDUX <br /> CUSTOMIZABLE BOILERPLATE.
        </h1>
        <h3>Created by -: Wabomba Bakar</h3>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default {
  // loadData: ({ dispatch }) => dispatch(),
  component: connect(mapStateToProps, mapDispatchToProps)(Home)
};
