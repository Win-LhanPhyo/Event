import axios from "axios";
import { Users } from "../domain/userList";

const baseURL = "http://localhost:8000/api/";

export const getUserList = async (): Promise<Users> => {
    try {
        const response = await axios.get<Users>(
            baseURL + 'user/list'
        );
        console.log("response from axios", response.data);
        return response.data;
    } catch (e) {
        console.error(e);
    }
    return { total: 0, data: [] };
};