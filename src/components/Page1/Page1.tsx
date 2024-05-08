import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Snackbar, Step, StepButton, Stepper,
    TextField,
    TextareaAutosize,
    Typography
} from "@mui/material"
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import axios from "axios"
import CheckIcon from '@mui/icons-material/Check';
import 'dayjs/locale/ru'
import React, {useEffect, useState} from "react"
import {useRecoilState, useRecoilValue} from "recoil"
import {Month, WeekDay} from "../../consts"
import {useUserFields} from "../../services/UserFields"
import {useUsers} from "../../services/Users"
import {
    additionalTech, ageEventState, ageState,
    commentsState,
    contractState,
    costState,
    dateFromState,
    dateToState,
    departmentEventState,
    departmentState,
    descriptionState,
    durationState,
    eventTypeState,
    fioState,
    placesState,
    publishEventState,
    publishState,
    requisitesState,
    roomEventState,
    roomsState,
    techState,
    titleState,
    todoState,
    typeContractEventState,
    typeEventState,
    userState
} from "../../store/atoms"
import {DealFields} from "../../types"
import styles from './Page1.module.scss'
import dayjs from "dayjs";

const steps = ['Мероприятие', 'Дополнительная информация', 'Договор'];

export default function Page1() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [local, setLocal] = useState<boolean>(false);

    const handleRes = () => {
        setAge([]);
        setAddTech('');
        setFio('');
        setTech(false);
        setTodo('');
        setComments('');
        setPublish([]);
        setRequisites('');
        setCost('');
        setContract(null);
        setPlaces('');
        setRooms([]);
        setDepartment(null);
        setDuration('');
        setEventType(null);
        setDateTo(dayjs().add(14, 'day'));
        setDateFrom(dayjs());
        setDescription('');
        setTitle('');
        setSelectedUsers([])
        setActiveStep(0);
    };

    const handleRepeat = () => {
        setActiveStep(0);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const paramValue = searchParams.get('local');
        const user = searchParams.get('user');
        if (paramValue == 'true') {
            setLocal(true);
        }
        if (user) {
            setSelectedUsers([Number(user)]);
        }
    }, []);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

// Вызов функции добавления сделки

    const typeEvent = useRecoilValue(typeEventState);
    const typeDepartment = useRecoilValue(departmentEventState);
    const typeRooms = useRecoilValue(roomEventState);
    const typeContract = useRecoilValue(typeContractEventState);
    const typePublish = useRecoilValue(publishEventState);
    const typeAge = useRecoilValue(ageEventState);


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
    const [fio, setFio] = useRecoilState(fioState)
    const [description, setDescription] = useRecoilState(descriptionState)
    const [addTech, setAddTech] = useRecoilState(additionalTech)
    const [age, setAge] = useRecoilState(ageState);

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    useEffect(() => {
        // Найдите разницу между датами в минутах
        const minutesDifference = dateTo.diff(dateFrom, 'minute');

// Разделите минуты на 60 для вычисления часов
        const hours = Math.floor(minutesDifference / 60);

// Остаток минут после вычисления часов
        const minutes = minutesDifference % 60;
        setDuration(`${hours} часов ${minutes} минут`);
    }, [dateFrom, dateTo]);


    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();

    // Determining if the current step is valid
    const isStepValid = (): boolean => {
        switch (activeStep) {
            case 0:
                return (selectedUsers.length === 0 && fio === '') || title === '' || description === '' || eventType === null;
            case 1:
                return todo === '' || department === null || rooms.length === 0 || places === '' || cost === '';
            case 2:
                return requisites === '' || contract === null;
            default:
                return false;
        }
    };


    const handleNext = () => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };


