// import {useAuth} from '../providers/Auth';
//import Loading from '../components/Loading;
import React from 'react';
//import Auth from '../data/auth';
import {Redirect, useHistory} from 'react-router-dom';
import Routes from '../constants/routes';

export default function withAuthRedirect ( {
    WrappedComponent,
    LoadingComponent = loading,
    expectedAuth,
    location
}) {
    const withAuthRedirectWrapper = props => {

        const {currentUser, isCheckingAuth, isAuthenticated } = useAuth();
        if (isCheckingAuth){
            return <LoadingComponent/>;
        }
        if (expectedAuth !== isAuthenticated){
            if (!expectedAuth){
                return <Redirect to={{
                    pathname: Routes.REGISTERS,
                    state: { from: props.location}
                }}/>
            }else{
                return <Redirect to={{
                    pathname: Routes.HOME,
                    state: { from: props.location }
                }}/>
            }
        }
        return <WrappedComponent { ...props}/>;
    };
    return withAuthRedirectWrapper;
}