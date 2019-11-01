import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'antd';
import { Button, Block } from '../../components';

class LoginForm extends React.Component {


            render() {
                        return (
                                    <Fragment>
                                                <div className="auth__top">
                                                            <h2>Войти в аккаунт</h2>
                                                            <p>Пожалуйста, войдите в свой аккаунт</p>
                                                </div>

                                                <Block>
                                                            <form>
                                                                        <div className="auth__input-item">
                                                                                    <Input
                                                                                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                                                placeholder="Ваш E-mail" size="large"
                                                                                    />
                                                                        </div>
                                                                        <div className="auth__input-item">
                                                                                    <Input
                                                                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                                                type="password"
                                                                                                placeholder="Ваш пароль" size="large"
                                                                                    />
                                                                        </div>
                                                                        <div className="auth__input-item">
                                                                                    <Button type="primary" size="large" htmlType="submit">
                                                                                                Войти в аккаунт
                                                                                    </Button>
                                                                        </div>
                                                                        
                                                                        <Link to="/register" className="auth__register-link">Зарегистрироваться</Link>
                                                            </form>
                                                </Block>
                                    </Fragment>
                        );
            }
}

export default LoginForm;