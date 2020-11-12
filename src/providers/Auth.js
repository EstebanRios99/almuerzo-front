import React, {useEffect} from 'react';
//import API from '../data';
import Cookies from 'js-cookie';
import { attachTypeApi } from 'antd/lib/message';

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => {},
});

export const AuthProvider = ({children})=>{
    const [ isAuthenticated, setAuthenticated ] = React.useState( false );
    const [ isCheckingAuth, setIsCheckingAuth ] = React.useState( true );
    const [ currentUser, setCurrentUser ] = React.useState( null );

    useEffect ( () => {
        const initializeAuth = async() => {
            window.addEventListener('storage',syncLogut);
            console.log('added storage event');

            const token = !!Cookies.get('token');
            if (token) {
                try {
                  const currentUserResponse = await attachTypeApi.get('/user');
                  console.log('currentUserResponse', currentUserResponse);
                  setCurrentUser( currentUserResponse && currentUserResponse.data);
                  setAuthenticated( true );  
                }catch (e){
                    console.log('e', e);
                    setAuthenticated(false);
                }
            }
            setIsCheckingAuth(false);

            return () => {
                console.log('remove storage event');

                window.removeEventListener('storage', syncLogut);
                window.localStorage.removeItem('login');
            };
        };

        initializeAuth();
    },[]);


    const syncLogut = event => {
        console.log('event',event);

        if (event.key === 'login'){
            console.log('login from storage!');
            window.location.reload();
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isCheckingAuth,
                setAuthenticated,
                currentUser,
                setCurrentUser
            }}
            >
                {children}
            </AuthContext.Provider>
    );
};

export function useAuth(){
    const context = React.useContext(AuthContext);
    if (context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}