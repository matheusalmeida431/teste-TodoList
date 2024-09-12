import { useQuery } from "../../node_modules/@tanstack/react-query/build/legacy/useQuery";
import axios, { AxiosPromise } from "../../node_modules/axios/index"
import { AtividadeData } from "../interface/AtividadeData";

const API_URL = 'http://localhost:8081';

const fetchData = async (): AxiosPromise<AtividadeData[]> => {
    const reponse = axios.get(API_URL + '/task/consultartask');
    return reponse;
}

export function useAtividadeData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['atividade-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data /*O query adiciona o dado vindo do back-end do tipo data e o axios tmb, o objeto se torna um objeto do tipo data data*/
    }
}