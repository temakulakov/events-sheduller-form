    import { useQuery } from '@tanstack/react-query';
    import axios from 'axios';
    import {UserField, UserFieldAPI, UserFieldsResponse} from "../types";

    const fetchUserFields = async (): Promise<UserField[]> => {
        const { data } = await axios.get<{ result: UserFieldAPI[] }>('https://intranet.bakhrushinmuseum.ru/rest/1/e3stpev74xjsn8m2/crm.deal.userfield.list');
        return data.result.map(field => ({
                id: parseInt(field.ID),
                title: field.FIELD_NAME,
                list: field.LIST?.map(item => ({
                    id: parseInt(item.ID),
                    title: item.VALUE
                }))
            }))
    };

    export const useUserFields = () => {
        return useQuery({queryKey: ['userFields'], queryFn: fetchUserFields});
    }
