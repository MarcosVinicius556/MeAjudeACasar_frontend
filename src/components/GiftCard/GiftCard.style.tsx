import styled from "styled-components";

export const Card = styled.article`
    
    margin: 5px;

    width: 300px;
    height: 400px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    background: #ffff;
    border: 1px solid ${({ theme }) => theme.colors.base.base};

    -webkit-box-shadow: 0px 0px 3px 3px ${({ theme }) => theme.colors.base.lightest};
    -moz-box-shadow: 0px 0px 3px 3px ${({ theme }) => theme.colors.base.lightest};
    box-shadow: 0px 0px 3px 3px ${({ theme }) => theme.colors.base.lightest};

    & h6 {
        letter-spacing: .5px;
        line-height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & img {
        width: 220px;
        border-radius: 5px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border: 1px solid ${({ theme }) => theme.colors.base.base};
    }

    & p {
        margin-top: 10px;
        text-align: center;
        color: #323232;
    }

    & span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & button {
            border: none;
            outline: none;
            width: 150px;
            height: 50px;
            border-radius: 5px;
            letter-spacing: .5px;
            background: ${({ theme }) => theme.colors.base.base};
            transition: all .3s ease-in-out;

            & svg {
                margin-right: 10px;
            }

            &:hover {
                background: ${({ theme }) => theme.colors.base.dark};
                color: ${({ theme }) => theme.colors.base.lightest};
            }

        }
    }
`;