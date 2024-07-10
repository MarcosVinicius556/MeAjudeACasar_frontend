import { styled } from "styled-components";

export const LoginCard = styled.div`

    height: 80%;
    max-height: 550px;
    
    width: 80%;
    max-width: 500px;

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
                border-radius: 25px;
                border: 1px solid #494949;
                padding: 10px;
                padding-left: 30px;
                outline: none;
                transition: all .4s ease-in-out;

                &:focus {
                    border: 1px solid green;
                    -webkit-box-shadow: 0px 0px 3px 1px #575757;
                    -moz-box-shadow: 0px 0px 3px 1px #575757;
                    box-shadow: 0px 0px 3px 1px #575757;
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
            border-radius: 25px;
            border: 1px solid #343434;
            padding: 10px;
            padding-left: 30px;
            outline: none;
            margin-top: 1.5em;
            background: #343434;
            color: #fff;
            font-size: 18px;
            transition: all .3s ease-in-out;

            &:hover {
                background: #e6e6e6;
                color:#343434;
            }
        }
    }

    & h6 {
        width: 100%;
        height: 50px;
        padding: .5em;
        & p {
            text-align: center;
            font-size: 16px;

            & a {
                text-decoration: none;
                color: green;
            }
        }
    }
`;