import { useContext, useRef, useState, useEffect } from 'react';
import avatarImg  from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import { FiUser, FiSettings, FiGift } from 'react-icons/fi';
import { BiSolidReport  } from 'react-icons/bi';
import { BsListColumns } from 'react-icons/bs';
import { ImExit  } from 'react-icons/im';
import './header.css'

/**
 * Utilizados para parte de impressão
 */
import PrintComponent from '../Report';
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, orderBy, query} from 'firebase/firestore'
import { useReactToPrint } from 'react-to-print';
import formatDate from '../../utils/DateFormatter';
 
function Header() {

    const{ logout, user } = useContext(AuthContext);

    let printRef = useRef();

    const [loadingReportData, setLoadingReportData] = useState(false);
    const [gifts, setGifts] = useState([]);

    const print = useReactToPrint({
        content: () => printRef,
        documentTitle: `Lista de presentes - ${formatDate(Date.now())}`,
        onPrintError: () => alert("there is an error when printing"),
        onAfterPrint: () => setGifts(null)
      });

    const handlePrint = async () => {
        setLoadingReportData(true);

        const listRef = collection(db, "gifts")
        let q = query(listRef, orderBy('created_at', 'desc'))

        const querySnapshot = await getDocs(q)
        
        let list = [];

        querySnapshot.forEach((doc) => {
            list.push({
              _id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              status: doc.data().status,
              average_values: doc.data().average_values
            })
          })


        setGifts(list);
        setLoadingReportData(false);
    }

    useEffect(() => { 
        if(loadingReportData) return;

        if(!gifts || gifts.length === 0) return;
        
        print();
        
    }, [loadingReportData])

    return(
        <>
            <div style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0 }}>
                <PrintComponent 
                    content={gifts} 
                    ref={(element) => (printRef = element) } >
                </PrintComponent>
            </div>

            <div className='sidebar'>
            <div>
                    <img 
                    src={ user.avatarUrl === null ? avatarImg : user.avatarUrl }
                    alt="foto do usuario" 
                    />
            </div>

            <Link to="/gifts/dashboard">
                <FiGift color='#fff' size={24} />
                    <span>Presentes</span>
            </Link>

            {user.role === "ADMIN" &&
                <Link to="/gifts/list">
                        <BsListColumns  color='#fff' size={24} />
                        <span>Presentes / Lista</span>
                </Link>
            }

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

            {user.role === "ADMIN" &&
                <Link onClick={() => handlePrint()}>
                    <BiSolidReport color='#fff' size={24} />
                    <span>Imprimir Lista</span>
                </Link>
            }

            <Link className="logout-link" onClick={() => logout()}>
                    <ImExit  color='#fff' size={24} />
                    <span>Sair</span>
            </Link>
            <span>
                <i>Desenvolvido por <br />
                Marcos Vinicius Angeli Costa</i>
            </span>
            </div>
        </>
    );
}

export default Header;