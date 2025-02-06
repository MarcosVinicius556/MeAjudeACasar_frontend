import { memo } from 'react';
import { Card } from './GiftCard.style';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';

export interface IGiftCardProps {
    id: number;
    name: string;
    description: string;
    detailsFunction: (id: number) => void;
}
const GiftCard = memo(({ id, name, description, detailsFunction }: IGiftCardProps) => {
    return (
      <Card>
        <img src='https://img.freepik.com/fotos-gratis/caixa-de-presente-de-renderizacao-3d-com-pacote-de-presente-de-fita_107791-14916.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=ais_user' />
        <div>
          <h6>{name}</h6>
          <p>{description.length > 50 ? `${description.substring(0, 27)}...` : description}</p>
          <span>
            <button onClick={() => detailsFunction(id)}>
              Visualizar
            </button>
            <button onClick={() => detailsFunction(id)}>
              Editar
            </button>
          </span>
        </div>
        
      </Card>
    );
})
export default GiftCard;
