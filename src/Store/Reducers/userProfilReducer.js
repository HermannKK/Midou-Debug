const initialState = {
  userProfil: {
    username: null,
    user_photo: null,
    user_email: null,
    user_phoneNumber: null,
    is_cooker: null,
    user_id: null,
    pushToken: null
  }
};

function updateProfil(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "CHANGE_USERNAME":
      nextState = {
        ...state,
        userProfil: { ...state.userProfil, username: action.value }
      };
      return nextState || state;
    case "CHANGE_USEREMAIL":
      nextState = {
        ...state,
        userProfil: { ...state.userProfil, user_email: action.value }
      };
      return nextState || state;
    case "CHANGE_PHOTOPROFIL":
      nextState = {
        ...state,
        userProfil: { ...state.userProfil, user_photo: action.value }
      };
      return nextState || state;
    case "CHANGE_COOKERSTATUS":
      nextState = {
        ...state,
        userProfil: { ...state.userProfil, is_cooker: action.value }
      };
      return nextState || state;
    case "CHANGE_ALL":
      nextState = {
        ...state,
        userProfil: {...state.userProfil,...action.value}
      };
      return nextState || state;
    default:
      return state;
  }
}

export default updateProfil;

export const changeUserdataInGlobal = (type, value, gProps) => {
  const action = { type: type, value: value };
  gProps.dispatch(action);
};
