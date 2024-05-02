import { atom } from 'recoil';
import {EventDepartment, EventRoom, EventType, User} from '../types';
import dayjs, {Dayjs} from "dayjs";

export const userState = atom<number[]>({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const titleState = atom<string>({
    key: 'titleState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const descriptionState = atom<string>({
    key: 'descriptionState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const dateFromState = atom<Dayjs>({
    key: 'dateFromState', // unique ID (with respect to other atoms/selectors)
    default: dayjs(), // default value (aka initial value)
});
export const dateToState = atom<Dayjs>({
    key: 'dateToState', // unique ID (with respect to other atoms/selectors)
    default: dayjs(), // default value (aka initial value)
});

export const eventTypeState = atom<EventType | null>({
    key: 'eventTypeState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

export const durationState = atom<number | "">({
    key: 'durationState', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
});

export const departmentState = atom<EventDepartment | null>({
    key: 'departmentState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});


// Массивы полей пользовательских типов crm

export const typeEventState = atom<EventType[]>({
    key: 'typeEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});


export const departmentEventState = atom<EventDepartment[]>({
    key: 'departmentEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const roomEventState = atom<EventType[]>({
    key: 'roomEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const typeContractEventState = atom<EventType[]>({
    key: 'typeContractEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const publishEventState = atom<EventType[]>({
    key: 'publishEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});