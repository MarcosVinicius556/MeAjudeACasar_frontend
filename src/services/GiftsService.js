import { db } from './firebaseConnection';
import { doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import Swal from 'sweetalert2';

export const loadAllGifts = async (user, listRef) => {
    let q;

    q = user.role === "ADMIN" 
      ? query(listRef, orderBy('created_at', 'desc'), limit(5))
      : query(listRef, where("status", "!=", "INDISPONIVEL"), orderBy('status', 'desc', 'created_at', 'desc'), limit(5));

    return await getDocs(q);
}

export const markAsObservedItem = async (gift, username) => {
    treatUndefinedFields(gift);

    await Swal.fire({
        icon: "question",
        title: "Deseja colocar este item em observação?",
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const docRef = doc(db, 'gifts', gift.id);
            await updateDoc(docRef, { ...gift, status: 'OBSERVADO', wanted_by: username, updated_at: Date.now() });
            await Swal.fire("Ebaa, agora este item está marcado como monitorado por você! ", "", "success");
        } else if (result.isDenied) {
            //Tratativa?
        }
    });
}

export const unmarkAsObservedItem = async (gift, username) => {
    if(gift.wanted_by !== username ) {
        await Swal.fire("Este item não foi marcado como observado por você, por isto você não pode alterar seu estado! ", "", "warning");
        return;
    }
    
    treatUndefinedFields(gift);

    await Swal.fire({
        icon: "question",
        title: "Este item está marcado como observado, ao desmarca-lo aparecerá como disponível para todos, deseja prosseguir?",
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const docRef = doc(db, 'gifts', gift.id);
            await updateDoc(docRef, { ...gift, status: 'DISPONIVEL', wanted_by: null, updated_at: Date.now() });
            await Swal.fire("Item removido da lista de observados! ", "", "success");
        } else if (result.isDenied) {
            //Tratativa?
        }
    });
}

export const markAsPurchasedItem = async (gift, username) => {

    if(gift.status === 'COMPRADO') {
        await Swal.fire("Este item já está como comprado! Somente noivos podem alterar seu estado através da tela de edição de presentes.", "", "success");
        return;
    }

    treatUndefinedFields(gift);

    await Swal.fire({
        icon: "question",
        title: `Deseja marcar este item como comprado? Se você confirmar,
                entenderemos que este item foi comprado por você e ele irá
                sair da lista dos demais usuários.`,
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const docRef = doc(db, 'gifts', gift.id);
            await updateDoc(docRef, { ...gift, status: 'COMPRADO', bought_by: username, updated_at: Date.now() });
            await Swal.fire("Ebaa, agora este item está marcado como comprado por você! Os noivos agradecem muito sua ajuda <3", "", "success");
        } else if (result.isDenied) {
            //Tratativa?
        }
    });
}

const treatUndefinedFields = (gift) => {
    Object.keys(gift).forEach(key => {
        if (gift[key] === undefined) {
            delete gift[key];
        }
    });
}