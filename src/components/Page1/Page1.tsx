import styles from './Page1.module.scss';
import React from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useUsers} from "../../services/Users";
import {useRecoilState} from "recoil";
import {
    dateFromState,
    dateToState,
    departmentState,
    durationState,
    eventTypeState,
    titleState,
    userState
} from "../../store/atoms";
import 'dayjs/locale/ru';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { Month, WeekDay} from "../../consts";
import {useUserFields} from "../../services/UserFields";


export default function Page1() {
    const {data: users, error, isLoading} = useUsers();
    const [selectedUsers, setSelectedUsers] = useRecoilState(userState);
    const [title, setTitle] = useRecoilState(titleState);
    const [dateFrom, setDateFrom] = useRecoilState(dateFromState);
    const [dateTo, setDateTo] = useRecoilState(dateToState);
    const [eventType, setEventType] = useRecoilState(eventTypeState);
    const [duration, setDuration] = useRecoilState(durationState);
    const [department, setDepartment] = useRecoilState(departmentState);

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
        {/*<Autocomplete*/}
        {/*    renderInput={(params) => <TextField {...params} label="Тип события"/>}*/}
        {/*    sx={{width: '500px'}}*/}
        {/*    value={eventType}*/}
        {/*    onChange={(e, type) => {*/}
        {/*        setEventType(type);*/}
        {/*    }}*/}
        {/*    options={TypeEvent}*/}
        {/*    getOptionLabel={(option) => option.title}*/}
        {/*    renderOption={(props, option) => <Box component="li" {...props} key={option.id}>*/}
        {/*        {option.title}</Box>}*/}
        {/*/>*/}
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
    {/*    <Autocomplete*/}
    {/*    renderInput={(params) => <TextField {...params} label="Ответственный отдел"/>}*/}
    {/*    sx={{width: '500px'}}*/}
    {/*    value={department}*/}
    {/*    onChange={(e, type) => {*/}
    {/*    setDepartment(type);*/}
    {/*}}*/}
    {/*    options={DepartmentEvents}*/}
    {/*    getOptionLabel={(option) => option.title}*/}
    {/*    renderOption={(props, option) => <Box component="li" {...props} key={option.id}>*/}
    {/*    {option.title}</Box>}*/}
    {/*    />*/}
    </div>
}