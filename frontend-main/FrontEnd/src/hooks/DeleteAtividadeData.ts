import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "../../node_modules/axios/index"
import { AtividadeData } from "../interface/AtividadeData";

const API_URL = 'http://localhost:8081';

export const deleteData = async (data: AtividadeData): AxiosPromise<AtividadeData[]> => {
    const reponse = axios.post(API_URL + '/task/deletetask', data);
    (await reponse)
    return reponse;
}

export function ChangeAtividadeData(){
    const queryClientPost = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClientPost.invalidateQueries({ queryKey: ['atividade-data'] })
        }
    })

    return mutate
}