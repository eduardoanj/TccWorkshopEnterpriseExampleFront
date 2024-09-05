import React, { useEffect, useState, useMemo} from 'react';
import { Avatar, List, message } from 'antd';
import useAuth from '../../hooks/useAuth';


const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export function ListagemUsuario(){
    const { getWorkshops, getLoggedUser } = useAuth();
    const [pagina, setPagina] = useState();
    const [dados, setDados] = useState();

    useEffect(() => {
        async function fetchData() {
            const user = getLoggedUser()
            const response = await getWorkshops(1, user.userId)

            const dadosMap = response.workshops.map((value) => ({
                href: 'https://ant.design',
                title: `${value.name}`,
                avatar: value.imageCreator,
                id: value.id,
                workshopImage: value.image,
                description:
                    `Data do Workshop: ${value.date}, Endereço: ${value.address}`,
                content:
                    value.description,
            }))

            setDados(dadosMap)
            return;
        }
        fetchData()
    }, [getWorkshops, pagina])

    const onFinish = async (values) =>{
        const user = getLoggedUser()
    
        const response = await getWorkshops(values, user.userId)
        const dadosMap = response.workshops.map((value) => ({
            href: 'https://ant.design',
            title: `${value.name}`,
            avatar: 'uia',
            id: value.id,
            workshopImage: value.image,
            description:
                `Data do Workshop: ${value.date}, Endereço: ${value.address}`,
            content:
                value.description,
        }))
        setDados(dadosMap)
    };

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    setPagina(page)
                    console.log(pagina);
                    console.log(page);
                    onFinish(page)
                },
                pageSize: 3,
                }}
                dataSource={dados}
                renderItem={(item) => (
                    <List.Item
                        key={item.title} 
                        extra={
                            <div>
                                <img
                                    width={272}
                                    alt="logo"
                                    src={item.workshopImage}
                                />
                            </div>
                        }
                    >
                        <List.Item.Meta
                        avatar={
                        <Avatar
                            style={{
                            backgroundColor: ColorList[Math.floor(Math.random()*ColorList.length)],
                            verticalAlign: 'middle',
                            }}
                            size="large"
                            gap={4}
                        >
                            {item.title[0]}
                        </Avatar>}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    )
}