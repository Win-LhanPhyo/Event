import axios from "axios";
import { Events } from "../domain/eventList";

const baseURL = "http://localhost:8000/api/";

export const getEventsList = async (): Promise<Events> => {
    try {
        const response = await axios.get<Events>(
            baseURL + 'event/list'
        );
        console.log("response from axios", response.data);
        return response.data;
    } catch (e) {
        console.error(e);
    }
    return { total: 0, data: [] };
};