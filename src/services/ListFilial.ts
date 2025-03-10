import axios from "axios";
import {ListSection, ListSectionsResponse, ProcessedListSection} from "../types";
import { useQuery } from "@tanstack/react-query";



// Функция для обработки секций списка и преобразования данных
const processListSections = (sections: ListSection[]): ProcessedListSection[] => {
    return sections.map(section => ({
        id: parseInt(section.ID),
        title: section.NAME,
    }));
};

// Функция для получения секций списка
const fetchListSections = async (): Promise<ProcessedListSection[]> => {
    const { data } = await axios.get<ListSectionsResponse>('https://intranet.bakhrushinmuseum.ru/rest/1/e3stpev74xjsn8m2/lists.section.get.json?IBLOCK_TYPE_ID=lists&IBLOCK_ID=80');
    return processListSections(data.result);
};

// Хук для использования секций списка
export const useListSections = () => {
    return useQuery({ queryKey: ['listSections'], queryFn: fetchListSections });
};
