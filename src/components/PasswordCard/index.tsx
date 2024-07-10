import { memo } from 'react';
import { Card } from './PasswordCard.style';
import { FaSearch, FaTrash } from 'react-icons/fa';

export interface IPasswordCardProps {
    id: number;
    name: string;
    description: string;
    deleteFunction: (id: number) => void;
    detailsFunction: (id: number) => void;
}
const PasswordCard = memo(({ id, name, description, detailsFunction, deleteFunction }: IPasswordCardProps) => {
    return (
      <Card>
        <h1>{name.substring(0, 1)}</h1>
        <p>{description.length > 30 ? `${description.substring(0, 27)}...` : description}</p>
        <span>
          <button onClick={() => detailsFunction(id)}>
            <FaSearch size={17}/>
            Detalhes
          </button>
          <button onClick={() => deleteFunction(id)}>
            <FaTrash size={17}/>
            Deletar
          </button>
        </span>
      </Card>
    );
})
export default PasswordCard;
