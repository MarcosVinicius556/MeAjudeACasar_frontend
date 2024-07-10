import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import DefaultPageContent from "../../components/DefaultPageContent";
import { Header, HomeContainer, CardContainer, NextPreviousContainer } from "./Home.style";

import PasswordCard from "../../components/PasswordCard";
import { FiPlus } from "react-icons/fi";

export default function Home() {

    return(
        <DefaultPageContent>
            <HomeContainer>
                <Header>
                    <span>
                        <FaUser/>
                    </span>
                    <h3>Olá Marcos Vinicius, seja bem vindo a sua central de senhas!</h3>
                    <h5>Abaixo você encontrará todas as suas senhas salvas.</h5>
                </Header>
                <CardContainer>
                    <Link to="/password/new" className="new">
                        <FiPlus color="#fff" size={25} />
                        Registrar uma nova senha
                    </Link>  
                    <div>
                        
                          <PasswordCard 
                            key="1" 
                            id={1}
                            name="Produto bem bonitinho"
                            description="Descrição de um produto bem bonitinho"
                            detailsFunction={() => alert("Finge que eu fiz algo")}
                            deleteFunction={() => alert("Finge que eu fiz algo")} />
                    </div>
                    <NextPreviousContainer>
                        <h4>Aqui fazer aqueles botões de "Carregar mais" fazendo um scrol infinito junto de paginação...</h4>
                    </NextPreviousContainer>
                </CardContainer>
            </HomeContainer>
        </DefaultPageContent>
    )
}