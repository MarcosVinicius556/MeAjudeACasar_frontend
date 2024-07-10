import styled from "styled-components";

export const Card = styled.article`
    
    margin: 5px;

    width: 200px;
    border-radius: 5px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    background: #343a40;
    border: 1px solid #323232;

    -webkit-box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.75);

    & h1 {
        font-size: 52px;
        font-weight: bold;
        width: 65px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
    }

    & p {
        text-align: center;
        color: #fff;
    }

    & span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        & button {
            width: 85%;
            border: none;
            outline: none;
            font-size: 16px;
            border-radius: 4px;
            height: 27px;
            display: flex;
            justify-content: center;
            align-items: center;

            & svg {
                margin-right: 10px;
            }

            & + button {
                margin-top: 5px;
            }
        }

        & button:nth-child(1) {
            background: #6efd7f;
            transition: all .3s ease-in-out;

            &:hover {
                background: #72fe82;
                color: #fff;
            }
        }

        & button:nth-child(2) {
            background: #f56a6a;
            transition: all .3s ease-in-out;

            &:hover {
                background: #d25b5b;
                color: #fff;
            }
        }
    }
`;