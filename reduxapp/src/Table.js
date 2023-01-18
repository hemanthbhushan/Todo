import React from "react";
import { useSelector } from "react-redux";
import { removeElement } from "./redux/formSlice";
import "./Table.css";
import { useDispatch } from "react-redux";

const Table = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.form.arr);

  return (
    <div className="App">
      <table>
        <tr>
          <th>First name</th>
          <th>last name</th>
          <th>email</th>
        </tr>
        {userList && userList.length
          ? userList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.firstName}</td>
                  <td>{val.lastName}</td>
                  <td>{val.email}</td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => dispatch(removeElement(key))}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleEdit(key)}
                  >
                    Edit
                  </button>
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
};

export default Table;
