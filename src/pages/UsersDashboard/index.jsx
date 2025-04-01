import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare } from 'react-icons/fi';

import { 
  collection, 
  getDocs, 
  orderBy, 
  limit, 
  startAfter, 
  query} from 'firebase/firestore';

import { db } from '../../services/firebaseConnection';

import './dashboard.css';
import formatDate from '../../utils/DateFormatter';

const listRef = collection(db, "users")

export default function UsersDashboard(){

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEmpty, setIsEmpty] = useState(false);
  const[ lastDocs, setLastDocs ] = useState();
  const[ loadingMore, setLoadingMore ] = useState();

  useEffect(() => {
    async function loadUsers(){
      const q = query(listRef, orderBy('name', 'desc'), limit(5));

      const querySnapshot = await getDocs(q)
      setUsers([]);

      await updateState(querySnapshot)

      setLoading(false);

    }

    loadUsers();


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
          email: doc.data().email,
          role: doc.data().role,
          created_at: doc.data().created_at
        })
      })

      const lastDoc = querySnapshot.docs[ querySnapshot.docs.length - 1 ];
      
      setUsers(users => [...users, ...list])
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }
    
    setLoadingMore(false);

  }

  async function handleMore() {
    setLoadingMore(true);

    const q = query(listRef,
                    orderBy('name', 'desc'),
                    startAfter(lastDocs),
                    limit(5));

    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }


  if(loading){
    return(
      <div>
        <Header/>

        <div className="content">
          <Title name="Usuários Cadastrados">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando usuários cadastrados no sistema...</span>
          </div>
        </div>
      </div>
    )
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Usuários Cadastrados">
          <FiMessageSquare size={25} />
        </Title>

          {users.length === 0 ? (
            <div className="container dashboard">
              <span>Nenhum usuário cadastrado...</span>
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Papél</th>
                    <th scope="col">Criado Em</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return(
                      <tr key={index}>
                        <td data-label="name">{user.name}</td>
                        <td data-label="email">{user.email}</td>
                        <td data-label="role">{user.role}</td>
                        <td data-label="created_at">{formatDate(user.created_at)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>        


              {loadingMore && <h3>Buscando mais usuários...</h3>}
              {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}
            </>
          )}

      </div>
    
    </div>
  )
}