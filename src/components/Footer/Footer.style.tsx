import { styled } from "styled-components";

export const FooterContainer = styled.header`
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 70px;
    /* background: #343a40; */

    & div {
        display: flex;
        margin-bottom: 10px;

        & ul {
            position: absolute;
            transform: translate(-50%,-50%);
            display: flex;
            padding: 0;

            & div {
                width: 15px;
                height: 3px;
                background-color: green;
                margin: auto;
            }

            & li {
                position: relative;
                list-style: none;
                width: 70px;
                height: 70px;
                margin: 0 20px;

                & i {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    display: flex !important;
                    background: #3f474e;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    font-size: 30px !important;
                    transition: 1.5s ease-out;
                }

                &:hover i{
                    transition: .3s;
                }

                &:nth-child(2):hover i {
                    background: #2c3456 !important;
                }

                &:nth-child(3):hover i {
                    background: #63ce90 !important;
                }

                &:nth-child(4):hover i {
                    background: #6a77ee !important;
                }

            }
        }
    }

    & p {
        color: #fff;
        margin-top: 40px;
        margin-bottom: -20px;
        letter-spacing: 1px;
    }
`;