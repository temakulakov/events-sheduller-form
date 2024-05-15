import {useRecoilValue} from "recoil";
import {departmentEventState, roomEventState, typeContractEventState} from "./store/atoms";
import {Dayjs} from "dayjs";

export interface User {
    id: number;
    fullName: string;
    avatarUrl: string;
};

export interface EventType {
    id: number;
    title: string;
}

export interface EventDepartment {
    id: number;
    title: string;
};

export interface EventRoom {
    id: number;
    title: string;
}

// Получение полей пользовательских типов crm

interface ListItem {
    id: number;    // ID как число
    title: string; // VALUE как строка
}

interface UserField {
    id: number;     // ID как число
    title: string;  // FIELD_NAME как строка
    list?: EventType[]; // Массив элементов списка
}

interface UserFieldsResponse {
    result: UserField[];
}

interface ListItemAPI {
    ID: string;     // ID как число
    VALUE: string;  // FIELD_NAME как строка
}

interface UserFieldAPI {
    ID: string;     // ID как число
    FIELD_NAME: string;  // FIELD_NAME как строка
    LIST?: ListItemAPI[]; // Массив элементов списка
}



// Тип для отправки запроса

interface DealFields {
    TITLE: string;
    CATEGORY_ID: 7;
    STAGE_ID: 'new';
    UF_CRM_1714583071: number[];    // Список ответственных сотрудников
    UF_CRM_DEAL_1712137850471: string; // Дата начала
    UF_CRM_DEAL_1712137877584: string; // Дата окончания
    UF_CRM_DEAL_1712137914328: number; // Тип мероприятия
    UF_CRM_1714663307: string; // Длительность

    // UF_CRM_DEAL_1712138052482: number; // Отвественный отдел
    // UF_CRM_DEAL_1712138132003: number[]; // Используемые залы

    UF_CRM_1715507748: number;
    UF_CRM_1715508611: number; // Используемые залы

    UF_CRM_DEAL_1712138182738: number; // Количество мест
    UF_CRM_DEAL_1712138239034: number; // Вид договора
    OPPORTUNITY: number; // Цена в рублях
    // UF_CRM_DEAL_1712138296842: number; // Цена в рублях
    UF_CRM_DEAL_1712138336714: string; // Реквизиты
    UF_CRM_DEAL_1712138395258: number[]; // Площадки для публикаций
    UF_CRM_DEAL_1712138457130: 'Y' | 'N'; // Требуется ли техническое сопровождение
    UF_CRM_DEAL_1712138504154: string; // Комментарии
    UF_CRM_DEAL_1712138530562: string; // Что будет происходить
    UF_CRM_1714648360: string; // ФИО
    ASSIGNED_BY_ID: 1762;
    CREATED_BY: number;
    UF_CRM_DEAL_1712137787958: string;
    UF_CRM_1714654129: string;
    UF_CRM_1715150460: number[];
}

interface ListSection {
    ID: string;
    TIMESTAMP_X: string;
    MODIFIED_BY: string;
    DATE_CREATE: string;
    CREATED_BY: string;
    IBLOCK_ID: string;
    IBLOCK_SECTION_ID: string | null;
    ACTIVE: string;
    GLOBAL_ACTIVE: string;
    SORT: string;
    NAME: string;
    PICTURE: string | null;
    LEFT_MARGIN: string;
    RIGHT_MARGIN: string;
    DEPTH_LEVEL: string;
    DESCRIPTION: string | null;
    DESCRIPTION_TYPE: string;
    SEARCHABLE_CONTENT: string;
    CODE: string | null;
    XML_ID: string | null;
    TMP_ID: string | null;
    DETAIL_PICTURE: string | null;
    SOCNET_GROUP_ID: string | null;
    LIST_PAGE_URL: string | null;
    SECTION_PAGE_URL: string | null;
    IBLOCK_TYPE_ID: string;
    IBLOCK_CODE: string | null;
    IBLOCK_EXTERNAL_ID: string | null;
    EXTERNAL_ID: string | null;
}

// Тип данных для ответа от API
interface ListSectionsResponse {
    result: ListSection[];
    total: number;
    time: {
        start: number;
        finish: number;
        duration: number;
        processing: number;
        date_start: string;
        date_finish: string;
    };
}

interface ListElement {
    ID: string;
    IBLOCK_ID: string;
    NAME: string;
    IBLOCK_SECTION_ID: string;
    CREATED_BY: string;
    BP_PUBLISHED: string;
    CODE: string | null;
    PROPERTY_316: { [key: string]: string };
    PROPERTY_317: { [key: string]: string };
    PROPERTY_318: { [key: string]: string };
}

// Тип данных для ответа от API
interface ListElementsResponse {
    result: ListElement[];
    total: number;
    time: {
        start: number;
        finish: number;
        duration: number;
        processing: number;
        date_start: string;
        date_finish: string;
    };
}

// Тип данных для ответа от API
interface ProcessedElement {
    id: number;
    title: string;
    sectionId: string;

}

// Тип данных для ответа от API
interface ProcessedListSection {
    id: number;
    title: string;
}