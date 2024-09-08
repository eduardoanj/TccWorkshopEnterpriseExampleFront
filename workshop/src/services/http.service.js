import { Config } from '../config'

const getAcessos = async (email, password) => {
    const config = new Config();

    const response = await fetch(`${config.apiBasePath}api/login?Email=${email}&Password=${password}`, {
        method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error(
        {
          autores: [],
          statusCode: response.status,
          message: response.statusText,
        },
        response.status === 403 || response.status === 401
          ? 'Você não possui acesso a esta operação'
          : 'Não foi possivel buscar acessos do usuario',
      );
    }
  
    return (await response.json());
};

const PostUsuario = async (values) => {
  const config = new Config();
  const name = values['user']['name'];
  const email = values['user']['email'];
  const password = values['user']['password'];
  const document = values['user']['document'];
  const userType = values['user']['userType'];

  var jsonBody = JSON.stringify({
    name: name,
    email: email,
    password: password,
    document: document,
    userType: userType
  });

  const response = await fetch(`${config.apiBasePath}api/new-user`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonBody
  });

  if (!response.ok) {
    throw new Error(
      {
        autores: [],
        statusCode: response.status,
        message: response.statusText,
      },
      response.status === 403 || response.status === 401
        ? 'Você não possui acesso a esta operação'
        : 'Não foi possivel cadastrar usuario',
    );
  }

  return (await response.json());
};

const getWorks = async (page, userId) => {
  const config = new Config();
  const qtde = 100
  const dataInicio = "2020-01-01"
  const dataFim = "2029-01-01"
  let idCreator = '';

  if (userId != undefined) {
    idCreator = userId;
  }

  const response = await fetch(`${config.apiBasePath}get-workshop?Pagina=${page}&QtdePorPagina=${qtde}&DataInicioFiltro=${dataInicio}&DataFinalFiltro=${dataFim}&IdCreator=${idCreator}`, {
      method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      {
        autores: [],
        statusCode: response.status,
        message: response.statusText,
      },
      response.status === 403 || response.status === 401
        ? 'Você não possui acesso a esta operação'
        : 'Não foi possivel buscar acessos do usuario',
    );
  }

  return (await response.json());
};

const postWorks = async (values, idCreator) => {
  const config = new Config();
  const name = values['user']['name'];
  const date = values['user']['date'].toISOString().slice(0, -14);
  const time = values['user']['time'].toISOString().substring(11);
  const datetime = `${date}T${time}`; 
  const description = values['user']['description'];
  const address = values['user']['address'];
  const image = values['user']['image'];

  var jsonBody = JSON.stringify({
    name: name,
    date: datetime,
    description: description,
    address: address,
    image: image,
    idCreator: idCreator
  });

  const response = await fetch(`${config.apiBasePath}new-workshop`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonBody
  });

  if (!response.status) {
    throw new Error(
      {
        autores: [],
        statusCode: response.status,
        message: response.statusText,
      },
      response.status === 403 || response.status === 401
        ? 'Você não possui acesso a esta operação'
        : 'Não foi possivel buscar acessos do usuario',
    );
  }
  return;
};

const getUserWorks = async (email) => {
  const config = new Config();

  const response = await fetch(`${config.apiBasePath}api/get-user?email=${email}`, {
      method: 'GET',
  });

  if (!response.ok) {
    throw new Error(
      {
        autores: [],
        statusCode: response.status,
        message: response.statusText,
      },
      response.status === 403 || response.status === 401
        ? 'Você não possui acesso a esta operação'
        : 'Não foi possivel buscar acessos do usuario',
    );
  }

  return (await response.json());
};

const vinculateUserWorks = async (userId, workshopId) => {
  const config = new Config();

  const response = await fetch(`${config.apiBasePath}api/vinculate?userId=${userId}&workshopId=${workshopId}`, {
      method: 'POST',
  });

  if (!response.ok) {
    throw new Error(
      {
        autores: [],
        statusCode: response.status,
        message: response.statusText,
      },
      response.status === 403 || response.status === 401
        ? 'Você não possui acesso a esta operação'
        : 'Não foi possivel buscar acessos do usuario',
    );
  }

  return (await response.json());
};

export { getAcessos, PostUsuario, getWorks, postWorks, getUserWorks, vinculateUserWorks };