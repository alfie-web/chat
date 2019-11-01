import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'antd';
import { Button, Block } from '../../components';

class RegisterForm extends React.Component {
            

            render() {
                        const success = false;
                        return (
                                    <Fragment>
                                                <div className="auth__top">
                                                            <h2>Регистрация</h2>
                                                            <p>Для входа в чат, вам нужно зарегистрироваться</p>
                                                </div>

                                                <Block>
                                                            {!success ?
                                                                        <form>
                                                                                    <div className="auth__input-item">
                                                                                                <Input
                                                                                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                                                            placeholder="Ваш E-mail" size="large"
                                                                                                />
                                                                                    </div>
                                                                                    <div className="auth__input-item">
                                                                                                <Input
                                                                                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                                                            placeholder="Ваше имя" size="large"
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
                                                                                                <Input
                                                                                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                                                                            type="password"
                                                                                                            placeholder="Повторите пароль" size="large"
                                                                                                />
                                                                                    </div>
                                                                                    <div className="auth__input-item">
                                                                                                <Button type="primary" size="large" htmlType="submit">
                                                                                                            Зарегистрироваться
                                                                                                </Button>
                                                                                    </div>
                                                                                    
                                                                                    <Link to="/login" className="auth__register-link">Войти в аккаунт</Link>
                                                                        </form>
                                                                        :
                                                                        <div className="auth__success-block">
                                                                                    <div>
                                                                                                <Icon type="info-circle" theme="twoTone" style={ {fontSize: '50px'} } />
                                                                                    </div>
                                                                                    <h2>Подтвердите свой аккаунт</h2>
                                                                                    <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
                                                                        </div>
                                                            }
                                                            
                                                </Block>
                                    </Fragment>
                        );
            }
}

export default RegisterForm;