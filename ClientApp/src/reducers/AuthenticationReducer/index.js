import { AUTHENICATION_CONSTANTS, USERS_CONSTANTS } from "../../actions";

const defaultState = {
  user: {
    isLoggedIn: "",
    id: "",
    username: "",
    gender: "",
    age: "",
    knownAs: "",
    created: "",
    lastActive: "",
    introduction: "",
    interests: "",
    lookingFor: "",
    city: "",
    country: "",
    photoUrl: "",
    photos: [],
    isLoggedIn: false,
  },
};
const Authentication = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENICATION_CONSTANTS.SET_USER:
      return {
        ...state,
        user: {
          isLoggedIn: true,
          photos: [...action.user.photos],
          ...action.user,
        },
      };
    case AUTHENICATION_CONSTANTS.LOGOUT:
      return {
        ...state,
        user: {
          isLoggedIn: "",
          id: "",
          username: "",
          gender: "",
          age: "",
          knownAs: "",
          created: "",
          lastActive: "",
          introduction: "",
          interests: "",
          lookingFor: "",
          city: "",
          country: "",
          photoUrl: "",
          photos: [],
          isLoggedIn: false,
        },
      };

    case USERS_CONSTANTS.SET_MAIN_PHOTO: {
      const newPhotos = state.user.photos
        .map((x) => {
          if (x.isMain) {
            return { ...x, isMain: false };
          }
          return x;
        })
        .map((y) => {
          if (y.id === action.id) {
            return { ...y, isMain: true };
          }
          return y;
        });

      return {
        ...state,
        user: {
          ...state.user,
          photos: [...newPhotos],
        },
      };
    }

    default:
      return state;
  }
};

export default Authentication;
