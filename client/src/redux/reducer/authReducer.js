import {
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
	USER_LOADING,
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: false,
	user: {},
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case USER_LOADED:
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS: {
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		}
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: null,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
