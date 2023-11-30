import React, { useState } from "react";
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                  //icons
import "../../App.css";
import "./Login.css"
import Header from '../../components/menu/Header';

function LoginPage() {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    /*const criarUsuario = (event) => {

        useEffect(() => {

            axios.post('/api/samuser/create',{
                name: name,
                login: login,
                password: password,
                email: email
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

        event.preventDefault();
        // Aqui você pode adicionar a lógica para enviar as informações de login para o servidor
    };*/

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className="App">
                <form /*onSubmit={handleSubmit}*/>
                    <label htmlFor="username">Nome de usuário:</label>
                    <input
                        type="text"
                        id="username"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />

                    <label htmlFor="login">Login:</label>
                    <input
                        type="login"
                        id="login"
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;