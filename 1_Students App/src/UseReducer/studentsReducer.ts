export const initialState = {
    studentsList: [],
    totalAbsents: 0
  };
  
  export const studentsReducer = (state, action) => {
    switch (action.type) {
      case 'SET_INITIAL_STATE':
        return {
          studentsList: action.payload,
          totalAbsents: action.payload.reduce((prev, cur) => prev + cur.absents, 0)
        };
  
      case 'ADD_STUDENT':
        return {
          ...state,
          studentsList: [action.payload, ...state.studentsList]
        };
  
      case 'REMOVE_FIRST':
        return {
          ...state,
          studentsList: state.studentsList.slice(1),
          totalAbsents: state.totalAbsents - (state.studentsList[0]?.absents || 0)
        };
  
      case 'UPDATE_ABSENT':
        return {
          studentsList: state.studentsList.map(std => 
            std.id === action.payload.id 
              ? { ...std, absents: std.absents + action.payload.change }
              : std
          ),
          totalAbsents: state.totalAbsents + action.payload.change
        };
  
      default:
        return state;
    }
  };