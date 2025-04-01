import { useState, createContext, useEffect } from "react";
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const[user, setUser] = useState(null);
    const[loadingAuth, setLoadingAuth] = useState(false);
    const[loading, setLoading] = useState();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem("@ticketsPRO");

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }   

        loadUser();
    }, []);

    const navigate = useNavigate();

    async function signIn(email, password) {
        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            let data = {
                uid: uid,
                name: docSnap.data().name,
                email: value.user.email,
                password,
                avatarUrl: docSnap.data().avatarUrl,
                role: docSnap.data().role
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem-vindo de volta!');
            navigate('/gifts/dashboard');
            })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false)
            toast.error('Ocorreu um erro ao fazer login');
        });
    }

    /**
     * @apiNote Cadastro de novo usuário 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     */
    async function signUp(user) {
        setLoadingAuth(true);
        let {email, password, name, created_at, role} = user;
        await createUserWithEmailAndPassword(auth, email, password)
              .then(async (value) => {
                    let uid = value.user.uid;

                    await setDoc(doc(db, 'users', uid), {
                        name,
                        email,
                        password,
                        role,
                        avatarUrl: null,
                        created_at
                    })
                     .then(() => {
                        let data = {
                            uid: value.user.uid,
                            name,
                            email: value.user.email,
                            role,
                            avatarUrl: null,
                            password,
                            created_at
                        };
                        setUser(data);
                        storageUser(data);
                        setLoadingAuth(false);
                        toast.success('Seja bem-vindo ao sistema!');
                        navigate('/gifts/dashboard');

                    })
                }).catch((error) => {
                console.log(error);
                setLoadingAuth(false);
              });
    }

    async function autoSignInWithCookie() {
        const cookie = localStorage.getItem('@meAjudeACasarBro');
        if(!cookie) {
            return;
        }

        const user = JSON.parse(cookie);

        await signIn(user.email, user.password);
    }

    /**
     * @apiNote Salva os dados do usuário logado no localStorage
     * @param {User} data 
     */
    function storageUser(data) {
        localStorage.setItem('@meAjudeACasarBro', JSON.stringify(data));
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem("@meAjudeACasarBro");
        setUser(null);
    }


    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser,
            setUser,
            autoSignInWithCookie
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;