import { atom, selector } from "recoil";
import { Users } from "../../domain/userList";
import { getUserList } from "../../actions/users";

export const userState = atom<Users>({
    key: "userState",
    default: selector<Users>({
        key: "initialUserSelector",
        get: async () => {
            return await getUserList();
        },
    }),
});