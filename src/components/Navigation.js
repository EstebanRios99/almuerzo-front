/**
 * Created by chalosalvador on 2/7/20
 */
import React, {useState} from 'react';
import Routes from '../constants/routes';
import {useAuth} from '../providers/Auth';
import {Menu} from 'antd';
import {LogoutOutlined, LoginOutlined, LoadingOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import '../styles/navigation.css';

const linkStyle = {};

const Navigation = (props) => {
    let location = useLocation();

    const [menuState, setMenuState] = useState({
        current: location.pathname, // set the current selected item in menu, by default the current page
        collapsed: false,
        openKeys: []
    });
    const {isAuthenticated, isCheckingAuth, currentUser} = useAuth();

    React.useEffect(() => {
        setMenuState({
            ...menuState,
            current: location.pathname
        });
    }, [location, isAuthenticated]);

    const handleClick = (e) => {
        console.log('click ', e);
        setMenuState({
            ...menuState,
            current: e.key
        });
    };

    return (
        <>
            <Menu
                mode={props.mode}
                onClick={handleClick}
                className='menu'
                theme='dark'
                selectedKeys={[menuState.current]}
                style={{
                    lineHeight: '64px',
                    width: 'fit-content'
                }}
            >
                {
                    isAuthenticated
                        ? <Menu.SubMenu icon={<UserOutlined/>} title={currentUser && currentUser.name+' '+currentUser.lastname}>
                            <Menu.Item>
                                <Link to={Routes.REGISTER} style={linkStyle}>Registrar Usuario</Link>
                            </Menu.Item>
                            <Menu.Item key={Routes.LOGIN}>
                                <Link to={Routes.LOGOUT} className='logout-link'>
                                    {
                                        isCheckingAuth
                                            ? <LoadingOutlined/>
                                            : <><LogoutOutlined/> Salir
                                            </>
                                    }
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                        : <Menu
                            mode={props.mode}
                            onClick={handleClick}
                            className='menu'
                            theme='dark'
                            selectedKeys={[menuState.current]}
                            style={{
                                lineHeight: '64px',
                                width: 'fit-content'
                            }}>
                            <Menu.Item key={Routes.LOGIN}>
                                <Link to={Routes.LOGIN}>
                                    {
                                        isCheckingAuth
                                            ? <LoadingOutlined/>
                                            : <><LoginOutlined/> Ingresar</>
                                    }
                                </Link>
                            </Menu.Item>

                        </Menu>
                }

            </Menu>
        </>
    );
};

export default Navigation;
