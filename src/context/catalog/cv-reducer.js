const RESPONSE = "RESPONSE";
const COLORS = "COLORS";

const handlers = {
  [RESPONSE]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  [COLORS]: (state, { payload }) => ({
    ...state,
    palette: payload,
  }),
  DEFAULT: (state) => state,
};

export const cvReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
