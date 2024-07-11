import DefaultPageContent from '../../components/DefaultPageContent';
import { Link } from 'react-router-dom';

import { LoginCard, LoginPage } from './SuperLogin.style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from '../../utils/ValidationSchemas';

import FormErrorMessage from '../../components/FormErrorMessage';
 
import { useNavigate } from 'react-router-dom';

interface ISuperLogin {
  username: string,
  listCode: string
}

const SuperLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ISuperLogin>({ resolver: zodResolver(LoginFormSchema) })

  const navigate = useNavigate();

  const handleLogin = (formData: ISuperLogin) => {
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

          <h6>
            <p>Ainda não possui uma conta? <Link to='/register'>Registre-se</Link></p>
          </h6>

        </LoginCard>
      </LoginPage>
    </DefaultPageContent>
  );
};

export default SuperLogin;
