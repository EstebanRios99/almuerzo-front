import React, {useEffect, useState} from 'react';
import {Button, message, Skeleton, Card, Table, Col, Row, Input, Form} from 'antd';
import {useRegisters} from '../data/useRegisters';
import ShowError from './ShowError';
import {useAuth} from "../providers/Auth";
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import API from '../data/index';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';




const RegistersList = (props) => {

    const { Search } = Input;
    const {currentUser} = useAuth();
    const {employsRegisters, isLoading, isError, mutate} = useRegisters();
    
    const onFinish = async (registerData) => {
        console.log('Received values of form: ', registerData);
        const {checkIn, checkOut, employ_id} = registerData;
        const test = employsRegisters[employsRegisters.length-1];

        try {
            if(checkOut==="")
            {
                const register = await API.post('/registers', {
                checkIn,
                checkOut,
                employ_id,
                });
                console.log('employ_register', register);
                console.log('employ', test);
            }else{
                await API.put(`/registers/${test.id}`, {
                    checkIn,
                    checkOut,
                    employ_id,
                    });
            }
            afterCreate();

        } catch (e) {
            console.error('No se pudo registrar', e);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }

    };

    if (isLoading) {
        return <Row>
            {
                [...new Array(9)].map((_, i) =>
                    <Col xs={24} sm={12} md={8} style={{marginBottom: 30}} key={i}>
                        <div style={{textAlign: 'center'}}>
                            <Skeleton.Image style={{width: 200}}/>
                            <Card title='' extra='' cover='' loading/>
                        </div>
                    </Col>
                )
            }
        </Row>;
    }

    if (isError) {
        return <ShowError error={isError}/>;
    }
    console.log('registros',employsRegisters)

    const afterCreate = async () => {
        await mutate('/registers');
    };

    let data=null;
    if(employsRegisters){
    data = employsRegisters.map((registers,index)=>{
        
        return{
            key: index,
            date: registers.date,
            name: registers.employ.name, 
            lastname: registers.employ.lastname ,
            checkIn: registers.checkIn,
            checkOut: registers.checkOut,
        };
    });
    }

    return (
        <>
        <Form
            onFinish={onFinish}
        >
            <Form.Item name='checkIn'>
                <Input type="time" placeholder="Ingreso" />
            </Form.Item>

            <Form.Item name='checkOut'>
                <Input type="time" placeholder="Salida" />
            </Form.Item>

            <Form.Item name='employ_id'>
                <Input type="number" placeholder="Empleado" />
            </Form.Item>

            <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
                Agregar
            </Button>
            </Form.Item>
        </Form>

            <Search placeholder="input search text"  enterButton  style={{ width: 700 }} size="middle"/>
            <br/>
            <br/>
            <Table dataSource={data} size="small"  bordered="true" color="primary">
            <Column title="Fecha" dataIndex="date" key="date" />
                <ColumnGroup title="Nombres">
                    <Column title="Nombre" dataIndex="name" key="name" />
                    <Column title="Apellido" dataIndex="lastname" key="lastname" />
                </ColumnGroup>
                <Column title="Ingreso" dataIndex="checkIn" key="checkIn" />
                <Column title="Salida" dataIndex="checkOut" key="checkOut" />
            </Table>

        </>
    );

};
export default RegistersList;