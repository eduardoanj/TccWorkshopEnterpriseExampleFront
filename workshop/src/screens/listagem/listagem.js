import React, { useEffect, useState, useMemo} from 'react';
import { Avatar, List, Tooltip } from 'antd';
import useAuth from '../../hooks/useAuth';


const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];


export function Listagem(){
    const { getWorkshops, vinculate, getLoggedUser } = useAuth();
    const [pagina, setPagina] = useState();
    const [dados, setDados] = useState();
    const [arrow, setArrow] = useState('Show');
    const [usuario, setUsuario] = useState();

    useEffect(() => {
        async function fetchData() {
            var user = getLoggedUser()
            setUsuario(user)
            
            const response = await getWorkshops(1)

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

    const onFinish = async (values) => {
        const response = await getWorkshops(values)
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

    const vincular = async (workshopId) => {
        const user = getLoggedUser()
        await vinculate(user.userId, workshopId)
    }

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
          return false;
        }
        if (arrow === 'Show') {
          return true;
        }
        return {
          pointAtCenter: true,
        };
      }, [arrow]);

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
                    <Tooltip placement="topLeft" title="Se inscreva clicando aqui" arrow={mergedArrow}>
                        <List.Item
                            key={item.title} 
                            style={{
                                cursor: "cursor: pointer"
                            }}
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
                            title={<a onClick={() => vincular(item.id)}>{item.title}</a>}
                            description={item.description}
                            />
                            {item.content}
                        </List.Item>
                </Tooltip>
                )}
            />
        </div>
    )
}