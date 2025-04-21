import './signin.css'
import logo from '../../assets/icon.png'
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInSchema from '../../validations/SignInZodSchema';
import Joyride from 'react-joyride';

function SignIn() {

    const steps = [
        {
          target: '.login',
          content: 'This is my awesome feature!',
        },
        {
          target: '.register',
          content: 'This another awesome feature!',
        },
      ];

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
        <>
            <Joyride steps={steps} />
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
            </div>
        </>
    );
}

export default SignIn;