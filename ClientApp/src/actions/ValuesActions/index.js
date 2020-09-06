import { toggleLoading } from "../LoadingActions";

export const fetchValues = (values) => ({
  type: VALUES_CONSTANTS.FETCH_VALUES,
  values,
});

export const VALUES_CONSTANTS = {
  FETCH_VALUES: "FETCH_VALUES",
  GET_VALUES: "GET_VALUES",
};

export const getValues = () => async (dispatch) => {
  dispatch(toggleLoading(true));
  try {
    const data = await fetch("/api/values").then((res) => res.json());
    dispatch(fetchValues(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(toggleLoading(false));
};
