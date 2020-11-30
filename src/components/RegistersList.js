import React, {useEffect, useState} from 'react';
import {Skeleton, Card, Table, Col, Row, Input} from 'antd';
import {useRegisters} from '../data/useRegisters';
import ShowError from './ShowError';
import {useAuth} from "../providers/Auth";
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';




const RegistersList = (props) => {

    const { Search } = Input;
    const {currentUser} = useAuth();
    const {employsRegisters, isLoading, isError, mutate} = useRegisters();
    
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

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'date',
            key:'date',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key:'name',
        },
        {
            title: 'Apellido',
            dataIndex: 'lastname',
            key:'lastname',
        },
        {
            title: 'Ingreso',
            dataIndex: 'checkIn',
            key:'checkIn',
        },
        {
            title: 'Salida',
            dataIndex: 'checkOut',
            key:'checkOut',
        },
        
    ];
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