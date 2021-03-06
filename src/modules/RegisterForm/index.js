import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Button, Block, withConfirmedAuthRedirect } from '../../components';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';

import { authActions } from '../../redux/actions';

import { Input } from '../../components';
import { required, maxLengthCreator, email, pass } from '../../utils/validator';

const maxLength20 = maxLengthCreator(20);

class RegisterFormContainer extends React.Component {
            submitHandler = (formData) => { 
                        console.log(formData);
                        this.props.registerUser(formData);
            }

            render() {
                //     console.log(this.props.isAuth)
                // TODO: А для этой штуки можно и HOC сделать (типо если withAuthRedirect защищает от неавторизованных, то этот наоборот защищал бы какие-то роуты от авторизованных)
                        // if (this.props.isAuth) return <Redirect to="/" />

                        return (
                                    <Fragment>
                                                <div className="auth__top">
                                                            <h2>Регистрация</h2>
                                                            <p>Для входа в чат, вам нужно зарегистрироваться</p>
                                                </div>

                                                <Block>
                                                            <ReduxRegisterForm onSubmit={this.submitHandler} />
                                                </Block>
                                    </Fragment>
                        )
            }
}

const RegisterForm = props => {
            const success = false;

            return (
                        <Fragment>
                        {!success ?
                                    <form onSubmit={props.handleSubmit}>
                                                <Field 
                                                            component={Input} 
                                                            name="email"
                                                            placeholder="Ваш E-mail"
                                                            className="auth__input-item"
                                                            antdIconType="mail"
                                                            validate={[required, email]}
                                                />

                                                <Field 
                                                            component={Input} 
                                                            name="fullname"
                                                            placeholder="Ваше имя"
                                                            className="auth__input-item"
                                                            validate={[required, maxLength20]}
                                                />

                                                <Field 
                                                            component={Input} 
                                                            name="password"
                                                            type="password"
                                                            placeholder="Ваш пароль"
                                                            className="auth__input-item"
                                                            validate={[required, maxLength20, pass]}
                                                />

                                                
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
                        </Fragment>   
            );
}


const ReduxRegisterForm = reduxForm({form: 'register'})(RegisterForm);

// export default connect(({ auth }) => ({ isAuth: auth.isAuth }), authActions)(RegisterFormContainer);
export default compose(
    connect(({ auth }) => ({ isAuth: auth.isAuth }), authActions),
    withConfirmedAuthRedirect
)(RegisterFormContainer);






















// // with Formik

// import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { Icon, Input } from 'antd';
// import { Button, Block } from '../../components';
// import { withFormik } from 'formik';
// import classNames from 'classnames';
// import validator from '../../utils/validator';

// const RegisterForm = props => {
//             const {
//                         values,
//                         touched,
//                         errors,
//                         handleChange,
//                         handleBlur,
//                         handleSubmit,
//             } = props;

//             const success = false;
            
//             return (
//                         <Fragment>
//                                     <div className="auth__top">
//                                                 <h2>Регистрация</h2>
//                                                 <p>Для входа в чат, вам нужно зарегистрироваться</p>
//                                     </div>

//                                     <Block>
//                                                 {!success ?
//                                                             <form onSubmit={handleSubmit}>
//                                                                         <div className={classNames("auth__input-item", 
//                                                                                                 {"input__item-error": errors.email || touched.email,
//                                                                                                 "input__item-success": touched.email && !errors.email})}>
//                                                                                     <Input
//                                                                                                 prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                                                                                 id="email"
//                                                                                                 placeholder="Ваш E-mail" size="large"
//                                                                                                 value={values.email}
//                                                                                                 onChange={handleChange}
//                                                                                                 onBlur={handleBlur}
//                                                                                     />
//                                                                                     <span>{errors.email || touched.email ? errors.email : ''}</span>

//                                                                         </div>
//                                                                         <div className="auth__input-item">
//                                                                                     <Input
//                                                                                                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                                                                                 placeholder="Ваше имя" size="large"
//                                                                                     />
//                                                                         </div>
//                                                                         <div className={classNames("auth__input-item", 
//                                                                                     {"input__item-error": errors.password || touched.password,
//                                                                                     "input__item-success": touched.password && !errors.password})}>
//                                                                         {/* <div className="auth__input-item"> */}
//                                                                                     <Input
//                                                                                                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                                                                                 type="password"
//                                                                                                 placeholder="Ваш пароль" size="large"
//                                                                                                 id="password"
//                                                                                                 value={values.password}
//                                                                                                 onChange={handleChange}
//                                                                                                 onBlur={handleBlur}
//                                                                                     />
//                                                                                     <span>{errors.password || touched.password ? errors.password : ''}</span>
//                                                                         </div>
//                                                                         <div className="auth__input-item">
//                                                                                     <Input
//                                                                                                 prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                                                                                                 type="password"
//                                                                                                 placeholder="Повторите пароль" size="large"
//                                                                                     />
//                                                                         </div>
//                                                                         <div className="auth__input-item">
//                                                                                     <Button type="primary" size="large" htmlType="submit">
//                                                                                                 Зарегистрироваться
//                                                                                     </Button>
//                                                                         </div>
                                                                        
//                                                                         <Link to="/login" className="auth__register-link">Войти в аккаунт</Link>
//                                                             </form>
//                                                 :
//                                                             <div className="auth__success-block">
//                                                                         <div>
//                                                                                     <Icon type="info-circle" theme="twoTone" style={ {fontSize: '50px'} } />
//                                                                         </div>
//                                                                         <h2>Подтвердите свой аккаунт</h2>
//                                                                         <p>На вашу почту отправлено письмо с ссылкой на подтверждение аккаунта.</p>
//                                                             </div>
//                                                 }
                                                
//                                     </Block>
//                         </Fragment>
//             );
// }


// export default withFormik({
//             mapPropsToValues: () => ({ 
//                         email: ''
//             }),    // Задаёт значения по умолчанию

//             // Custom sync validation
//             validate: values => {
//                         const errors = {};

//                         // if (!values.email) {
//                         //             errors.email = 'Введите E-mail';
//                         // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//                         //             errors.email = 'Некорректный E-mail';
//                         // }

//                         validator({isAuth: false, values, errors});

//                         return errors;
//             },

//             handleSubmit: (values, { setSubmitting }) => {
//                         setTimeout(() => {
//                                     alert(JSON.stringify(values, null, 2));
//                                     setSubmitting(false);
//                         }, 1000);
//             },

//             displayName: 'RegisterForm',
// })(RegisterForm);

// // export default RegisterForm;
