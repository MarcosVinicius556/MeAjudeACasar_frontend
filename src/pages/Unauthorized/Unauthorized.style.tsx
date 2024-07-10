import styled from 'styled-components';

export const UnauthorizedCard = styled.div`
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
        width: 300px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        border: 1px solid #343434;
        padding: 10px;
        outline: none;
        background: #343434;
        color: #fff;
        font-size: 18px;
        transition: all .3s ease-in-out;

        &:hover {
            background: #e6e6e6;
            color:#343434;
        }
    }
`;