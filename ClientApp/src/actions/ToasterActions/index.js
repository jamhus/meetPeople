export const TOASTER_TYPE_CONSTANTS = {
  SUCCESS: "SUCCESS",
  DANGER: "DANGER",
};

export const TOASTER_CONSTANTS = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
};

export const closeToaster = () => ({
  type: TOASTER_CONSTANTS.CLOSE,
});

export const openToaster = (headerMessage, bodyMessage, type) => ({
  type: TOASTER_CONSTANTS.OPEN,
  payload: {
    headerMessage,
    bodyMessage,
    type,
  },
});
