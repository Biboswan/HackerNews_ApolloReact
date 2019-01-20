import React, { Component, Fragment } from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }`

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }`;

class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: '',
    }

    render() {
        const { login, email, password, name} = this.state;
        return(
            <Fragment>
                <div className="flex flex-column">
                    {!login && (<input value={name}
                    onChange={e => this.setState({name: e.target.value})
                    }/>)}
                    <input
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        type="text"
                        placeholder="Your email address"
                    />
                    <input
                        value={password}
                        onChange={e => this.setState({ password: e.target.value })}
                        type="password"
                        placeholder="Choose a safe password"
                    />
                    </div>
                    <div className="flex mt3">
                        <Mutation 
                        mutation={login?LOGIN_MUTATION:SIGNUP_MUTATION}
                        variables={{email, password, name}}
                        onCompleted={data => this._confirm(data)}
                        >
                            {mutation => (
                            <div className="pointer mr2 button"
                                onClick={mutation}>
                                {login? 'login': 'create account'}
                            </div>
                            )}
                        </Mutation>
                        <div
                          className="pointer button"
                          onClick={() => this.setState({ login: !login })}
                        >
                          {login
                            ? 'need to create an account?'
                            : 'already have an account?'}
                        </div>
                    </div>
            </Fragment>)
    }

    _confirm = async data => {
            const { token } = this.state.login ? data.login : data.signup
            this._saveUserData(token)
            this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

export default Login;