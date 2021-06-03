const RESPONSE = "RESPONSE";

const handlers = {
  [RESPONSE]: (state, { payload }) => ({
    ...state,
    data: payload,
  }),
  DEFAULT: (state) => state,
};

export const cvReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