// Данные для новой сделки
    const dealData: DealFields = {
        TITLE: title,
        CATEGORY_ID: 7,
        STAGE_ID: 'new',
        UF_CRM_1714583071: selectedUsers,
        UF_CRM_DEAL_1712137850471: dateFrom.format('YYYY-MM-DD HH:mm'),
        UF_CRM_DEAL_1712137877584: dateTo.format('YYYY-MM-DD HH:mm'),
        UF_CRM_DEAL_1712137914328: eventType ? eventType.id : 0,
        UF_CRM_1714663307: duration ? duration : '',
        UF_CRM_DEAL_1712138052482: department ? department.id : 0,
        UF_CRM_DEAL_1712138132003: rooms.map((el) => el.id),
        UF_CRM_DEAL_1712138182738: places !== '' ? places : 0,
        UF_CRM_DEAL_1712138239034: contract ? contract.id : 0,
        OPPORTUNITY: cost !== '' ? cost : 0,
        UF_CRM_DEAL_1712138336714: requisites,
        UF_CRM_DEAL_1712138395258: publish.map((el) => el.id),
        UF_CRM_DEAL_1712138457130: tech ? 'Y' : 'N',
        UF_CRM_DEAL_1712138504154: comments,
        UF_CRM_DEAL_1712138530562: todo,
        UF_CRM_1714648360: fio,
        ASSIGNED_BY_ID: 1762,
        CREATED_BY: selectedUsers[0],
        UF_CRM_DEAL_1712137787958: description,
        UF_CRM_1714654129: addTech,
        UF_CRM_1715150460: age.map((el) => el.id),
    };

