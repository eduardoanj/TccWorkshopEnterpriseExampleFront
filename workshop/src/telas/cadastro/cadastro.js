import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const { Option } = Select;

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

export function Cadastro(){
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) =>{
        const res = await signup(values)
    
        if (res){
            messageApi.open({
                type: 'error',
                content: 'Usuário já cadastrado',
              });
            return;
        }
        navigate("/logado")
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
                    label="Name"
                    rules={[
                    {
                    required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name={['user', 'document']} 
                    label="Document"
                    rules={[
                        {
                            required: true,
                        },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label="Password"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name={['user', 'confirmPassword']} 
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                        },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'userType']}
                    label="Tipo de conta"
                    hasFeedback
                    rules={[
                        {
                        required: true,
                        message: 'Escolha seu tipo de conta',
                        },
                    ]}
                >
                    <Select placeholder="Escolha seu tipo de conta">
                        <Option value="Admin">Crie seus Workshops</Option>
                        <Option value="NormalUser">Apenas curtir</Option>
                    </Select>
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
