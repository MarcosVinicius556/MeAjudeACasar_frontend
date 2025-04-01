import './new.css';
import { useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateGiftSchema from '../../validations/CreateGiftZodSchema';


const listRef = collection(db, 'users');

export default function GiftsRegister() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(CreateGiftSchema),
        defaultValues: {
            name: '',
            description: '',
            url_img: '',
            average_values: '',
            created_by: user?.name || '',
            bought_by: '',
            wanted_by: '',
            status: 'DISPONIVEL'
        }
    });

    useEffect(() => {
        if (id) {
            async function loadGiftById() {
                try {
                    const docRef = doc(db, 'gifts', id);
                    const snapshot = await getDoc(docRef);
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        Object.keys(data).forEach(key => setValue(key, data[key]));
                    } else {
                        toast.error("Presente não encontrado.");
                        navigate('/gifts/dashboard');
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Ocorreu um erro ao buscar o presente.");
                }
            }
            loadGiftById();
        }
    }, [id, setValue, navigate]);

    async function onSubmit(data) {
        try {
            if (id) {
                const docRef = doc(db, 'gifts', id);
                await updateDoc(docRef, { ...data, updated_at: Date.now() });
                toast.success('Presente atualizado com sucesso!');
            } else {
                await addDoc(collection(db, 'gifts'), { ...data, created_at: Date.now() });
                toast.success('Presente registrado com sucesso!');
            }
            navigate('/gifts/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao salvar presente.');
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name={id ? "Editando Presente" : "Novo Presente"}>
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSubmit(onSubmit)}>
                        
                        <img className="giftImage" src={watch("url_img") || ""} alt="Imagem ilustrativa do produto desejado" />

                        <hr />

                        <label>Nome</label>
                        <input type="text" {...register("name")} placeholder="Nome do produto" />
                        {errors.name && <p className='error'>{errors.name.message}</p>}

                        <label>Descrição</label>
                        <input type="text" {...register("description")} placeholder="Breve descrição do produto" />
                        {errors.description && <p className='error'>{errors.description.message}</p>}

                        <label>Média de Valores</label>
                        <input type="number" {...register("average_values")} placeholder="Média de valor encontrado" />
                        {errors.average_values && <p className='error'>{errors.average_values.message}</p>}

                        <label>Link para imagem do produto</label>
                        <input type="text" {...register("url_img")} placeholder="Link para uma imagem do produto" />
                        {errors.url_img && <p className='error'>{errors.url_img.message}</p>}

                        <label>Observado por</label>
                        <input type="text" {...register("wanted_by")} placeholder="Aqui aparecerá quem está de olho neste presente" />

                        <label>Comprado por</label>
                        <input type="text" {...register("bought_by")} placeholder="Aqui aparecerá quem te deu este lindo presente" />

                        <hr />

                        <label>Status</label>
                        <div className="status">
                            {["DISPONIVEL", "OBSERVADO", "COMPRADO"].map((value) => (
                                <div className="status-row" key={value}>
                                    <input type="radio" value={value} {...register("status")} />
                                    <span>{value.charAt(0) + value.slice(1).toLowerCase()}</span>
                                </div>
                            ))}
                        </div>

                        <button type='submit'>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
