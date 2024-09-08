import React, { useState } from 'react';
import {
    LaptopOutlined, TeamOutlined
} from '@ant-design/icons';
import { Modal, theme, Button, Empty, Typography } from 'antd';
import LogoMaior from '../../images/logoMaior.jpg'
import { Login } from '../login_page/login_page';
import { Cadastro } from '../cadastro/cadastro';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModalCadastro = () => {
    setIsModalCadastroOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelModal = () => {
    setIsModalCadastroOpen(false);
  };

  return (
    <div style={{
        marginTop: 300,
        backgroundColor: '#335E88'
    }}>
        <Empty
            image={LogoMaior}
            imageStyle={{
            height: 300,
            }}
            description={
            <Typography.Text style={{color: '#FFFFFF'}}>
                Cadastre-se <a onClick={showModalCadastro}>Aqui</a>
            </Typography.Text>
            }
        >
            <div >
                <Button 
                    style={{
                        marginBottom: 10,
                        color: '#FFFFFF'
                    }} 
                    type="text"
                    onClick={showModal}
                >
                    Login
                </Button>
            </div>
            <Modal title="Cadastre-se" open={isModalCadastroOpen} onOk={handleOk} onCancel={handleCancelModal} footer={false}>
                <Cadastro />
            </Modal>
            <Modal title="Conecte-se" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                <Login />
            </Modal>
            
        </Empty>
    </div>
  );
};
export default Home;