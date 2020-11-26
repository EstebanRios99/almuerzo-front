import React from 'react';
import {Typography} from 'antd';
import RegistersList from '../components/RegistersList';
const RegisterPage = () => {

    const {Title}=Typography;

    return (
        <>
        <Title level={2}>Registros de empleados</Title>
            <RegistersList />
        </>
    );
};

export default RegisterPage;
