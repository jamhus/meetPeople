export const fetchValues = (values) => ({
  type: VALUES_CONSTANTS.FETCH_VALUES,
  values,
});

export const VALUES_CONSTANTS = {
  FETCH_VALUES: "FETCH_VALUES",
  GET_VALUES: "GET_VALUES",
};

export const getValues = () => async (dispatch) => {
  dispatch({ type: VALUES_CONSTANTS.GET_VALUES });
  try {
    const data = await fetch("/api/values").then((res) => res.json());
    dispatch(fetchValues(data));
  } catch (error) {
    console.log(error);
  }
};
