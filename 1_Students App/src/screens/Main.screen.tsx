import { useEffect, useRef, useReducer } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import useLocalStorage from "../hooks/local-storage.hook";
import { studentsReducer, initialState } from "../UseReducer/studentsReducer";
import { IStudent } from "../types";
import React from "react";

const Main = () => {
  const [state, dispatch] = useReducer(studentsReducer, initialState);

  const lastStdRef = useRef<HTMLDivElement>(null);
  const { storedData } = useLocalStorage(state.studentsList, 'students-list');

  useEffect(() => {
    if (storedData) {
      dispatch({ type: 'SET_INITIAL_STATE', payload: storedData });
    }
  }, [storedData]);

  const removeFirst = () => {
    dispatch({ type: 'REMOVE_FIRST' });
  };

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: 'UPDATE_ABSENT', payload: { id, change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: 'ADD_STUDENT', payload: newStudent });
  };

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AddForm className="addForm" onSubmit={handleAddStudent} />
      <div className='stats'>
        <button onClick={removeFirst}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>
          Total Absents {state.totalAbsents}
        </b>
      </div>
      {state.studentsList.map(student => (
        <Student
          key={student.id}
          id={student.id}
          name={student.name}
          age={student.age}
          absents={student.absents}
          isGraduated={student.isGraduated}
          coursesList={student.coursesList}
          onAbsentChange={handleAbsentChange}
        />
      ))}
      {}
      <div ref={lastStdRef}></div>
    </>
  );
};

export default Main;