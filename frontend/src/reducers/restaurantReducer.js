import {
	REGISTER_RESTAURANT_REQUEST,
	REGISTER_RESTAURANT_SUCCESS,
	REGISTER_RESTAURANT_FAIL,
	LOAD_RESTAURANT_REQUEST,
	LOAD_RESTAURANT_SUCCESS,
	LOAD_RESTAURANT_FAIL,
	ALL_RESTAURANT_REQUEST,
	ALL_RESTAURANT_SUCCESS,
	ALL_RESTAURANT_FAIL,
	DELETE_RESTAURANT_REQUEST,
	DELETE_RESTAURANT_SUCCESS,
	DELETE_RESTAURANT_FAIL,
	DELETE_RESTAURANT_RESET,
	UPDATE_RESTAURANT_REQUEST,
	UPDATE_RESTAURANT_SUCCESS,
	UPDATE_RESTAURANT_RESET,
	UPDATE_PROFILE_RES_FAIL,
	UPDATE_PROFILE_RES_REQUEST,
	UPDATE_PROFILE_RES_RESET,
	UPDATE_RESTAURANT_FAIL,
	UPDATE_PROFILE_RES_SUCCESS,
	CLEAR_ERRORS,
} from "../constants/restaurantConstants";

export const restaurantReducer = (state = { restaurant: {} }, action) => {
	switch (action.type) {
		case REGISTER_RESTAURANT_REQUEST:
		case LOAD_RESTAURANT_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};

		case REGISTER_RESTAURANT_SUCCESS:
		case LOAD_RESTAURANT_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				restaurant: action.payload,
			};

		case REGISTER_RESTAURANT_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				restaurant: null,
				error: action.payload,
			};
		case LOAD_RESTAURANT_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				restaurant: null,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

//All Restaurant

export const allRestaurantReducer = (state = { restaurants: [] }, action) => {
	switch (action.type) {
		case ALL_RESTAURANT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ALL_RESTAURANT_SUCCESS:
			return {
				...state,
				loading: false,
				restaurants: action.payload,
			};

		case ALL_RESTAURANT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const profileResReducer = (state = { restaurant: {} }, action) => {
	switch (action.type) {
		case UPDATE_PROFILE_RES_REQUEST:

		case UPDATE_RESTAURANT_REQUEST:
		case DELETE_RESTAURANT_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_PROFILE_RES_SUCCESS:

		case UPDATE_RESTAURANT_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_RESTAURANT_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload.success,
				message: action.payload.message,
			};

		case UPDATE_RESTAURANT_FAIL:
		case UPDATE_PROFILE_RES_FAIL:

		case DELETE_RESTAURANT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case UPDATE_PROFILE_RES_RESET:

		case UPDATE_RESTAURANT_RESET: {
			return {
				...state,
				isUpdated: false,
			};
		}
		case DELETE_RESTAURANT_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
