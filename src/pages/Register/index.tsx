import { Link } from 'react-router-dom';
import DefaultPageContent from '../../components/DefaultPageContent';

import { RegisterCard } from './Register.style';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RegisterFormSchema } from '../../utils/ValidationSchemas';

import { toast } from 'react-toastify';
import FormErrorMessage from '../../components/FormErrorMessage';

import { useNavigate } from 'react-router-dom';

interface IRegister {
  username: string,
  nickname: string,
  password: string,
  re_password: string
}

const Register = () => {

  const{ register, handleSubmit, formState: { errors } } = useForm<IRegister>({ resolver: zodResolver(RegisterFormSchema) })
  const navigate = useNavigate();
  
  const handleRegister = (data: IRegister) => {
      if(data.password !== data.re_password) {
        toast.error("As senhas digitadas estão diferentes!");
        return;
      }
      alert("Finge que eu te registrei XD")
      navigate('/');

  }

  return (
    <DefaultPageContent>
      <RegisterCard>
        <span>
          <h1>Bem Vindo ao time!</h1>
          <small>Aqui você poderá guardar e acessar todas as suas senhas de forma rápida, fácil e segura!</small>
        </span>

        <form onSubmit={handleSubmit(handleRegister)}>
          <span>
            <input 
              type="text" 
              placeholder='Nome de Usuário' 
              {...register('username', { required: true })}
              autoFocus/>
            <FormErrorMessage message={errors.username?.message}/>
            <input 
              type="text" 
              placeholder='Apelido'
              {...register('nickname', { required: true })}/>
            <FormErrorMessage message={errors.nickname?.message}/>
            <hr />
            <input 
              type="password" 
              placeholder='Senha'
              {...register('password', { required: true })}
              />
            <FormErrorMessage message={errors.password?.message}/>
            <input 
              type="password" 
              placeholder='Repita a sua senha'
              {...register('re_password', { required: true })}/>
            <FormErrorMessage message={errors.re_password?.message}/>

            <input type="submit" value="Registrar-se" />
          </span>
        </form>

        <h6>
          <p>Já possui uma conta? <Link to='/'>Faça Login</Link></p>
        </h6>

      </RegisterCard>
    </DefaultPageContent>
  );
};

export default Register;
