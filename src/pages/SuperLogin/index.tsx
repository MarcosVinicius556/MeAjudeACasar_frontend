import { Link } from 'react-router-dom';
import DefaultPageContent from '../../components/DefaultPageContent';

import { LoginCard, LoginPage } from './SuperLogin.style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormSchema } from '../../utils/ValidationSchemas';

import FormErrorMessage from '../../components/FormErrorMessage';
 
import { useNavigate } from 'react-router-dom';

interface ISuperLogin {
  coupleName: string;
  password: string;
}

const SuperLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ISuperLogin>({ resolver: zodResolver(RegisterFormSchema) })

  const navigate = useNavigate();

  const handleLogin = (formData: ISuperLogin) => {
    alert("Finge que eu fiz um login de casal vai")
    navigate('/home');
  }

  return (
    <DefaultPageContent>
      <LoginPage>
        <LoginCard>
          <span>
            <h1>Seja bem vindo!</h1>
          </span>

          <form onSubmit={handleSubmit(handleLogin)}>
            <span>
              {/* Informações do casal */}
              <input 
                type="text" 
                placeholder='Nome de usuário do casal...' 
                { ...register('coupleName', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.coupleName?.message}/>}
              
              <input 
                type="password" 
                placeholder='Senha do casal...' 
                { ...register('password', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.password?.message}/>}
              
              
              <input type="submit" value="Entrar" />
            </span>
          </form>

          <h6>
            <p>Ainda não possui uma conta? <Link to='/register'>Registre-se</Link></p>
            <p>Quer acessar como um usuário padrão? <Link to='/'>Clique aqui</Link></p>
          </h6>

        </LoginCard>
      </LoginPage>
    </DefaultPageContent>
  );
};

export default SuperLogin;
