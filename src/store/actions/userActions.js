import * as actionTypes from '../actionTypes';

export const signin = (user) => ({
    type: actionTypes.SIGN_IN,
    payload: {
        user
    }
});