// Функция для отправки запроса
    const addDeal = async () => {
        try {
            setLoading(true)
            const response = await axios.post('https://intranet.gctm.ru/rest/1552/0ja3gbkg3kxex6aj/crm.deal.add', {
                fields: dealData
            });
            handleOpen();
            setLoading(false);
            setActiveStep(activeStep + 1)
        } catch (error) {
            console.error('Ошибка при добавлении сделки:', error);
        }
    }

    const {data} = useUserFields()
    if (error) return <h1>Ошибка загрузки пользователей</h1>

    return <Box sx={{width: '100%'}}>
        <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                    <StepButton color="inherit"
                                style={index === 0 ? {padding: '16px', paddingLeft: '12px'} : {padding: '16px'}}>
                        {label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
        <div>
            {allStepsCompleted() ? (
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div style={{margin: '20px 0'}}>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                            <h1 style={{margin: '0 auto'}}>
                                {
                                    steps[activeStep]
                                }
                            </h1>
                        </div>
                        {
                            activeStep === 0 && <div className={styles.root}>
                                {
                                    local ? (users && <Autocomplete
                                        id={'UF_CRM_1714583071'}
                                        renderInput={(params) => <TextField {...params} label="Сотрудники*"/>}
                                        multiple
                                        sx={{width: '100%'}}
                                        value={users ? users?.filter(user => selectedUsers.includes(user.id)) : []}
                                        onChange={(e, users) => {
                                            setSelectedUsers([...users.map(user => user.id)]);
                                        }}
                                        options={users}
                                        getOptionLabel={(option) => option.fullName}
                                        renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                                            <img alt={option.fullName} loading="lazy"
                                                 src={option.avatarUrl ?? 'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'}
                                                 style={{
                                                     width: '20px',
                                                     height: '20px',
                                                     borderRadius: '50%',
                                                     marginRight: '10px'
                                                 }}/>
                                            {option.fullName}</Box>}
                                    />) : <TextField
                                        label="Введите ваше ФИО"
                                        value={fio}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setFio(event.target.value);
                                        }}
                                    />
                                }


                                <div className={styles.date}>
                                    <Autocomplete
                                        id={'UF_CRM_DEAL_1712137914328'}
                                        renderInput={(params) => <TextField {...params} label="Тип события*"/>}
                                        sx={{width: '48%'}}
                                        value={eventType}
                                        onChange={(e, type) => {
                                            setEventType(type);
                                        }}
                                        options={typeEvent}
                                        getOptionLabel={(option) => option.title}
                                        renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                                            {option.title}</Box>}
                                    />

                                    <div style={{width: '48%'}}>
                                        <Autocomplete
                                            renderInput={(params) => <TextField {...params} label="Возрастной рейтинг*"/>}
                                            sx={{width: '100%'}}
                                            value={age}
                                            multiple
                                            onChange={(e, age) => {
                                                setAge([...age]);
                                            }}
                                            options={typeAge}
                                            getOptionLabel={(option) => option.title}
                                            renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                                                {option.title}</Box>}
                                        />

                                    </div>
                                </div>

                                <TextField
                                    id={'TITLE'}
                                    label="Введите название мероприятия*"
                                    value={title}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setTitle(event.target.value);
                                    }}
                                />
                                <div className={styles.date}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
                                        <DateTimePicker
                                            // id={'UF_CRM_DEAL_1712137850471'}
                                            ampm={false}
                                            views={['month', 'day', 'hours', 'minutes']}
                                            sx={{width: '48%'}}
                                            maxDateTime={dateTo}
                                            label={`Дата начала* - ${dateFrom.date()} ${Month[dateFrom.month()]} ${dateFrom.year()} ${WeekDay[dateFrom.day()]}`}
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
                                            // id={'UF_CRM_DEAL_1712137877584'}
                                            ampm={false}
                                            views={['month', 'day', 'hours', 'minutes']}
                                            sx={{width: '48%'}}
                                            minDateTime={dateFrom}
                                            label={`Дата окончания* - ${dateTo.date()} ${Month[dateTo.month()]} ${dateTo.year()} ${WeekDay[dateTo.day()]}`}
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
                                </div>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <Typography style={{margin: 0}}>{`Продолжительность `}</Typography>
                                    <Typography style={{width: '48%'}}>{duration}</Typography></div>
                                <div className={styles.row}>
                                    <p>{'Описание мероприятия*'}</p>
                                    <TextareaAutosize
                                        placeholder={''}
                                        minRows={5}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                            </div>
                        }

                        {
                            activeStep === 1 && <div className={styles.root}>

                                <div className={styles.date}>
                                    <Autocomplete
                                        renderInput={(params) => <TextField {...params} label="Место проведения*"/>}
                                        sx={{width: '48%'}}
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
                                        renderInput={(params) => <TextField {...params} label="Используемые залы*"/>}
                                        sx={{width: '48%'}}
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
                                </div>

                                <div className={styles.date}>
                                    <TextField
                                        sx={{width: '48%'}}
                                        type="number"
                                        label="Количество мест*"
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

                                    <TextField
                                        sx={{width: '48%'}}

                                        type="number"
                                        label="Цена билета*"
                                        variant="outlined"
                                        value={cost}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = event.target.value;
                                            setCost(value === "" ? value : Number(value));
                                        }}
                                        inputProps={{
                                            step: 1,  // Минимальный шаг изменения значения
                                            min: 0,   // Минимальное значение
                                            max: 10000  // Максимальное значение
                                        }}
                                    />
                                </div>
                                <div className={styles.row}>
                                    <p>{'Что будет происходить*'}</p>
                                    <TextareaAutosize
                                        placeholder={''}
                                        minRows={5}
                                        value={todo}

                                        onChange={(e) => setTodo(e.target.value)}
                                    />
                                </div>

                                <div className={styles.row}>
                                    <p>{'Комментарии'}</p>
                                    <TextareaAutosize
                                        placeholder={''}
                                        minRows={5}
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                    />
                                </div>


                                <div className={styles.checkbox}>
                                    <Checkbox
                                        sx={{width: '8%'}}
                                        checked={tech}
                                        onChange={() => setTech(!tech)}
                                        inputProps={{'aria-label': 'controlled'}}
                                    />
                                    <p>Требуется ли техническое сопровождение</p>
                                </div>
                                {
                                    tech && <div className={styles.row}>
                                        <p>{'Что требуется'}</p>
                                        <TextareaAutosize
                                            placeholder={''}
                                            minRows={5}
                                            value={addTech}
                                            onChange={(e) => setAddTech(e.target.value)}
                                        />

                                    </div>
                                }

                            </div>
                        }
                        {
                            activeStep === 2 && <div className={styles.root}>


                                <div className={styles.date}>
                                    <Autocomplete
                                        renderInput={(params) => <TextField {...params} label="Вид договора*"/>}
                                        sx={{width: '48%'}}
                                        value={contract}
                                        onChange={(e, type) => {
                                            setContract(type);
                                        }}
                                        options={typeContract}
                                        getOptionLabel={(option) => option.title}
                                        renderOption={(props, option) => <Box component="li" {...props} key={option.id}>
                                            {option.title}</Box>}
                                    />
                                    <Autocomplete
                                        renderInput={(params) => <TextField {...params}
                                                                            label="Площадки для публикации"/>}
                                        sx={{width: '48%'}}
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
                                </div>
                                <div className={styles.row}>
                                    <p>{'Реквизиты*'}</p>
                                    <TextareaAutosize
                                        placeholder={''}
                                        minRows={5}
                                        value={requisites}

                                        onChange={(e) => setRequisites(e.target.value)}
                                    />
                                </div>
                            </div>
                        }

                    </div>


                    {
                        (activeStep === steps.length - 1) &&
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                disabled={isStepValid() || loading}
                                onClick={addDeal}
                                sx={{width: '40%'}}
                                variant="contained">
                                {
                                    loading ? 'Идет отправка' : 'Отправить'
                                }
                            </Button>
                        </div>
                    }

                    {
                        activeStep === 3 && <div style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            height: '300px',
                            width: '300px',
                            background: '#EDF7ED',
                            margin: '0 auto',
                            borderRadius: '10px',
                            flexDirection: 'column',
                            paddingBottom: '9%'
                        }}>
                            <div style={{transform: 'scale(2.5)'}}>
                                <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"
                                >
                                    <circle className={styles.checkmarkCircle} cx="25" cy="25" r="25" fill="none"/>
                                    <path className={styles.checkmarkCeck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                    <circle cx="25" cy="25" r="22" pathLength="1"
                                            className={`${styles.rollerIndicator}`}></circle>
                                </svg>
                            </div>
                            <Typography color={'green'} sx={{textAlign: 'center', marginTop: '20%'}}>Мероприятие успешно
                                зарегистрировано</Typography>
                        </div>
                    }


                    {
                        activeStep !== 3 ? <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            {
                                (activeStep !== 0) && <Button
                                    variant={'outlined'}
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                Назад
                                </Button>
                            }
                            <Box sx={{flex: '1 1 auto'}}/>
                            {
                                ((steps.length - 1) !== activeStep) && <Button
                                    variant={'outlined'}
                                    onClick={handleNext}
                                    sx={{mr: 1}}
                                    disabled={isStepValid() || ((steps.length - 1) === activeStep)}>
                                    Далее
                                </Button>
                            }
                        </Box> : <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            {
                                 <Button
                                    variant={'outlined'}
                                    color="inherit"
                                    onClick={handleRes}
                                    sx={{mr: 1}}
                                 >
                                    Создать новое мероприятие
                                </Button>
                            }
                            <Box sx={{flex: '1 1 auto'}}/>
                            {
                                (steps.length - 1 !== activeStep) && <Button
                                    variant={'outlined'}
                                    onClick={handleRepeat}
                                    sx={{mr: 1}}
                                    disabled={isStepValid() || ((steps.length - 1) === activeStep)}>
                                    Повторить текущее мероприятие
                                </Button>
                            }
                        </Box>
                    }
                </React.Fragment>
            )}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                Мероприятие успешно зарегистрировано
            </Alert>
        </Snackbar>
    </Box>
}