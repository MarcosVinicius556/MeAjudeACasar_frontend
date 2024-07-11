import { Container, Nav, Navbar } from "react-bootstrap";
import { HeaderContainer, LinksContainer } from "./Header.style";
import { memo } from 'react';
import { Link } from "react-router-dom";

import { CiLogin } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Header = memo(() =>  {

    return(
            <HeaderContainer>
                <Navbar>
                    <Container fluid>
                        <LinksContainer>
                            <Navbar.Brand as={Link} to="/home">
                                <FiSearch size={35} /> {' '}
                            </Navbar.Brand>
                        </LinksContainer>
                        <h2><span>Me Ajude</span><br /> A Casar</h2>
                        <LinksContainer>
                                <Nav className="ml-auto">
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/super-login" className="">
                                            <span className="row align-items-center justify-content-center">
                                                <CiLogin  size={35}/>
                                                Entrar
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </LinksContainer>
                    </Container>
                </Navbar>
            </HeaderContainer>
        );
    }
);

export default Header;