import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function formatDate(created_at) {
    if (!created_at) return 'Data inválida';
    
    if (typeof created_at === 'number') {
        return format(new Date(created_at), 'dd/MM/yyyy HH:mm:ss');
    }
    
    if (typeof created_at === 'string') {
        try {
            const parsedDate = parse(created_at, "d 'de' MMMM 'de' yyyy 'às' HH:mm:ss 'UTC-3'", new Date(), { locale: ptBR });
            return format(parsedDate, 'dd/MM/yyyy HH:mm:ss');
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    }
    
    return 'Data inválida';
}

export default formatDate;