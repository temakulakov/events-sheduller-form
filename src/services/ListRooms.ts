import axios from "axios";
import dayjs, {Dayjs} from 'dayjs';
import {ListElement, ListElementsResponse, ProcessedElement} from "../types";
import { useQuery } from "@tanstack/react-query";



// Функция для преобразования данных времени в формат dayjs
const processDateTime = (datetime: string): string => dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');

// Функция для обработки элементов списка и преобразования данных
const processListElements = (elements: ListElement[]): ProcessedElement[] => {
    return elements.map(element => ({
        id: parseInt(element.ID),
        title: element.NAME,
        sectionId: element.IBLOCK_SECTION_ID,
    }));
};

// Функция для получения элементов списка
const fetchListElements = async (sectionId: string): Promise<ProcessedElement[]> => {
    const { data } = await axios.get<ListElementsResponse>(`https://intranet.bakhrushinmuseum.ru/rest/3/ynm1gnbjjm2kf4vk/lists.element.get.json?IBLOCK_TYPE_ID=lists&IBLOCK_ID=78&SECTION_ID=${sectionId}`);
    return processListElements(data.result);
};

// Хук для использования элементов списка
export const useListElements = (sectionId: string) => {
    return useQuery({ queryKey: ['listElements', sectionId], queryFn: () => fetchListElements(sectionId) });
};