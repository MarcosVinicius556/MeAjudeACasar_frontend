import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, where, limit, startAfter, query} from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import Modal from '../../components/Modal';

import './giftList.css'
import formatDate from '../../utils/DateFormatter'

const listRef = collection(db, "gifts")

export default function GiftsList(){
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
        : query(listRef, where("status", "!=", "INDISPONIVEL"), orderBy('status', 'desc', 'created_at', 'desc'), limit(5));

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

  function toggleModal(item) {
    console.log(item)
    setDetail(item);
    setShowPostModal(!showPostModal);
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

              <table>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Média de Valores</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {gifts.map((gift, index) => {
                    return (
                        <tr key={index}>
                          <td data-label="name">{gift.name}</td>
                          <td data-label="description">{gift.description}</td>
                          <td data-label="average_values">R$ {gift.average_values}</td>
                          <td data-label="status">
                            <span className="badge" style={{ backgroundColor: gift.status === 'DISPONIVEL' ? '#5cB85c' : '#999' }}>
                              {gift.status}
                            </span>
                          </td>
                          <td className="action-column" data-label="">
                            <button className="action" onClick={(e) => toggleModal(gift)} style={{ backgroundColor: '#734ac0' }}>
                              Detalhes 
                            </button>
                            {user.role === "ADMIN" && 
                              <Link to={`/gifts/new/${gift.id}`} onClick={() => toggleModal(gift)} className="action" style={{ backgroundColor: '#a28dca' }}>
                                Editar 
                              </Link>
                            }
                          </td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>        


              {loadingMore && <h3>Buscando mais presentes...</h3>}
              {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
            </>
          )}

      </div>
    
    {showPostModal && ( 
      <Modal 
        content={detail}
        close={() => setShowPostModal(!showPostModal)}
      /> 
    )}

    </div>
  )
}