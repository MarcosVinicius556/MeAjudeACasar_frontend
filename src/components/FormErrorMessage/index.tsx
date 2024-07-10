import { memo } from 'react';
import { ErrorMessage } from './FormErrorMessage';
import { MdError } from 'react-icons/md';

interface IFormMessage {
    message: string | null | undefined
}

const FormErrorMessage = memo(({ message }: IFormMessage) => {

    return(
        (message !== null && message !== "" && message !== undefined) &&
            <ErrorMessage className='error'><MdError size={25}/>{'   '}{message}</ErrorMessage>
    );
});

export default FormErrorMessage;