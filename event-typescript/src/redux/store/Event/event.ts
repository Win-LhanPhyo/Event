import { atom, selector } from "recoil";
import { Events } from "../../domain/eventList";
import { getEventsList } from "../../actions/events";

export const eventState = atom<Events>({
    key: "eventState",
    default: selector<Events>({
        key: "initialEventSelector",
        get: async () => {
            return await getEventsList();
        },
    }),
});