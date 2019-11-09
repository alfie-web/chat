import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import { Icon, Input } from 'antd';
import { Button, Block, Input } from '../../components';
import {Field, reduxForm} from 'redux-form';

import { required } from '../../utils/validator';

class LoginFormContainer extends React.Component {
            submitHandler = (formData) => {  // В коллбек придут собранные данные из формы
                        // const {email, password, rememberMe} = formData;
                        // props.login(email, password, rememberMe);
                        console.log(formData);
            }

            render() {
                        return (
                                    <Fragment>
                                                <div className="auth__top">
                                                            <h2>Войти в аккаунт</h2>
                                                            <p>Пожалуйста, войдите в свой аккаунт</p>
                                                </div>

                                                <Block>
                                                            <ReduxLoginForm onSubmit={this.submitHandler} />
                                                </Block>
                                    </Fragment>
                        );
            }
}


const LoginForm = (props) => {
            return (
                        <form onSubmit={props.handleSubmit}>
                                    <Field 
                                                component={Input} 
                                                name="email"
                                                placeholder={'Ваш E-mail'}
                                                antdIconType="user"
                                                className="auth__input-item"
                                                validate={required} 
                                    />
                                    <Field 
                                                component={Input} 
                                                name="password" 
                                                type="password"
                                                placeholder="Ваш пароль"
                                                antdIconType="lock"
                                                className="auth__input-item" 
                                                validate={required} 
                                    />

                                    <div className="auth__input-item">
                                                <Button type="primary" size="large" htmlType="submit">
                                                            Войти в аккаунт
                                                </Button>
                                    </div>
                                    
                                    <Link to="/register" className="auth__register-link">Зарегистрироваться</Link>
                        </form>
            );
}

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);

export default LoginFormContainer;