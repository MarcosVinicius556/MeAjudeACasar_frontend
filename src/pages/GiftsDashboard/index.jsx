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

import { 
  loadAllGifts, 
  markAsObservedItem, 
  markAsPurchasedItem, 
  unmarkAsObservedItem } from '../../services/GiftsService'

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
    setLoading(true);

    loadGifts();

    return () => { }
  }, [])

  async function loadGifts(){
    
    setGifts([])
    const querySnapshot = await loadAllGifts(user, listRef);

    await updateState(querySnapshot)

    setLoading(false);

  }

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
          wanted_by: doc.data().wanted_by,
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
        : query(listRef, where("status", "!=", "COMPRADO"), startAfter(lastDocs), limit(5));

    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function handleToggleModal(item) {
    console.log(item)
    setDetail(item);
    setShowPostModal(!showPostModal);
  }

async function handleObserveItem(gift) {
  if(gift.status === 'OBSERVADO') {
    await unmarkAsObservedItem(gift, user.name)
  } else {
    await markAsObservedItem(gift, user.name)
  }

  await loadGifts();
}

async function handlePurchaseItem(gift) {
  await markAsPurchasedItem(gift, user.name);
  await loadGifts();
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
                        <div className='card' key={gift.id + index}>
                          <div className='card-title' >
                            <span># {gift.name}</span>
                          </div>
                          <div className='card-top' >
                            <img src={gift.url_img} alt="" />
                          </div>
                          <div className='card-bottom' >
                            <ul>
                              <li 
                                onClick={() => handleToggleModal(gift)}
                                className='gift-detail-button'>
                                <FiPlus size={20}/>
                              </li>

                              <li 
                              className='gift-status-icons'
                                style={{ background: `${gift.status !== 'DISPONIVEL' ? '#fa9595' : '' }` }} 
                                onClick={() => handleObserveItem(gift)}>
                                {gift.status === 'DISPONIVEL' 
                                  ? <FaEye size={20}/>
                                  : <FaEyeSlash size={20}/>
                                }
                              </li>

                              <li 
                                className='gift-purchase-button'
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