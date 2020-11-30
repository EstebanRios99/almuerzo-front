import React from 'react';
//import Routes from '../constants/routes';
import API from '../data/index';
import {Button, Col, Form, Input, message, Row, Typography} from 'antd';
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
} from '@ant-design/icons';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
//import withoutAuth from '../hocs/withoutAuth';
import '../styles/register.css';
import Cookies from 'js-cookie';
import {useAuth} from '../providers/Auth';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons/lib';

const {Title} = Typography;

const RegisterUser = () => {

    const {setAuthenticated, setCurrentUser} = useAuth();
 

    const onFinish = async (userData) => {
        console.log('Received values of form: ', userData);
        const {name, email, lastname, password, password_confirmation} = userData;

        try {
            const user = await API.post('/register', {
                name,
                lastname,
                email,
                password,
                password_confirmation,
            });

            console.log('User', user);

            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            Cookies.set('token', user.data.token, {expires: 1});
            API.headers['Authorization'] = 'Bearer ' + user.data.token; // start sending authorization header
            delete user.data.token;
            setCurrentUser(user.data);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo registrar el usuario', e);
            setAuthenticated(false);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    return (
        <>
            
            <Title style={{textAlign: 'center'}}>Registro</Title>
            <Row justify='center' className='login'>
                <Col span={8}>
                    <Form name='register-form'
                          className='register-form'
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          onFinish={onFinish}
                    >
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu nombre'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Nombre'/>
                        </Form.Item>
                        <Form.Item name='lastname'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu apellido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Apellido'/>
                        </Form.Item>
                        <Form.Item name='email'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu email'
                                       },
                                       {
                                           type: 'email',
                                           message: 'Ingresa un correo válido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<MailOutlined/>} placeholder='Email'/>
                        </Form.Item>

                        <Form.Item name='password'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu contraseña'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Contraseña'/>
                        </Form.Item>

                        <Form.Item name='password_confirmation'
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Confirma tu contraseña',
                                       },
                                       ({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject('Las contraseñas no coinciden');
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Confirma tu contraseña'/>
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-form-button'>
                                Registrarme
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default RegisterUser;

