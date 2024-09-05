import React, {useEffect} from 'react';
import styles from './App.module.scss'
import Page1 from "./components/Page1/Page1";
import {
    ageEventState,
    departmentEventState,
    publishEventState,
    roomEventState, techState,
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
    const [contract, setContract] = useRecoilState(typeContractEventState);
    const [publish, setPublish] = useRecoilState(publishEventState);
    const [ age, setAge ] = useRecoilState(ageEventState);

    useEffect(() => {
        if (!error && userFields) {
            userFields.forEach((element, index) => {
                if (element.id === 129 && element.list) setTypeEvent(element.list);
                if (element.id === 131 && element.list) setDepartments(element.list);
                if (element.id === 132 && element.list) setRooms(element.list);
                if (element.id === 133 && element.list) setContract(element.list);
                if (element.id === 134 && element.list) setPublish(element.list);
                if (element.id === 144 && element.list) setAge(element.list);
            });

        }
    }, [userFields]);
  return (
    <div className={styles.root}>
        <Page1/>
    </div>
  );
}

export default App;
