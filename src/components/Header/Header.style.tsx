import { styled } from "styled-components";

export const HeaderContainer = styled.header`
    width: 90%;
    max-width: 1800px;
    min-width: 800px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.base.base};
    & nav {
        & h2 {
            text-align: center;
            & span {
                color: ${({ theme }) => theme.colors.base.dark};
            }
        }
    }
`;

export const LinksContainer = styled.div`
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    height: 100px;
    min-height: 50px;
    max-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em;
    & a {
        & svg {
            color: black;
            transition: all .3s ease-in-out;

            &:hover{
                color: gray;
            }
        }
    }
`;