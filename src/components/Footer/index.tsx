import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { FooterContainer } from './Footer.style';
import { memo } from 'react';

const Footer = memo(() =>  {
    return(
            <FooterContainer className='bg-dark'>
                <div className="social" id="section-social">
                    <ul>
                        <div></div>
                        <li>
                            <a href="https://www.linkedin.com/in/marcos-vinicius-angeli-costa/" target="_blank" rel="noopener noreferrer">
                                <i><FaLinkedin /></i>
                            </a>
                        </li>
                        <li>	
                            <a href="https://contate.me/dev_marcos_vinicius" target="_blank" rel="noopener noreferrer">
                                <i><FaWhatsapp /></i>
                            </a>
                        </li>
                        <li>	
                            <a href="https://github.com/MarcosVinicius556" target="_blank" rel="noopener noreferrer">
                                <i><FaGithub /></i>
                            </a>
                        </li>
                        <div></div>
                    </ul>
                </div>
                <p>Copyright by Marcos Vinicius Angeli Costa.</p>
            </FooterContainer>
        );
    }
);

export default Footer;