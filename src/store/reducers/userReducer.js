import * as actionTypes from '../actionTypes';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN: {
            console.log(action);
            return action.payload;
        }
        default:
            return state;
    }
}

export default userReducer;
