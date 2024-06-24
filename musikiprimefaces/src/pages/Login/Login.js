import React, { useEffect, useRef, useState } from "react";
import 'primereact/resources/themes/lara-light-blue/theme.css';  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                  //icons
import Header from '../../components/menu/Header';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import axios from "../../apis/api";
import logo from '../../image/logo-color.png';
import { Toast } from "primereact/toast";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {

    const [nome, setNome] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const toast = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode adicionar a lógica para lidar com o envio do formulário

        const newUser = {
            name: nome,
            login: login,
            password: senha,
            email: email
        }

        console.log(newUser)

        axios.post('/auth/login', newUser)
            .then(response => {

                showSuccess('Sucesso')
                console.log(response.data.accessToken)
                localStorage.setItem('authToken', response.data.accessToken);
                redirectHome();

            })
            .catch(error => {
                console.log(error.response.status);
                if (error.response.status == 403) {
                    showError('Usuário ou senha incorretos');
                }
                console.error(error);
            });
    };

    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Login Inválido!', detail: msg, life: 3000 });
    }

    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: msg, life: 3000 });
    }

    const redirectHome = () => {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className="App">
                <Toast ref={toast} />
                <div className="p-d-flex p-jc-center p-mt-5" style={{ margin: '20px' }}>
                    <div className="p-card p-shadow-3 p-p-4" style={{ width: '400px', padding: '10px' }}>
                        <img alt="logo" height="200vh" width="340vw" src={logo}></img>
                        <form onSubmit={handleSubmit}>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="login" className="p-d-block" style={{ textAlign: 'left' }}>Login</label>
                                <InputText id="login" value={login} onChange={(e) => setLogin(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="senha" className="p-d-block" style={{ textAlign: 'left' }}>Senha</label>
                                <InputText id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <Divider />
                            <Button type="submit" label="Entrar" className="p-button-sm p-d-block p-mx-auto" />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default LoginPage;