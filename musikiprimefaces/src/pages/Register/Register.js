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
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export default function Register() {

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
        
        axios.post('/samm/user/create', newUser)
            .then(response => {
                showSuccess('Usuário Criado com Sucesso.')
                redirectLogin();
                console.log(response)
            })
            .catch(error => {
                showError(error.response.data);
            });
    };

    const showError = (msg) => {
        toast.current.show({ severity: 'error', summary: 'Erro ao Criar Usuário', detail: msg, life: 3000 });
    }

    const showSuccess = (msg) => {
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: msg, life: 3000 });
    }

    const redirectLogin = () => {
        setTimeout(() => {
            navigate('/login');
        }, 1000);
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
                        <h2 className="p-text-center">Formulário de Cadastro</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="nome" className="p-d-block" style={{ textAlign: 'left' }}>Nome</label>
                                <InputText id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="login" className="p-d-block" style={{ textAlign: 'left' }}>Login</label>
                                <InputText id="login" value={login} onChange={(e) => setLogin(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="email" className="p-d-block" style={{ textAlign: 'left' }}>Email</label>
                                <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <div className="p-field" style={{ margin: '15px' }}>
                                <label htmlFor="senha" className="p-d-block" style={{ textAlign: 'left' }}>Senha</label>
                                <InputText id="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="p-d-block p-inputtext-sm" style={{ width: '100%' }} />
                            </div>
                            <Divider />
                            <Button type="submit" label="Cadastrar" className="p-button-sm p-d-block p-mx-auto" />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}