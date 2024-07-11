import styled from 'styled-components';

export const UnknownRouteCard = styled.div`
    width: 100%;
    height: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.5em;

    & h1 {
        text-align: center;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    & a {
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.base.darker};
        padding: 10px;
        padding-left: 30px;
        outline: none;
        margin-top: 1.5em;
        background: ${({ theme }) => theme.colors.base.base};
        color: Black;
        font-size: 18px;
        transition: all .3s ease-in-out;

        &:hover {
            background: ${({ theme }) => theme.colors.base.dark};
            color:${({ theme }) => theme.colors.base.lightest};
        }
    }
`;