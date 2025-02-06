import styled from "styled-components";

export const Card = styled.article`
    
    margin: 5px;
    border: 1px solid ${({ theme }) => theme.colors.base.light};
    width: 250px;
    height: 400px;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    background: ${({ theme }) => theme.colors.base.lightest};

    & img {
        width: 92%;
        border-top: 1px solid ${({ theme }) => theme.colors.base.lightest};
        border-left: 1px solid ${({ theme }) => theme.colors.base.lightest};
        border-right: 1px solid ${({ theme }) => theme.colors.base.lightest};
        border-bottom: none;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background: #ffffff1d;

        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        mix-blend-mode: multiply;
    }

    & div {

        width: 100%;
        height: 100%;
        padding: 1em;

        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;

        background: ${({ theme }) => theme.colors.base.light};
        -webkit-box-shadow: 0px -10px 4px 0px ${({ theme }) => theme.colors.base.light};
        -moz-box-shadow: 0px -10px 4px 0px ${({ theme }) => theme.colors.base.light};
        box-shadow: 0px -10px 4px 0px ${({ theme }) => theme.colors.base.light};
        

        & h6 {
            letter-spacing: .5px;
            font-weight: 500;
            width: 100%;
            display: flex;
        }

        & p {
            color: #323232;
            text-align: start;
            font-size: 14px;
        }

        & span {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            flex-direction: row;

            & button {
                border: 1px solid ${({ theme }) => theme.colors.base.light};
                outline: none;
                width: 90px;
                height: 30px;
                border-radius: 25px;
                letter-spacing: .5px;
                font-size: 14px;
                transition: all .3s ease-in-out;
                display: flex;
                justify-content: center;
                align-items: center;

                background: rgb(255,207,214);

                &:hover {
                    background: ${({ theme }) => theme.colors.base.dark};
                    color: ${({ theme }) => theme.colors.base.lightest};
                }

            }
        }

    }
`;