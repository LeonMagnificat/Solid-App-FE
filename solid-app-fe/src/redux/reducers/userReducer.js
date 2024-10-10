import { produce } from "immer";

const initialState = {
  addedUser: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    group: [],
    contributions: [],
    admins: [],
    id: "",
  },
  accessToken: "",
  isAuthenticated: "",
  UserData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    group: [],
    contributions: [],
    admins: [],
    id: "",
  },
  groups: [],
  contributions: [],
  members: [],
  tasks: [],
  darkMode: false,
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_USER":
        localStorage.setItem("token", action.payload.accessToken);
        draft.addedUser = action.payload.user;
        draft.accessToken = action.payload.accessToken;
        draft.isAuthenticated = true;
        break;
      case "GET_USER_DATA":
        draft.UserData = action.payload;
        draft.groups = action.payload.group;
        draft.contributions = action.payload.contributions;
        draft.members = action.payload.group.reduce((members, group) => {
          members.push(...group.members);
          return members;
        }, []);
        draft.tasks = action.payload.group.reduce((tasks, group) => {
          tasks.push(...group.tasks);
          return tasks;
        }, []);
        break;
      case "DE_AUTHENTICATION":
        draft.isAuthenticated = action.payload;
        break;
      case "DARK_MODE":
        draft.darkMode = action.payload;
        break;
      default:
        return state;
    }
  });
};

export default userReducer;
