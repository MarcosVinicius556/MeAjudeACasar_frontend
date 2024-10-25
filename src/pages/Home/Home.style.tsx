import styled from 'styled-components';

export const HomePage = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 85%;
    min-height: 700px;

`;

export const CardContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;

    & div {
        margin: 0;
        padding: 1em;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
    }
`;

export const NextPreviousContainer = styled.span`
    align-self: center;
    margin-top: 2em;
    margin-bottom: 2em;

    & button {
        border: none;
        outline: none;
        width: 150px;
        height: 50px;
        border-radius: 5px;
        letter-spacing: .5px;
        background: ${({ theme }) => theme.colors.base.base};
        transition: all .3s ease-in-out;

        &:hover {
            background: ${({ theme }) => theme.colors.base.dark};
            color: ${({ theme }) => theme.colors.base.lightest};
        }

    }
    
`;
