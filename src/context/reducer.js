export const reducer = (state, action) => {
  switch (action.type) {
    case 'updateLogoProps': 
      return { ...state, logoProps: { ...action.payload } };
    default: 
      return state;
  }
};
