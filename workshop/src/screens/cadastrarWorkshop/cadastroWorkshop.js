import React, {useState, useEffect} from 'react';
import { Button, Form, Input, message, DatePicker, TimePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export function CadastroWorkshop(){
    const { postWorkshops, getLoggedUser } = useAuth();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) =>{
        var user = getLoggedUser()
    
        const res = await postWorkshops(values, user.userId)
    
        if (res){
            console.log('Não está logado');
            messageApi.open({
                type: 'error',
                content: 'Usuário não cadastrado',
              });
            return;
        }

        messageApi.open({
            type: 'success',
            content: 'Workshop cadastrado',
          });
        navigate('#')
    };

    return (
        <div>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="Nome"
                    rules={[
                    {
                    required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'date']}
                    label="Data"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <DatePicker renderExtraFooter={() => 'extra footer'} />
                </Form.Item>
                <Form.Item
                    name={['user', 'time']}
                    label="Horário"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TimePicker renderExtraFooter={() => 'extra footer'} />
                </Form.Item>
                <Form.Item 
                    name={['user', 'description']} 
                    label="Descrição"
                    rules={[
                        {
                            required: true,
                        },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'address']}
                    label="Endereço"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name={['user', 'image']} 
                    label="Imagem"
                    rules={[
                        {
                            required: true,
                        },
                ]}>
                    <Input />
                </Form.Item>
                
                <Form.Item
                    wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                    }}
                >
                <Button type="primary" htmlType="submit" style={{backgroundColor: '#335E88'}}>
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
