import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';

import * as actionCreators from '../../actions/auth';

const Form = t.form.Form;

const Register = t.struct({
    email: t.String,
    first_name: t.String,
    last_name: t.String,
    password: t.String
});

const LoginFormOptions = {
    auto: 'placeholders',
    fields: {
        password: {
            type: 'password'
        },
        email: {
            type: 'email'
        }
    }
};

class RegisterView extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        isAuthenticated: React.PropTypes.bool.isRequired,
        isAuthenticating: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            authLoginUser: React.PropTypes.func.isRequired
        }).isRequired,
        location: React.PropTypes.shape({
            query: React.PropTypes.object.isRequired
        })
    };

    static defaultProps = {
        statusText: '',
        location: null
    };

    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.props.location.query.next || '/' : '/';
        this.state = {
            formValues: {
                email: '',
                first_name: '',
                last_name: '',
                password: ''
            },
            redirectTo: redirectRoute
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        }
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    login = (e) => {
        e.preventDefault();
        const value = this.loginForm.getValue();
        if (value) {
            this.props.actions.authRegisterUser(
              value.email,
              value.first_name,
              value.last_name,
              value.password,
              this.state.redirectTo
            );
        }
    };

    render() {
        let statusText = null;
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('Authentication Error') === 0,
                'alert-success': this.props.statusText.indexOf('Authentication Error') !== 0
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container login">
                <h1 className="text-center">Registration</h1>
                <div className="login-container margin-top-medium">
                    {statusText}
                    <form onSubmit={this.login}>
                        <Form ref={(ref) => { this.loginForm = ref; }}
                              type={Register}
                              options={LoginFormOptions}
                              value={this.state.formValues}
                              onChange={this.onFormChange}
                        />
                        <button disabled={this.props.isAuthenticating}
                                type="submit"
                                className="btn btn-default btn-block"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
