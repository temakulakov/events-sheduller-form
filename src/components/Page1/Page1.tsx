import styles from './Page1.module.scss';
import React from "react";
import {Autocomplete, Box, Checkbox, TextareaAutosize, TextField, Typography} from "@mui/material";
import {useUsers} from "../../services/Users";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    costState,
    contractState,
    dateFromState,
    dateToState, departmentEventState,
    departmentState,
    durationState,
    eventTypeState, placesState, requisitesState, roomEventState, roomsState,
    titleState, typeContractEventState, typeEventState,
    userState, publishEventState, publishState, commentsState, todoState, techState
} from "../../store/atoms";
import 'dayjs/locale/ru';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Month, WeekDay} from "../../consts";
import {useUserFields} from "../../services/UserFields";


export default function Page1() {
    const typeEvent = useRecoilValue(typeEventState);
    const typeDepartment = useRecoilValue(departmentEventState);
    const typeRooms = useRecoilValue(roomEventState);
    const typeContract = useRecoilValue(typeContractEventState);
    const typePublish = useRecoilValue(publishEventState);


    const {data: users, error, isLoading} = useUsers();
    const [selectedUsers, setSelectedUsers] = useRecoilState(userState);
    const [title, setTitle] = useRecoilState(titleState);
    const [dateFrom, setDateFrom] = useRecoilState(dateFromState);
    const [dateTo, setDateTo] = useRecoilState(dateToState);
    const [eventType, setEventType] = useRecoilState(eventTypeState);
    const [duration, setDuration] = useRecoilState(durationState);
    const [department, setDepartment] = useRecoilState(departmentState);
    const [rooms, setRooms] = useRecoilState(roomsState);
    const [places, setPlaces] = useRecoilState(placesState);
    const [contract, setContract] = useRecoilState(contractState);
    const [cost, setCost] = useRecoilState(costState);
    const [requisites, setRequisites] = useRecoilState(requisitesState);
    const [publish, setPublish] = useRecoilState(publishState);
    const [comments, setComments] = useRecoilState(commentsState);
    const [todo, setTodo] = useRecoilState(todoState);
    const [tech, setTech] = useRecoilState(techState)



    const {data} = useUserFields()
    console.log(data)
    if (error) return <h1>Ошибка загрузки пользователей</h1>

    return <div className={styles.root}>
        {
            users ? <Autocomplete
                renderInput={(params) => <TextField {...params} label="Сотрудники"/>}
                multiple
                sx={{width: '500px'}}
                value={users ? users.filter(user => selectedUsers.includes(user.id)) : []}
                onChange={(e, users) => {
                    setSelectedUsers([...users.map(user => user.id)]);
                }}
                options={users}
                getOptionLabel={(option) => option.fullName}
                renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                    <img alt={option.fullName} loading="lazy"
                         src={option.avatarUrl ?? 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'}
                         style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '10px'}}/>
                    {option.fullName}</Box>}
            /> : <div/>
        }
        <TextField
            label="Введите название мероприятия"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
            }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
            <DateTimePicker
                ampm={false}
                views={['month', 'day', 'hours', 'minutes']}
                sx={{width: 350}}
                maxDateTime={dateFrom}
                label={`${dateFrom.date()} ${Month[dateFrom.month()]} ${dateFrom.year()} ${WeekDay[dateFrom.day()]}`}
                value={dateFrom} // Убедитесь, что selectedEvent?.DATE_FROM корректно обрабатывается
                onChange={(newValue) => {
                    setDateFrom((prev) => {
                        if (!prev || !newValue) return prev; // Возвращаем prev, если оно равно null или newValue равно null
                        return newValue;
                    });
                }}
                format="DD.MM.YYYY HH:mm"
            />
            <DateTimePicker
                ampm={false}
                views={['month', 'day', 'hours', 'minutes']}
                sx={{width: 350}}
                minDateTime={dateTo}
                label={`${dateTo.date()} ${Month[dateTo.month()]} ${dateTo.year()} ${WeekDay[dateTo.day()]}`}
                value={dateTo} // Убедитесь, что selectedEvent?.DATE_FROM корректно обрабатывается
                onChange={(newValue) => {
                    setDateTo((prev) => {
                        if (!prev || !newValue) return prev; // Возвращаем prev, если оно равно null или newValue равно null
                        return newValue;
                    });
                }}
                format="DD.MM.YYYY HH:mm"
            />
        </LocalizationProvider>
        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Тип события"/>}
            sx={{width: '500px'}}
            value={eventType}
            onChange={(e, type) => {
                setEventType(type);
            }}
            options={typeEvent}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                {option.title}</Box>}
        />
        <TextField
            type="number"
            label="Введите число"
            variant="outlined"
            value={duration}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setDuration(value === "" ? value : Number(value));
            }}
            inputProps={{
                step: 1,  // Минимальный шаг изменения значения
                min: 0,   // Минимальное значение
                max: 100  // Максимальное значение
            }}
        />
        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Ответственный отдел"/>}
            sx={{width: '500px'}}
            value={department}
            onChange={(e, type) => {
                setDepartment(type);
            }}
            options={typeDepartment}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                {option.title}</Box>}
        />

        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Используемые залы"/>}
            sx={{width: '500px'}}
            value={rooms}
            multiple
            onChange={(e, rooms) => {
                setRooms([...rooms]);
            }}
            options={typeRooms}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                {option.title}</Box>}
        />

        <TextField
            type="number"
            label="Количество мест"
            variant="outlined"
            value={places}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setPlaces(value === "" ? value : Number(value));
            }}
            inputProps={{
                step: 1,  // Минимальный шаг изменения значения
                min: 0,   // Минимальное значение
                max: 100  // Максимальное значение
            }}
        />

        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Вид договора"/>}
            sx={{width: '500px'}}
            value={contract}
            onChange={(e, type) => {
                setContract(type);
            }}
            options={typeContract}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                {option.title}</Box>}
        />

        <TextField
            type="number"
            label="Цена билета"
            variant="outlined"
            value={cost}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setCost(value === "" ? value : Number(value));
            }}
            inputProps={{
                step: 1,  // Минимальный шаг изменения значения
                min: 0,   // Минимальное значение
                max: 100  // Максимальное значение
            }}
        />

        <TextField
            label="Реквизиты"
            value={requisites}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setRequisites(event.target.value);
            }}
        />

        <Autocomplete
            renderInput={(params) => <TextField {...params} label="Площадки для публикации"/>}
            sx={{width: '500px'}}
            value={publish}
            multiple
            onChange={(e, publishes) => {
                setPublish([...publishes]);
            }}
            options={typePublish}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                {option.title}</Box>}
        />
        <TextareaAutosize
            label="Комментарии"
            value={comments}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setComments(event.target.value);
            }}
            minRows={3}
        />
        <TextField
            label="Что будет происходить"
            value={todo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTodo(event.target.value);
            }}
        />
        <div className={styles.checkbox}>
            <Checkbox
                sx={{width: '8%'}}
                checked={tech}
                onChange={() => setTech(!tech)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <p>Требуется ли техническое сопровождение</p>
        </div>
    </div>
}