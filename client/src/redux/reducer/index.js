import { combineReducers } from "redux";
import budgetReducer from "./pokemonReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

const rootReducers = combineReducers({
	budget: budgetReducer,
	auth: authReducer,
	error: errorReducer,
});

export default rootReducers;
