import { useContext } from 'react';
import avatarImg  from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import { ImExit  } from 'react-icons/im';
import './header.css'

function Header() {

    const{ logout, user } = useContext(AuthContext);

    return(
        <div className='sidebar'>
           <div>
                <img 
                 src={ user.avatarUrl === null ? avatarImg : user.avatarUrl }
                 alt="foto do usuario" 
                 />
           </div>

           <Link to="/gifts/dashboard">
                <FiHome color='#fff' size={24} />
                <span>Presentes</span>
           </Link>
           {/* Fazer valição para só aparecer caso seja super usuário */}
           {user.role === "ADMIN" &&
               <Link to="/users/dashboard">
                     <FiUser color='#fff' size={24} />
                    <span>Usuários</span>
               </Link>
           }
           
           <Link to="/profile">
                <FiSettings color='#fff' size={24} />
                <span>Perfil</span>
           </Link>

           <Link className="logout-link" onClick={() => logout()}>
                <ImExit  color='#fff' size={24} />
                <span>Sair</span>
           </Link>
           <span>
               <i>Desenvolvido por <br />
               Marcos Vinicius Angeli Costa</i>
           </span>
        </div>
    );
}

export default Header;