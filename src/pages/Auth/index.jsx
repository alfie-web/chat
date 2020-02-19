import React from 'react';
import { Route } from 'react-router-dom';
import {LoginForm, RegisterForm} from '../../modules';
import {RegisterCheckEmail} from '../../components';
import './Auth.sass';

const Auth = () => {
            return (
                        <section className="auth">
                                    <div className="auth__content">
                                                <Route exact path={['/', '/login']} component={LoginForm} />
                                                <Route exact path="/register" component={RegisterForm} />
                                                <Route exact path="/register/verify" component={RegisterCheckEmail} />
                                    </div>
                        </section>
            );
}

export default Auth;