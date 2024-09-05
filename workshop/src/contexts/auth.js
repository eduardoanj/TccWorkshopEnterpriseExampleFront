import { createContext, useState } from "react";
import { getAcessos, PostUsuario, getWorks, postWorks, getUserWorks, vinculateUserWorks } from "../services/http.service";

export const AuthContext = createContext({});

export const ApiProvider = ({ children }) => {
    const [user, setUser] = useState();    

    const signin = async (email, password) => {
        var resposta = await getAcessos(email, password)
        const userId = resposta.id
        const hasUser = resposta.email === email;

        if (hasUser) {
            if (resposta.email === email && resposta.visualizar) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({email, token}));
                setUser({email, userId, token})
                return;
            } else {
                return "email ou senha incorretos"
            }
        } else {
            return "Usuário não cadastrado"
        }
    };

    const signup = async (values) => {
        const password = values['user']['password'];
        var resposta = await PostUsuario(values)

        const email = values['user']['email'];;

        if (resposta.usuarioJaCadastrado) {
            return "ja tem uma conta com esse email"
        }

        if (resposta.id != '') {
            const userId = resposta.id
            const token = Math.random().toString(36).substring(2);
            localStorage.setItem("user_token", JSON.stringify({email, token}));
            setUser({email, userId, token})
            return;
        }
        return;
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token")
    }

    const getLoggedUser = () => {
        return user;
    }

    const getWorkshops = async (values, userId) => {
        var resposta = await getWorks(values, userId)
        return resposta;
    };

    const postWorkshops = async (values, idCreator) => {
        var resposta = await postWorks(values, idCreator)
        return resposta;
    };

    const getUser = async (email) => {
        var resposta = await getUserWorks(email)
        return resposta;
    };

    const vinculate = async (userId, workshopId) => {
        var resposta = await vinculateUserWorks(userId, workshopId)
        return resposta;
    };

    return <AuthContext.Provider value={{user, signed: !!user, signin, signup, signout, getLoggedUser, getWorkshops, postWorkshops, getUser, vinculate}}>{children}</AuthContext.Provider>;
};
