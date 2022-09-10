import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Departments = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => {
    return state.departments;
  });
  const users = useSelector((state) => state.users);

  const addUser = async (department) => {
    try {
      const name = `${Math.random()} ${department.name}`;
      const response = await axios.post("/api/users", {
        departmentId: department.id,
        name,
      });
      dispatch({ type: "NEW_USER", user: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <ul>
      {departments.map((department) => {
        const usersInDepartment = users.filter(
          (user) => user.departmentId === department.id
        );
        return (
          <li key={department.id}>
            {department.name}{" "}
            <button onClick={() => addUser(department)}>+</button>
            <ul>
              {usersInDepartment.map((user) => {
                return <li key={user.id}>{user.name}</li>;
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default Departments;
