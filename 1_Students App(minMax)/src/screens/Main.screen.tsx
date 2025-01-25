import { useEffect, useRef, useState } from "react";
import Student from "../components/student/student.component";
import { IStudent } from "../types";

import { useSearchParams } from "react-router-dom";
import React from "react";

interface IProps {
  totalAbsents: number,
  studentsList: IStudent[],
  onAbsent: (id: string, change: number) => void,
  onRemove: () => void,
}

const COURSES_FILTERS = ['Math', 'HTML', 'CSS', 'OOP'];

const Main = (props: IProps) => {
  const { totalAbsents, studentsList } = props;

  const [filteredList, setFilteredList] = useState<IStudent[]>(studentsList);
  const [params, setParams] = useSearchParams();
  const lastStdRef = useRef<HTMLDivElement>(null);

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    let tempList = [...studentsList];

    // Name search filter
    const query = params.get('q') || '';
    if (query) {
      tempList = tempList.filter(std => std.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Graduation status filter
    const graduated = params.get('graduated');
    if (graduated === 'grad') {
      tempList = tempList.filter(std => std.isGraduated);
    } else if (graduated === 'non-grad') {
      tempList = tempList.filter(std => std.isGraduated == false);
    }

    const courses = params.getAll('courses');
    if (courses.length) {
      tempList = tempList.filter(std => courses.every(c => (std.coursesList.includes(c))));
    }

    const minAbs = params.get('minAbs');
    const maxAbs = params.get('maxAbs');
    if (minAbs && maxAbs) {
      const min = parseInt(minAbs, 10);
      const max = parseInt(maxAbs, 10);
      tempList = tempList.filter(std => std.absents >= min && std.absents <= max);
    } else if (minAbs) {
      const min = parseInt(minAbs, 10);
      tempList = tempList.filter(std => std.absents >= min);
    } else if (maxAbs) {
      const max = parseInt(maxAbs, 10);
      tempList = tempList.filter(std => std.absents <= max);
    }

    setFilteredList(tempList);
  }, [params, studentsList]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    setParams(params);
  }

  const handleGardFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === 'all') {
      params.delete('graduated');
    } else {
      params.set('graduated', v);
    }
    setParams(params);
  }

  const handleCourseFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      params.append('courses', course);
    } else {
      params.delete('courses', course);
    }
    setParams(params);
  }

  const handleMinAbsFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const minAbs = event.target.value;
    if (minAbs) {
      params.set('minAbs', minAbs);
    } else {
      params.delete('minAbs');
    }
    setParams(params);
  }

  const handleMaxAbsFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxAbs = event.target.value;
    if (maxAbs) {
      params.set('maxAbs', maxAbs);
    } else {
      params.delete('maxAbs');
    }
    setParams(params);
  }

  if (props.studentsList.length === 0) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="main-screen">
      <h2>Students List</h2>
      <div className="stats">
        <button onClick={props.onRemove}>POP Student</button>
        <button onClick={scrollToLast}>Scroll to Last</button>
        <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>Total Absents {totalAbsents}</b>
      </div>
      <div className="filter">
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearch}
          value={params.get('q') || ''}
        />
        <select
          value={params.get('graduated') || 'all'}
          onChange={handleGardFilter}
        >
          <option value="all">All</option>
          <option value="grad">Graduated</option>
          <option value="non-grad">Not Graduated</option>
        </select>
        <div>
          {
            COURSES_FILTERS.map(c => (
              <React.Fragment key={c}>
                <input
                  id={c}
                  type="checkbox"
                  value={c}
                  onChange={handleCourseFilter}
                  checked={params.getAll('courses').includes(c)}
                />
                <label htmlFor={c}>{c}</label>&nbsp;&nbsp;
              </React.Fragment>
            ))
          }
        </div>
        <div>
          <label>
            Min Absents:
            <input
              type="number"
              min="0"
              onChange={handleMinAbsFilter}
              value={params.get('minAbs') || ''}
            />
          </label>
          <label>
            Max Absents:
            <input
              type="number"
              min="0"
              onChange={handleMaxAbsFilter}
              value={params.get('maxAbs') || ''}
            />
          </label>
        </div>
      </div>
      {
        filteredList.length
          ? (
            <div className="list">
              {
                filteredList.map(student => (
                  <Student
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    age={student.age}
                    absents={student.absents}
                    isGraduated={student.isGraduated}
                    coursesList={student.coursesList}
                    onAbsentChange={props.onAbsent}
                    mode="list"
                  />
                ))
              }
            </div>
          )
          : <h3>No results found!</h3>
      }
      <div ref={lastStdRef}></div>
    </div>
  )
}

export default Main;