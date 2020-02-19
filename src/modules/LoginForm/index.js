import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { Icon, Input } from 'antd';
import { Button, Block, Input, withConfirmedAuthRedirect } from '../../components';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Alert } from 'antd';

import { authActions } from '../../redux/actions';
import { required } from '../../utils/validator';
// 1:35:12
class LoginFormContainer extends React.Component {
            submitHandler = (formData) => {  // В коллбек придут собранные данные из формы
                        // console.log(formData);
                        this.props.authMe(formData);
            }

            render() {
                        // if (this.props.isAuth) return <Redirect to="/im" />
                        // if (this.props.isAuth) return <Redirect to="/" />

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
            // console.log(props.submitting);
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
                                                <Button type="primary" size="large" htmlType="submit" disabled={props.invalid}>
                                                            Войти в аккаунт
                                                </Button>
                                    </div>

                                    { props.error && /* Эта штука придёт из redux-form */
                                                <div className="auth__error">
                                                            <Alert
                                                                        message={props.error}
                                                                        type="error"
                                                                        closable
                                                            />
                                                </div>
                                    } 
                                    
                                    <Link to="/register" className="auth__register-link">Зарегистрироваться</Link>
                        </form>
            );
}

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);


// export default connect(({ auth }) => ({ isAuth: auth.isAuth }), authActions)(LoginFormContainer);

export default compose(
        connect(({ auth }) => ({ isAuth: auth.isAuth }), authActions),
        withConfirmedAuthRedirect
    )(LoginFormContainer);
    