import DefaultPageContent from '../../components/DefaultPageContent';
import { Link } from 'react-router-dom';

import { LoginCard, LoginPage } from './Login.style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '../../utils/ValidationSchemas';

import FormErrorMessage from '../../components/FormErrorMessage';
 
import { useNavigate } from 'react-router-dom';

interface ILogin {
  username: string,
  listCode: string
}

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({ resolver: zodResolver(LoginFormSchema) })

  const navigate = useNavigate();

  const handleLogin = (formData: ILogin) => {
    alert("Finge que eu fiz um login vai")
    navigate('/home');
  }

  return (
    <DefaultPageContent>
      <LoginPage>
        <LoginCard>
          <span>
            <h1>Olá, seja bem vindo ao <span>Me Ajude A Casar</span></h1>
          </span>

          <form onSubmit={handleSubmit(handleLogin)}>
            <span>
              <input 
                type="text" 
                placeholder='Informe o seu nome...' 
                { ...register('username', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.username?.message}/>}

              <input 
                type="text" 
                placeholder='Informe o código da lista de presentes...'
                { ...register('listCode', { required: true }) }/>
              {<FormErrorMessage message={errors.listCode?.message}/>}

              <input type="submit" value="Entrar" />
            </span>
          </form>

        </LoginCard>
      </LoginPage>
    </DefaultPageContent>
  );
};

export default Login;
