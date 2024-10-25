import { styled } from 'styled-components';

export const ErrorMessage = styled.p`

    border: none;
    border-radius: 5px;

    width: 100%;
    min-height: 35px;
    display: flex;
    justify-content: start;
    padding-left: .5em;
    align-items: center;
    background: ${({ theme }) => theme.colors.commom.error};
    color: #282727;
    align-self: flex-start;
    font-weight: bold;

    margin-top: 3px;
    margin-bottom: 3px;

    & svg {
        margin-right: 15px;
    }

`;