import './modal_v2.css';
import { FiX } from 'react-icons/fi';

export default function ModalV2({ content, close }) {
    return(
        <div className='modal'>
            <div className='container'>
                <button className="close" onClick={ close }>
                    <FiX size={25} color='#fff' />
                    Voltar
                </button>

                <main>
                    <div className='card' key={content.name}>
                        <div className='card-title' >
                            <span># {content.name}</span>
                        </div>
                        <div className='card-top' >
                            <img src={content.url_img} alt="" />
                        </div>
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