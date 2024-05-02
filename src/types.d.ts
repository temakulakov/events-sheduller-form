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
    STAGE_ID: string;
    COMPANY_ID: number;
    CONTACT_ID: number;
    OPENED: string;
    ASSIGNED_BY_ID: number;
    PROBABILITY: number;
    CURRENCY_ID: string;
    OPPORTUNITY: number;
}