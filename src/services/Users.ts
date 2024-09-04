import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {User} from "../types";

const fetchUsers = async (): Promise<User[]> => {
    let allUsers: User[] = [];
    let start = 0;
    let hasMore = true;
    const endpoint = 'https://intranet.bakhrushinmuseum.ru/rest/3/ynm1gnbjjm2kf4vk/user.get';

    while (hasMore) {
        const params = {start, filter: {user_type: 'employee', active: true}};
        const response = await axios.get(endpoint, {params});
        const users = response.data.result.map((user: any) => ({
            id: parseInt(user.ID),
            fullName: `${user.NAME} ${user.LAST_NAME}`,
            avatarUrl: user.PERSONAL_PHOTO
        }));

        allUsers = allUsers.concat(users);
        start += 50; // или число возвращаемых записей, если оно известно
        hasMore = users.length === 50; // предполагаем, что если пришло меньше 50 пользователей, это последняя страница
    }

    return allUsers;
};

const useUsers = () => useQuery({queryKey: ['users'], queryFn: fetchUsers});

export {useUsers};
