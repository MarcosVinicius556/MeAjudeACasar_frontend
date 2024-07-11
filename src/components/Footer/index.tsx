import { FooterContainer } from './Footer.style';
import { memo } from 'react';

const Footer = memo(() =>  {
    return(
            <FooterContainer>
                <p>Copyright by Marcos Vinicius Angeli Costa.</p>
            </FooterContainer>
        );
    }
);

export default Footer;