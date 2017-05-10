import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';

//material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snack from './components/Snack';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.shape().isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    goToDashboard = () => {
        this.props.dispatch(push('/dashboard'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        const dashboardClass = classNames({
            active: this.props.pathName === '/dashboard'
        });
        const loginClass = classNames({
            active: this.props.pathName === '/login'
        });
        const registerClass = classNames({
            active: this.props.pathName === '/register'
        });

        return (
            <MuiThemeProvider>
              <div className="app">
                  <nav className="navbar navbar-default">
                      <div className="container-fluid">
                          <div className="navbar-header">
                              <button type="button"
                                      className="navbar-toggle collapsed"
                                      data-toggle="collapse"
                                      data-target="#top-navbar"
                                      aria-expanded="false"
                              >
                                  <span className="sr-only">Toggle navigation</span>
                                  <span className="icon-bar" />
                                  <span className="icon-bar" />
                                  <span className="icon-bar" />
                              </button>
                              <a className="navbar-brand" tabIndex="0" onClick={this.goToIndex}>
                                  My expenses
                              </a>
                          </div>
                          <div className="collapse navbar-collapse" id="top-navbar">
                              {this.props.isAuthenticated ?
                                  <ul className="nav navbar-nav navbar-right">
                                      <li className={homeClass}>
                                          <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                                              <i className="fa fa-home" /> Home
                                          </a>
                                      </li>
                                      <li className={dashboardClass}>
                                          <a className="js-go-to-protected-button"
                                             tabIndex="0"
                                             onClick={this.goToDashboard}
                                          >
                                              Dashboard
                                          </a>
                                      </li>
                                      <li>
                                          <a className="js-logout-button" tabIndex="0" onClick={this.logout}>
                                              Logout
                                          </a>
                                      </li>
                                  </ul>
                                  :
                                  <ul className="nav navbar-nav navbar-right">
                                      <li className={homeClass}>
                                          <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                                              <i className="fa fa-home" /> Home
                                          </a>
                                      </li>
                                      <li className={loginClass}>
                                          <Link className="js-login-button" to="/login">Login</Link>
                                      </li>
                                      <li className={registerClass}>
                                          <Link className="js-login-button" to="/register">Registration</Link>
                                      </li>
                                  </ul>
                              }
                          </div>
                      </div>
                  </nav>

                  <div>
                      <Snack />
                      {this.props.children}
                  </div>
              </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname,
        showNotify: state.data.showNotify,
        message: state.data.message,
    };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
