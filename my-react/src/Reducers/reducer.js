import {
    GET_DATA_FROM_SERVER,
    //102 sortinimas pagal varda ir kaina
    //SORT_CLIENT_HEIGHT_ASC,
    //SORT_CLIENT_HEIGHT_DESC,
    //SORT_CLIENT_NAME_ASC,
   // SORT_CLIENT_NAME_DESC,
  } from "../Constants";
  //102
  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case GET_DATA_FROM_SERVER:
        newState = action.payload;
        break;
      default:
    }
  
    return newState; //paimam state sena ir po to ji paverciam i nauja newState
  }
  
  export default reducer;