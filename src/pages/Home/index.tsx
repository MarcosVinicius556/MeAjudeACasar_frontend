import DefaultPageContent from "../../components/DefaultPageContent";
import { HomePage, CardContainer, NextPreviousContainer } from "./Home.style";

import GiftCard from "../../components/GiftCard";

export default function Home() {

    return(
        <DefaultPageContent>
            <HomePage>
                <CardContainer>
                    
                    <div>
                        
                          <GiftCard 
                            key="1" 
                            id={1}
                            name="Produto bem bonitinho"
                            description="Descrição de um produto bem bonitinho"
                            detailsFunction={() => alert("Finge que eu fiz algo")} />
                            
                    </div>
                </CardContainer>
                <NextPreviousContainer>
                    <button>Carregar Mais</button>
                </NextPreviousContainer>
            </HomePage>
        </DefaultPageContent>
    )
}