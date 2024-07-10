import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100%;
    max-width: 1600px;
    height: 100%;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;

    & span {
        border: 1px solid gray;
        height: 10em;
        width: 10em;
        border-radius: 50%;
        background: #343a40;
        display: flex;
        justify-content: center;
        align-items: end;
        overflow: hidden;

        & svg {
            height: 8em;
            width: 8em;
            color: green;
        }
    }

    & h3 {
        margin-top: .5em;
        font-weight: bold;
        text-align: center;
    }

    & h5 {
        margin-top: .5em;
        text-align: center;
    }
`;

export const CardContainer = styled.div`
    width: 100%;
    height: auto;
    max-height: 300px;

    .new {
        float: right;
        margin-bottom: 1.5em;
        background: green;
        padding: .5em;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        font-weight: 600;
        color: #fff;
        transition: all ease-in-out .3s;
        text-decoration: none;
    }

    .new svg {
        margin-right: 5px;
    }

    .new:hover {
        background: #5fd204;
    }

    & div {
        margin: 0;
        padding: 1em;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    @media screen and (max-width: 600px) {
        & div {
            border: 0;

           
        }
    }
`;

export const NextPreviousContainer = styled.span`

    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1em;

    & button {
        
        background: #5e5e5e;
        border: none;
        padding: .5em;
        border-radius: 5px;
        color: #fff;
        letter-spacing: 1px;
        border: 1px solid transparent;
        transition: all .3s ease-in-out;
        display: flex;

        &:hover {
            background: #fff;
            color: #323232;
            border: 1px solid gray;
        }

        &:nth-child(1) {
            & svg {
                transform: rotate(180deg);
            }
        }
    }

`;

export const LetterAbbreviation = styled.div`
    background: purple;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;
