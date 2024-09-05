import React, {useState} from 'react';
import './login_page.css';
import { Button, Form, Input, message, Modal } from "antd";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Cadastro } from '../cadastro/cadastro';


export function Login(){
    const { signin } = useAuth();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);

    const showModalCadastro = () => {
        setIsModalCadastroOpen(true);
      };
    
    const handleCancelModal = () => {
    setIsModalCadastroOpen(false);
    };

    const onFinish = async (values) =>{
        const email = values['email'];
        const password = values['password'];
    
        const res = await signin(email, password)
    
        if (res){
            messageApi.open({
                type: 'error',
                content: 'Usuário não cadastrado',
              });
            return;
        }
        navigate("/logado")
    };

    return (
        <div>
            {contextHolder}
            <Form
            name="login"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button className="button" block type="primary" htmlType="submit">
                    Log in
                    </Button>
                    or <Link onClick={showModalCadastro}>Cadastre-se</Link>
                    <Modal title="Cadastre-se" open={isModalCadastroOpen} onCancel={handleCancelModal} footer={false}>
                        <Cadastro />
                    </Modal>
                </Form.Item>
            </Form>
        </div>
    );
};
    