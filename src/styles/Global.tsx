import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-synthesis: none;
        text-rendering: optimizeLegibility;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

`;

export const BodyContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    flex-direction: column;
`;

export const MainSection = styled.section`
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
`;