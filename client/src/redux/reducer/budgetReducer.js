import { ADD_BUDGET, BUDGETS_LOADING, GET_BUDGETS } from "../actions/types";

const initialState = {
	egressList: [],
	incomeList: [],
	budgetLoading: false,
};

const budgetReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUDGETS_LOADING:
			return {
				...state,
				budgetLoading: true,
			};
		case GET_BUDGETS:
			let egressList = action.payload.results.filter(
				(element) => element.type === "egress"
			);
			let incomeList = action.payload.results.filter(
				(element) => element.type === "income"
			);
			return {
				...state,
				egressList: state.egressList.concat(egressList),
				incomeList: state.incomeList.concat(incomeList),
				budgetLoading: false,
			};
		default:
			break;
	}
};
