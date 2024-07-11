import { styled } from "styled-components";

export const RegisterPage = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const RegisterCard = styled.div`

    max-height: 800px;
    width: 80%;
    max-width: 800px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 1em;

    & span {

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & h1 {
            margin-bottom: 1em;
            text-align: center;
            & span {
                color: ${({ theme }) => theme.colors.base.base}
            }
        }

        & small {
            text-align: center;
        }
    }

    & form {
        flex: 1;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        & span {
            width: 100%;
            padding: 1em;
            & input {
                width: 100%;
                border-radius: 5px;
                border: 1px solid #494949;
                padding: 10px;
                padding-left: 15px;
                outline: none;
                transition: all .4s ease-in-out;

                &:focus {
                    border: 1px solid green;
                    -webkit-box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.colors.base.base};
                    -moz-box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.colors.base.base};
                    box-shadow: 0px 0px 3px 1px ${({ theme }) => theme.colors.base.base};
                }

                & + input {
                    margin-top: 5px;
                }

            }

            & a {
                text-decoration: none;
                align-self: self-end;
                margin-top: 10px;
                font-size: 14px;
                letter-spacing: .5px;
                color: #343434;
            }
        }

        & input[type="submit"] {
            width: 100%;
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

        & a:last-child {
            width: 100%;
            border-radius: 5px;
            text-align: center;
            border: 1px solid ${({ theme }) => theme.colors.base.darker};
            padding: 10px;
            padding-left: 30px;
            outline: none;
            margin-top: 1.5em;
            background: ${({ theme }) => theme.colors.commom.error};
            color: Black;
            font-size: 18px;
            transition: all .3s ease-in-out;

            &:hover {
                background: ${({ theme }) => theme.colors.base.darkest};
                color:${({ theme }) => theme.colors.base.lightest};
            }
        }
    }

`;

export const CoupleInformation = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    & div {
        border: 1px solid ${({ theme }) => theme.colors.base.base};
        align-self: last baseline;
        height: 180px;
    }
`;