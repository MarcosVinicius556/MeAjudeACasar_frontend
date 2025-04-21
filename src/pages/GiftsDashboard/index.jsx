import './dashboard.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { MdOutlineShoppingBag } from 'react-icons/md'

import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, where, limit, startAfter, query} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import ModalV2 from '../../components/ModalV2';

import formatDate from '../../utils/DateFormatter'
import Swal from 'sweetalert2'

const listRef = collection(db, "gifts")

export default function GiftsDashboard(){
  const { user } = useContext(AuthContext);

  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEmpty, setIsEmpty] = useState(false);
  const[ lastDocs, setLastDocs ] = useState();
  const[ loadingMore, setLoadingMore ] = useState();

  const[ showPostModal, setShowPostModal ] = useState(false);
  const[ detail, setDetail ] = useState();


  useEffect(() => {
    async function loadGifts(){
      let q;

      q = user.role === "ADMIN" 
        ? query(listRef, orderBy('created_at', 'desc'), limit(5)) //SuperUser must see all
        : query(listRef, where("status", "!=", "INDISPONIVEL"), orderBy('created_at', 'desc'), limit(5));

      const querySnapshot = await getDocs(q)
      setGifts([]);

      await updateState(querySnapshot)

      setLoading(false);

    }

    loadGifts();


    return () => { }
  }, [])


  async function updateState(querySnapshot){
    const isCollectionEmpty = querySnapshot.size === 0;

    if(!isCollectionEmpty){
      let list = [];

      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          url_img: doc.data().url_img,
          status: doc.data().status,
          average_values: doc.data().average_values,
          created_at: doc.data().created_at,
          created_at_format: formatDate(doc.data().created_at),
          where_to_buy: doc.data().where_to_buy,
        })
      })

      //Pegando o último registro renderizado
      const lastDoc = querySnapshot.docs[ querySnapshot.docs.length - 1 ];
      
      setGifts(gifts => [...gifts, ...list])
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }
    
    setLoadingMore(false);

  }

  async function handleMore() {
    setLoadingMore(true);

    let q;

    q = user.role === "ADMIN" 
        ? query(listRef, orderBy('name', 'desc'), startAfter(lastDocs), limit(5))
        : query(listRef, where("status", "!=", "INDISPONIVEL"), startAfter(lastDocs), limit(5));

    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function handleToggleModal(item) {
    console.log(item)
    setDetail(item);
    setShowPostModal(!showPostModal);
  }

function handleObserveItem(gift) {
  if(gift.status === 'OBSERVADO') {
    Swal.fire({
      icon: "question",
      title: "Este item está marcado como observado, ao desmarca-lo aparecerá como disponível para todos, deseja prosseguir?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Ebaa, agora este item está marcado como monitorado por você! ", "", "success");
      } else if (result.isDenied) {
        //Tratativa?
      }
    });
  } else {
    Swal.fire({
      icon: "question",
      title: "Deseja colocar este item em observação?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Ebaa, agora este item está marcado como monitorado por você! ", "", "success");
      } else if (result.isDenied) {
        //Tratativa?
      }
    });
  }
}

function handlePurchaseItem(gift) {
  Swal.fire({
    title: `Deseja marcar este item como comprado? Se você confirmar,
            entenderemos que este item foi comprado por você e ele irá
            sair da lista dos demais usuários.`,
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: `Não`
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Ebaa, agora este item está marcado como monitorado por você! ", "", "success");
    } else if (result.isDenied) {
      //Tratativa?
    }
  });
}


  if(loading){
    return(
      <div>
        <Header/>

        <div className="content">
          <Title name="Presentes">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando presentes cadastrados no sistema...</span>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Presentes">
          <FiMessageSquare size={25} />
        </Title>

          {gifts.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum presente encontrado...</span>
              {/* Só aparecer para super usuários */}
              {user.role === "ADMIN" && 
                <Link to="/gifts/new" className="new">
                  <FiPlus color="#FFF" size={25} /> 
                  Cadastrar um novo presente
                </Link>  
              }
              
            </div>
          ) : (
            <>
            {user.role === "ADMIN" && 
              <Link to="/gifts/new" className="new">
                <FiPlus color="#FFF" size={25} />
                Cadastrar um novo presente
              </Link>  
            }

              <div className="gifts-container">
                {gifts.map((gift, index) => {
                      return (
                        <div className='card' key={gift.id}>
                          <div className='card-title' >
                            <span># {gift.name}</span>
                          </div>
                          <div className='card-top' >
                            <img src={gift.url_img} alt="" />
                          </div>
                          <div className='card-bottom' >
                            <ul>
                              <li 
                                onClick={() => handleToggleModal(gift)}>
                                <FiPlus size={20}/>
                              </li>

                              <li 
                                style={{ background: `${gift.status !== 'DISPONIVEL' ? '#fa9595' : '' }` }} 
                                onClick={() => handleObserveItem(gift)}>
                                {gift.status === 'DISPONIVEL' 
                                  ? <FaEye size={20}/>
                                  : <FaEyeSlash size={20}/>
                                }
                              </li>

                              <li 
                                onClick={() => handlePurchaseItem(gift)}>
                                  <MdOutlineShoppingBag size={20}/>
                              </li>
                            </ul>
                          </div>

                        </div>
                      )
                    }
                  )
                }
              </div>

              


              {loadingMore && <h3>Buscando mais presentes...</h3>}
              {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
            </>
          )}

      </div>
    
    {showPostModal && ( 
      <ModalV2 
        content={detail}
        close={() => setShowPostModal(!showPostModal)}
      /> 
    )}

    </div>
  )
}