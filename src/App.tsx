import React, {useEffect} from 'react';
import styles from './App.module.scss'
import Page1 from "./components/Page1/Page1";
import {useUsers} from "./services/Users";
import {
    departmentEventState,
    publishEventState,
    roomEventState,
    typeContractEventState,
    typeEventState
} from "./store/atoms";
import {useRecoilState} from "recoil";
import {useUserFields} from "./services/UserFields";

function App() {
    const {data: userFields, isLoading, error} = useUserFields();

    const [ typeEvent, setTypeEvent] = useRecoilState(typeEventState);
    const [ departments, setDepartments] = useRecoilState(departmentEventState);
    const [ rooms, setRooms] = useRecoilState(roomEventState);
    const [contract, setContract] = useRecoilState(typeContractEventState)
    const [publish, setPublish] = useRecoilState(publishEventState)
    useEffect(() => {
        if (!error && userFields) {
            userFields.forEach((element, index) => {
                if (element.id === 167 && element.list) setTypeEvent(element.list);
                if (element.id === 169 && element.list) setDepartments(element.list);
                if (element.id === 170 && element.list) setRooms(element.list);
                if (element.id === 172 && element.list) setContract(element.list);
                if (element.id === 175 && element.list) setPublish(element.list);
            });
            console.log('rooms')
            console.log(rooms)

        }
    }, [userFields]);
  return (
    <div className={styles.root}>
        <Page1/>
    </div>
  );
}

export default App;
