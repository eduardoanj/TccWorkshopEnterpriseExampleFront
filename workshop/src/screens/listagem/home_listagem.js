import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Modal } from 'antd';
import { Listagem } from './listagem';
import { ListagemUsuario } from './listagem_usuario';
import { CadastroWorkshop } from '../cadastrarWorkshop/cadastroWorkshop';
import useAuth from '../../hooks/useAuth';
import { ListagemInscritos } from './listagem_works_cadastrados';
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const HomeListagem = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState('1');
  const [usuario, setUsuario] = useState();
  const { getLoggedUser } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);

  useEffect(() => {
    var user = getLoggedUser()
    setUsuario(user)
  }, []);

  const getUsuario = (value) => {
    if (value == undefined) {
      return '';
    }
    return value.email
  }

  const items = [
    getItem(getUsuario(usuario), 'sub1', <UserOutlined />, [
      getItem('Works Novos', '1'),
      getItem('Works inscritos', '2'),
      getItem('Meus Works', '3'),
      getItem('Cadastrar Works', '4'),
    ]),
  ];

  const showModalCadastro = () => {
    setContent('1')
    setIsModalCadastroOpen(true);
  };

  const handleCancelModal = () => {
    setContent('1')
    setIsModalCadastroOpen(false);
  };

  const setKey = (value) => {
    var keyPath = value.keyPath[0]
    setContent(keyPath)
  }

  const Conteudo = () => {
    if (content == '1') {
      return(
        <Listagem/>
      )
    }

    if (content == '2') {
      return(
        <ListagemInscritos/>
      )
    }

    if (content == '3') {
      return(
        <ListagemUsuario/>
      )
    }

    if (content == '4') {
      return(
        showModalCadastro()
      )
    }
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{backgroundColor: '#335E88'}}>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={setKey} style={{backgroundColor: '#335E88'}}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}/>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
            <Modal title="Cadastre seu Works" open={isModalCadastroOpen} onCancel={handleCancelModal} footer={false}>
                <CadastroWorkshop />
            </Modal>
          {<Conteudo/>}
        </Content>
      </Layout>
    </Layout>
  );
};
export default HomeListagem;