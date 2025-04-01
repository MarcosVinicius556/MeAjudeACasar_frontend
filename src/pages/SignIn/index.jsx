import './signin.css'
import logo from '../../assets/icon.png'
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInSchema from '../../validations/SignInZodSchema';

function SignIn() {

    const { autoSignInWithCookie, signIn, loadingAuth } = useContext(AuthContext);

    /**
     * Caso já tenha sido feito login, tenta entrar automagicamente
     */
    useEffect(() => {
        autoSignInWithCookie();
    }, []);
    
    const{register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignInSchema)
    });

    async function handleSignIn(data) {
        let { email, password } = data;
        
        if(email !== '' && password !== ''){
          await signIn(email, password); 
        }
    }

    return(
        <div className='container-center'>
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt='Logo do sistema de chamados'/>
                </div>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <h1>Entrar</h1>
                    <input 
                        type="email" 
                        placeholder='email@email.com'
                        {...register("email")}
                        name="email"
                        id="email"
                    />
                    {errors.email && (<p className='error'>{errors.email.message}</p>)} 

                    <input 
                        type="password" 
                        placeholder='***********'
                        {...register("password")}
                        name="password"
                        id="password"
                    />
                    {errors.password && (<p className='error'>{errors.password.message}</p>)} 

                    <button type="submit">{
                        loadingAuth ? 'Carregando...' : 'Entrar'
                    }</button>
                </form>
                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>
    );
}

export default SignIn;