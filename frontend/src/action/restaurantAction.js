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
	CLEAR_ERRORS,
} from "../constants/restaurantConstants";
import axios from "axios";

export const restaurantRegister = (userData) => async (dispatch) => {
	try {
		// console.warn(userData);
		dispatch({ type: REGISTER_RESTAURANT_REQUEST });
		const config = {
			headers: { "Content-Type": "application/json" },
		};
		// console.warn("before axios url call");

		const { data } = await axios.post(
			`/api/v1/restaurant/register`,
			userData,
			config
		);
		console.warn("after axios url call");

		// console.table(data);

		dispatch({ type: REGISTER_RESTAURANT_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: REGISTER_RESTAURANT_FAIL,
			payload: error.response.data.message,
		});
	}
};

//get All restaurants
export const getAllRestaurants = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_RESTAURANT_REQUEST });

		const { data } = await axios.get(`/api/v1/admin/restaurants`);
		dispatch({ type: ALL_RESTAURANT_SUCCESS, payload: data.restaurants });
	} catch (error) {
		dispatch({
			type: ALL_RESTAURANT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// get Restaurant details
export const loadRestaurant = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_RESTAURANT_REQUEST });

		const { data } = await axios.get(`/api/v1/restaurant/me`);
		dispatch({ type: LOAD_RESTAURANT_SUCCESS, payload: data.restaurant });
	} catch (error) {
		dispatch({
			type: LOAD_RESTAURANT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteRestaurant = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_RESTAURANT_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/restaurant/${id}`);

		dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: DELETE_RESTAURANT_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
