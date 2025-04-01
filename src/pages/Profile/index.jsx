import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png';
import { AuthContext } from "../../contexts/auth";
import './profile.css';

import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import { ref,
         uploadBytes,
         getDownloadURL
        } from "firebase/storage";

import { toast } from "react-toastify";

export default function Profile() {

    const{ user, storageUser, setUser, logout } = useContext(AuthContext);
    
    const[ avatarUrl, setAvatarUrl ] = useState(user && user.avatarUrl);
    const[ imageAvatar, setImageAvatar ] = useState(null);
    const[ name, setName ] = useState( user && user.name );
    const[ email, setEmail ] = useState( user && user.email );
    
    function handleFile(e) {
        if(e.target.files[0]){ 
            const image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image); 
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                alert('Envie uma imagem do tipo PNG ou JPG');
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (downloadUrl) => { 
                let urlFoto = downloadUrl;

                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, {
                    avatarUrl: urlFoto,
                    name,
                }).then(() => {
                    let data = {
                        ...user,
                        name,
                        avatarUrl: urlFoto,
                    }
                    setUser(data);
                    storageUser(data);

                    toast.success('atualizado com sucesso');
                }).catch(() => {
                    toast.error('Não foi possível atualizar');
                    console.log(error);
                });
            })
        }).catch((error) => {
            toast.failed('Não foi possível atualizar');
            console.log(error);
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(imageAvatar === null && name !== '') {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                name,
            }).then(() => {
                let data = {
                    ...user,
                    name
                }
                setUser(data);
                storageUser(data);

                toast.success('atualizado com sucesso');
            }).catch((error) => {
                toast.error('Não foi possível atualizar');
                console.log(error);
            })
        } else if(name !== '' && imageAvatar !== null) {
            handleUpload();
        }
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Title name="Minha conta">
                    <FiSettings size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile}/> <br />
                            {avatarUrl === null 
                            ?(
                                <img className="profile-foto" src={ avatar } alt="foto de perfil" width={250} height={250}/>
                            ) : (
                                <img className="profile-foto" src={ avatarUrl } alt="foto de perfil" width={250} height={250}/>
                            )
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} placeholder="Seu nome" onChange={(e) => setName(e.target.value)}/>

                        <label>Email</label>
                        <input type="email" value={email} placeholder="email@email.com" disabled/>

                        <button type="submit"> Salvar </button>
                    </form>
                </div>            
                <div className="container">
                    <button className="logout-btn" onClick={() => logout() }>Sair</button>
                </div>
            </div>
        </div>
    );
}