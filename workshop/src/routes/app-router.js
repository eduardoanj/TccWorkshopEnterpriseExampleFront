import React from 'react';
import { Routes , Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomeListagem from '../screens/listagem/home_listagem';
import Home from '../screens/home_page/home';
import useAuth from '../hooks/useAuth';


function PrivateRoute({children}){
  const { signed } = useAuth();
  return signed > 0 ? children : <Navigate to="/"/>
}

function AppRouter(){
  return (
    <>
      <Routes>
          <Route path="/"element={<Home/>}/>
          <Route path="/logado" element={
            <PrivateRoute>
              <HomeListagem/>
            </PrivateRoute>
          }/>
          <Route path="#" element={<HomeListagem/>}/>
      </Routes>
    </>
  );
}

export default AppRouter;