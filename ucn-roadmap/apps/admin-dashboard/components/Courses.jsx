import courses_styles from '../src/styles/courses.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import AdminCourses from './AdminCourses';

const Courses = () => {
  const { data: session, status } = useSession();
  //runeffect for update
  const [runEffect, setRunEffect] = useState(false);
  //set data from api
  const [coursedata, setCourseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  // fetch data
  useEffect(() => {
    axios
      .get('https://sequelize-roadmap.herokuapp.com/course')
      .then((response) => {
        console.log(response);
        setCourseData(response);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get('https://sequelize-roadmap.herokuapp.com/category')
      .then((response) => {
        console.log(response);
        setCategoryData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [runEffect]);

  if (session.user.role == 'Admin') {
    return (
      <div className={courses_styles.body}>
        <table className={courses_styles.table}>
          <thead>
            <tr>
              <th>Navn</th>
              <th>Beskrivelse</th>
              <th>Varighed</th>
              <th>School Name</th>
              <th>Kategori</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AdminCourses
              runEffect={setRunEffect}
              categoryData={categoryData}
              courseData={coursedata}
            />
          </tbody>
        </table>
      </div>
    );
  } else if (session.user.role == 'User') {
    return (
      <div className={courses_styles.body}>
        <table className={courses_styles.table}>
          <thead>
            <tr>
              <th>id</th>
              <th>Navn</th>
              <th>Beskrivelse</th>
              <th>Varighed</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
};

export default Courses;
