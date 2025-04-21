import logo from '../../assets/icon.png'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpSchema from '../../validations/SignUpZodSchema';

function SignUp() {
    
    const{register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignUpSchema)
    });

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSignUp(data) {

        let {name, email, password } = data;

        if(name !== '' && email !== '' && password !== ''){
            let user = {
                name,
                email,
                password,
                created_at: Date.now(),
                role: 'NORMAL'
            }
           await signUp(user);
        }
    }

    return(
        <div className='container-center'>
            <div className="login">
                <div className='left-side'>
                    <div className='introduction'>
                        <h2>Olá, Seja Bem Vindo ao <span>Me Ajude A Casar</ span></h2>
                        <br />
                        <p>Este site é uma lista de presentes online, desenvolvido para facilitar a vida
                            dos noivos que desejam organizar seus presentes!
                        </p>
                    </div>
                </div>

                <div className='right-side'>
                    <div className="login-area">
                        <img src={logo} alt='Logo do Me Ajude a Casar'/>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <h1>Nova Conta</h1>
                        <input 
                            type="text" 
                            placeholder='Seu nome'
                            {...register("name")}
                            name="name"
                            id="name"
                        />
                        {errors.name && (<p className='error'>{errors.name.message}</p>)} 
                        
                        <input 
                            type="email" 
                            placeholder='email@email.com'
                            {...register("email")}
                            name="email"
                            id="email"
                        />
                        {errors.email && (<p className='error'>{errors.email.message}</p>)} 
                        
                        <hr />
                        <input 
                            type="password" 
                            placeholder='***********'
                            {...register("password")}
                            name="password"
                            id="password"
                        />
                        {errors.password && (<p className='error'>{errors.password.message}</p>)} 

                        <input 
                            type="password" 
                            placeholder='Confirme sua senha'
                            {...register("re_password")}
                            name="re_password"
                            id="re_password"
                        />
                        {errors.re_password && (<p className='error'>{errors.re_password.message}</p>)} 

                        <button type="submit">{
                            loadingAuth ? 'Carregando...' : 'Cadastrar' 
                        }</button>
                    </form>
                    <Link to='/'>Já possui uma conta? Faça login</Link>
                </div>
                
            </div>
        </div>
    );
}

export default SignUp;