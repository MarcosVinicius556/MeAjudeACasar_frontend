import DefaultPageContent from '../../components/DefaultPageContent';
import { Link } from 'react-router-dom';

import { RegisterCard, RegisterPage, CoupleInformation } from './SuperRegister.style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormSchema } from '../../utils/ValidationSchemas';

import FormErrorMessage from '../../components/FormErrorMessage';
 
import { useNavigate } from 'react-router-dom';

interface ISuperRegister {
  coupleName: string;
  groomName: string;
  groomEmail: string;
  groomTel: string;
  brideName: string;
  brideEmail: string;
  brideTel: string;
  password: string;
  re_password: string;
}

const SuperRegister = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ISuperRegister>({ resolver: zodResolver(RegisterFormSchema) })

  const navigate = useNavigate();

  const handleRegister = (formData: ISuperRegister) => {
    alert("Finge que eu fiz um cadastro vai")
    navigate('/home');
  }

  return (
    <DefaultPageContent>
      <RegisterPage>
        <RegisterCard>
          <span>
            <h1>Cadastro de Noivos</h1>
          </span>

          <form onSubmit={handleSubmit(handleRegister)}>
            <span>
              {/* Informações do casal */}
              <input 
                type="text" 
                placeholder='Digite um nome de usuário para o casal...' 
                { ...register('coupleName', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.coupleName?.message}/>}
              
              <input 
                type="password" 
                placeholder='Digite uma senha de acesso para o casal...' 
                { ...register('password', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.password?.message}/>}
              
              <input 
                type="text" 
                placeholder='Repita a senha...' 
                { ...register('re_password', { required: true }) }
                autoFocus/>
              {<FormErrorMessage message={errors.re_password?.message}/>}
              
              <hr />
              
              {/* Informações do NOIVO */}
              <CoupleInformation>
                <span>
                  <h3>Dados do Noivo</h3>
                  <input 
                    type="text" 
                    placeholder='Informe o nome de usuário do noivo...' 
                    { ...register('groomName', { required: true }) }
                    autoFocus/>
                  {<FormErrorMessage message={errors.groomName?.message}/>}

                  <input 
                    type="email" 
                    placeholder='Informe o email do noivo...' 
                    { ...register('groomEmail', { required: true }) }
                    autoFocus/>
                  {<FormErrorMessage message={errors.groomEmail?.message}/>}

                  <input 
                    type="text" 
                    placeholder='Informe o telefone do noivo...'
                    { ...register('groomTel', { required: true }) }/>
                  {<FormErrorMessage message={errors.groomTel?.message}/>}
                </span>

                <div />
                
                {/* Informações da noiva */}
                <span>
                  <h3>Dados da Noiva</h3>
                  <input 
                  type="text" 
                  placeholder='Informe o nome de usuário da noiva...' 
                  { ...register('brideName', { required: true }) }
                  autoFocus/>
                  {<FormErrorMessage message={errors.brideName?.message}/>}

                  <input 
                    type="email" 
                    placeholder='Informe o email da noiva...' 
                    { ...register('brideEmail', { required: true }) }
                    autoFocus/>
                  {<FormErrorMessage message={errors.brideEmail?.message}/>}

                  <input 
                    type="text" 
                    placeholder='Informe o telefone da noiva...'
                    { ...register('brideTel', { required: true }) }/>
                  {<FormErrorMessage message={errors.brideTel?.message}/>}
                </span>
              </CoupleInformation>
              <input type="submit" value="Cadastrar" />
              <Link to="/super-login">Voltar</Link>
            </span>
          </form>

        </RegisterCard>
      </RegisterPage>
    </DefaultPageContent>
  );
};

export default SuperRegister;
