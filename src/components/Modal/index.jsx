import './modal.css';
import { FiX } from 'react-icons/fi';

export default function Modal({ content, close }) {
    return(
        <div className='modal'>
            <div className='container'>
                <button className="close" onClick={ close }>
                    <FiX size={25} color='#fff' />
                    Voltar
                </button>

            <main>
                <h2>Detalhes do presente</h2>
                <div className='image-container'>
                    <input type='image' disabled={true} src={content.url_img} alt="Imagem ilustrativa do produto desejado" />
                </div>
                
                <div className="row">
                    <span>Nome: <i>{content.name}</i></span>
                </div>

                <div className="row">
                    <span>Descricao: <i>{content.description}</i></span>
                </div>

                <div className="row">
                    <span>Média de Valores: <i>R$ {content.average_values}</i></span>
                </div>

                <div className="row">
                    <span className="badge" style={{ backgroundColor: content.status === 'DISPONIVEL' ? '#5cB85c' : '#999' }}>
                                {content.status}
                    </span>
                </div>
                
            </main>

            </div>
        </div>
    )
}