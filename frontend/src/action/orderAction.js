import {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAIL,
	MY_ORDER_SUCCESS,
	MY_ORDER_REQUEST,
	MY_ORDER_FAIL,
	ALL_ORDER_REQUEST,
	ALL_ORDER_SUCCESS,
	ALL_ORDER_FAIL,
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_FAIL,
	DELETE_ORDER_REQUEST,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/orderConstants";
import axios from "axios";
// Create Order

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: CREATE_ORDER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.post("/api/v1/order/new", order, config);
		dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CREATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//My orders

export const myOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: MY_ORDER_REQUEST });

		const { data } = await axios.get("/api/v1/orders/me");
		dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
	} catch (error) {
		dispatch({
			type: MY_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Get orders Details

export const orderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });
		console.log(id);

		const { data } = await axios.get(`/api/v1/order/${id}`);
		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Get All orders(ADMIN)

export const getAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ALL_ORDER_REQUEST });

		const { data } = await axios.get("/api/v1/admin/orders");
		dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
	} catch (error) {
		dispatch({
			type: ALL_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Get All orders(Restaurant)

export const getAllOrdersRes = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ALL_ORDER_REQUEST });

		const { data } = await axios.get("/api/v1/restaurant/orders");
		dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
	} catch (error) {
		dispatch({
			type: ALL_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Update Order(admin)

export const updateOrder = (id, order) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_ORDER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.put(
			`/api/v1/admin/order/${id}`,
			order,
			config
		);
		dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Update Order(restaurant)

export const updateOrderRes = (id, order) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_ORDER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const { data } = await axios.put(
			`/api/v1/restaurant/order/${id}`,
			order,
			config
		);
		dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Delete Order (admin)
export const deleteOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_ORDER_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
		dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: DELETE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Delete Order (restaurant)
export const deleteOrderRes = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_ORDER_REQUEST });

		const { data } = await axios.delete(`/api/v1/restaurant/order/${id}`);
		dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: DELETE_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
