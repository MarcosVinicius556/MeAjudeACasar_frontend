import { styled } from "styled-components";

export const FooterContainer = styled.header`
    width: 90%;
    max-width: 1800px;
    min-width: 800px;
    border-top: 1px solid ${({ theme }) => theme.colors.base.base};
    height: 120px;
    

    & p {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: black;
        letter-spacing: 1px;
    }
`;