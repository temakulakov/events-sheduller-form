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
    UF_CRM_DEAL_1712137990065: number; // Длительность
    UF_CRM_DEAL_1712138052482: number; // Отвественный отдел
    UF_CRM_DEAL_1712138132003: number[]; // Используемые залы
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
    ADDITIONAL_INFO: string;
    UF_CRM_1714654129: string;
}