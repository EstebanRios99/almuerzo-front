/**
 * Created by chalosalvador on 3/1/20
 */
import React from 'react';
import Routes from '../constants/routes';
import Navigation from './Navigation';
import {Layout, Row, Col} from 'antd';
import {FacebookOutlined, InstagramOutlined, MailOutlined, WhatsAppOutlined} from '@ant-design/icons';
import logo from '../images/logo-TrialQ.png';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {useAuth} from "../providers/Auth";

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = props => {
    console.log('props', props);
    const {isAuthenticated} = useAuth();
    return (
        <div className='app'>
            <Layout>
                <Row type='flex' justify='center' className='header-wrapper'>
                    <Col span={20}>
                        <Header className='header'>
                            <Row type='flex' justify='space-between' align='bottom'>
                                <h1 style={{color: "white"}}>Sistema de registro de asitencia</h1>
                                {
                                    isAuthenticated
                                        ? <Col xs={24} md={8} className='logo-wrapper'>
                                            <a href={process.env.REACT_APP_DOMAIN}>
                                                <img className='logo' src={logo} alt='Trial Q'/>
                                            </a>
                                        </Col>
                                        : <Col xs={24} md={8} className='logo-wrapper'>
                                            <a href={process.env.REACT_APP_DOMAIN}>
                                                <Link to={Routes.HOME}><img className='logo' src={logo} alt='Trial Q'/></Link>
                                            </a>
                                        </Col>
                                }
                                <Col md={12} align='right' className='main-menu'>
                                    <Navigation mode={'horizontal'}/>
                                </Col>
                            </Row>
                        </Header>
                    </Col>
                </Row>


                <Content className='content'>
                    <Row type='flex' justify='center' style={{flex: 'auto'}}>
                        <Col xs={22} md={20}>
                            {props.children}
                        </Col>
                    </Row>
                </Content>

                <Footer className='footer'>
                    <Row>
                        <Col xs={{span: 24}} md={8} className='logo-blanco'>

                        </Col>

                        <Col xs={{
                            span: 24,
                            offset: 0
                        }}
                             md={{
                                 span: 5,
                                 offset: 3
                             }}
                        >
                            Elaborado por: <br/>
                            <a href='https://grupomenta.com' rel='noopener noreferrer' target='_blank'>
                                <img src={logo} alt='Trial Q' height={50}/>
                            </a>
                        </Col>

                        <Col xs={{
                            span: 24,
                            offset: 0
                        }}
                             md={{
                                 span: 4,
                                 offset: 4
                             }}
                             className='contact-links'>
                            <p><strong>Contáctanos</strong></p>
                            <p><MailOutlined/> <a href='mailto:registro@natuflor.com'>registro@natuflor.com</a></p>
                            <p><WhatsAppOutlined/> <a href='https://wa.me/593988185518' target='_blank'
                                                      rel='noopener noreferrer'>+593 994087512</a></p>
                        </Col>
                    </Row>

                    <Row type='flex' justify='space-between' align='bottom'>
                        <Col xs={24} md={8}>
                            {moment().format('YYYY-mm')} - Registro.
                        </Col>

                        <Col xs={24} md={4} className='footer-links'>
                            <Link to={Routes.ABOUT} style={{marginRight: 20}}>Preguntas frecuentes</Link>
                        </Col>
                        <Col xs={24} md={4} className='footer-links'>
                            <Link to={Routes.ABOUT}>Términos y condiciones</Link>
                        </Col>

                        <Col xs={24} md={8} className='logos-social'>
                            <strong>Síguenos en:</strong>
                            <a href='https://www.facebook.com'
                               target='_blank'
                               rel='noopener noreferrer'
                               style={{
                                   marginLeft: 30,
                                   marginRight: 30
                               }}>
                                <FacebookOutlined/>
                            </a>

                            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                                <InstagramOutlined/>
                            </a>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </div>
    );
};

export default MainLayout;
