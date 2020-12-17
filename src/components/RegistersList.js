import React, {useState} from 'react';
import {Button, message, Skeleton, Card, Table, Col, Row, Input, Form} from 'antd';
import {useEmployRegister} from '../data/useEmployRegister';
import {useRegisters} from '../data/useRegisters';
import ShowError from './ShowError';
import moment from 'moment';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import Column from 'antd/lib/table/Column';
import API from '../data/index';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';




const RegistersList = (props) => {

    
    const[form]=Form.useForm();
    const [identification, setIdentification]=useState('7113104274');
    const [iden, setIden]=useState('7113104274');
    
    console.log(identification);
    
    const {registers, isLoading, isError, mutate} = useRegisters();

    const {employsRegisters, mutate1} = useEmployRegister(iden);
    console.log( 'e',employsRegisters)

    
    console.log(identification);
    
    

    const change =()=>{
        let ID=document.querySelector( '#id' ).value;
        setIdentification(ID);
        onCreate();
           
        
    }
    const onCreate = async values => {
        console.log('Received values of form: ', values);
        
        form.validateFields().then(async (values)=>{
            console.log('values',values)
            
            
            
            const data = new FormData();
            data.append('name', values.id);
            console.log("values.id",values.id)
            console.log('datos',data);
            
            console.log('id', identification);
            setIden(identification);


            try {
                if(employsRegisters)
                {
                const lastRegister = employsRegisters[employsRegisters.length-1];
                console.log('lasst', lastRegister);
            
                if (lastRegister.checkOut!==null){
                    await API.post(`/employ/${identification}/registers`, {
                    checkIn : moment().format('HH:mm:ss'), 
                    checkOut : null,
                    });
                    form.resetFields();
                    console.log('cambio',iden);
                    setIdentification(null);
                    afterCreate(); 
                 }        
                else{
                    await API.put(`/employ/${identification}/registers/${lastRegister.id}`, {
                    checkOut : moment().format('HH:mm:ss'),
                    });
                    form.resetFields();
                    setIden(identification);
                    setIdentification(null);
                    afterCreate();
                }
               
            } 
            }catch(e){
                const errorList = e.error && <ErrorList errors={e.error}/>;
                    message.error(<>{translateMessage(e.message)}{errorList}</>);
            }
            
        })
        .catch(info=>{
            console.log('Validate Failed:', info);
        });
    };

    const onFinish = async (registerData) => {
        console.log('Received values of form: ', registerData);
        const {checkIn, checkOut, id} = registerData;
         setIdentification(id);
         
        const test = registers[registers.length-1];

        console.log('identification',identification);
        
        try {
            if(iden!==identification)
            {
                const register = await API.post(`/employ/${identification}/registers`, {
                checkIn : moment().format('HH:mm:ss'), 
                checkOut,
                });
                Form.resetFields();
                console.log('employ_register', register);
                console.log('employ', test);
                console.log('iden',iden);
                setIden(id);
                //setIdentification('')
                console.log('iden',iden);
            }else{
                await API.put(`/employ/${identification}/registers/${test.id}`, {
                    checkIn,
                    checkOut : moment().format('HH:mm:ss'),
                    });
                    setIdentification('')
                    console.log('iden',iden);
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
    console.log('registros',registers)

    const afterCreate = async () => {
        await mutate(`/employs/${identification}/registers`);
    };

    let data=null;
    if(registers){
    data = registers.map((registers,index)=>{
        
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
            form={form}
            //onFinish={change}
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item name='id'>
                <Input id="id" type="text" placeholder="Empleado" />
            </Form.Item>

            <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button' onClick={change}>
                Agregar
            </Button>
            </Form.Item>
        </Form>

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