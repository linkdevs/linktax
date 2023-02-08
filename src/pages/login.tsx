import { Api } from '@root/services/api';
import { Login, Register } from '@root/services/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

// import { Container } from './styles';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const inicial_form = { login: "", password: "" };
    const [form, setForm] = useState<Login | Register>(inicial_form);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const login = async (form: Login) => {
        try {
            const api_response = await Api.post("/login", form);

            if (api_response.data?.success) {
                localStorage.setItem("token", api_response.data.token);
                router.push("/dashboard");
            }

        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const register = async (form: Register) => {
        try {
            const api_response = await Api.post("/register", form);

            if (api_response.data?.success) {
                localStorage.setItem("token", api_response.data.token);
                router.push("/dashboard");
            }

        } catch (error: any) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) await login(form as Login);
            else await register(form as Register);
        } catch (error: any) {
            setError(error.message);
        }
        setLoading(false);
    }


    return <div>
        <Head>
            <title>{isLogin ? "Faça seu login" : "Faça seu Cadastro"}</title>
        </Head>
        <div className="login-container container-fluid" >
            <div style={{ maxWidth: "50em", width: "60rem" }}>
                <div className="action-btn-container d-flex gap-3">
                    <button onClick={() => {
                        setForm(inicial_form)
                        setIsLogin(!isLogin)
                    }} className={`w-100 btn btn-${isLogin ? "primary" : "outline-primary"}`}>Login</button>
                    <button onClick={() => {
                        setForm(inicial_form)
                        setIsLogin(!isLogin)
                    }} className={`w-100 btn btn-${!isLogin ? "primary" : "outline-primary"}`}>Cadastrar</button>
                </div>


                <h1 className='h4 text-center fw-bolder py-4'>{isLogin ? "Faça login para continuar" : "Cadastre-se para continuar"}</h1>


                {isLogin ? <form onSubmit={handleLogin} className="row">
                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">Login</label>
                            <input type="text" className="form-control" id="login" name="login" onChange={handleInputChange} placeholder='usuário, email ou telefone' />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} placeholder='sua senha' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mx-4 mb-3">
                            <input type={"checkbox"} className="form-check-input" id="remember" name="remember" />
                            <label htmlFor="remember" className="form-check-label">Lembrar-me</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mx-4 mb-3">
                            <a href="#" >Esqueci minha senha</a>
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Entrar {loading && <i className='fad fa-spinner-third' />}</button>
                    </div>
                </form> : <form onSubmit={handleLogin} className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <label htmlFor="document" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="document" name="document" onChange={handleInputChange} placeholder='seu cpf' />
                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">usuário</label>
                            <input type="text" className="form-control" id="username" name="username" onChange={handleInputChange} placeholder='usuário utilizado no sistema' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} placeholder='seu nome' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} placeholder='seu email' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="phone" name="phone" onChange={handleInputChange} placeholder='seu telefone' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} placeholder='sua senha' />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Confirme sua senha</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleInputChange} placeholder='sua senha' />
                        </div>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Cadastrar {loading && <i className='fa-solid fa-circle-notch' />}</button>
                    </div>
                </form>}
            </div>
        </div>
    </div>;
}

export default LoginPage;