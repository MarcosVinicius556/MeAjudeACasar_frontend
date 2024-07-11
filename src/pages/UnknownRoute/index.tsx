import { Link } from "react-router-dom";
import DefaultPageContent from "../../components/DefaultPageContent";
import { UnknownRouteCard } from "./UnknownRoute.style";
import { MdWrongLocation } from "react-icons/md";

export default function UnknownRoute() {
    return (
        <DefaultPageContent>
            <UnknownRouteCard>
                <MdWrongLocation size={200}/>
                <h1>O caminho que você está tentando acessar não está disponível!</h1>
                <Link to="/">Voltar para a página de login</Link>
            </UnknownRouteCard>
        </DefaultPageContent>
    )
}