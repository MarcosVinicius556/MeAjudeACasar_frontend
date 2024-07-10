import { Link } from "react-router-dom";
import DefaultPageContent from "../../components/DefaultPageContent";
import { RiUserForbidFill } from "react-icons/ri";
import { UnauthorizedCard } from "./Unauthorized.style";

export default function Unauthorized({ message }: { message: string }) {
    return (
        <DefaultPageContent>
            <UnauthorizedCard>
                <RiUserForbidFill size={200}/>
                <h1>{message}</h1>
                <Link to="/">Voltar para a apágina de login</Link>
            </UnauthorizedCard>
        </DefaultPageContent>
    )
}