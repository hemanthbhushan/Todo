import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Table from "./Table";
import "./SignupForm.css";
import { useDispatch } from "react-redux";
import { addForm, removeAll, editForm } from "./redux/formSlice";
import { useSelector } from "react-redux";
import WalletCard from "./WalletCard";
const SimpleForm = () => {
  const dispatch = useDispatch();
  const [edit, setedit] = useState(false);
  const [storeKey, setStoreKey] = useState(null);

  const userList = useSelector((state) => state.form.arr);

  const handleEdit = (key) => {
    // console.log("key", key);
    setedit(true);
    setStoreKey(key);
    const editedValue = userList.find((element, id) => {
      return id === key;
    });
    formik.setFieldValue("firstName", editedValue.firstName);
    formik.setFieldValue("lastName", editedValue.lastName);
    formik.setFieldValue("email", editedValue.email);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        let dataToChange = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        };
        let data = [...userList];  
        
        data[storeKey] = dataToChange;
        dispatch(editForm(data));
        setedit(false);
         formik.resetForm();
      } else {
        dispatch(
          addForm({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          })
        );
        resetForm({ values: "" });
      }
    },
  });
  return (
    <div className="Signup">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          className="form-control"
          type="text"
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
        <label htmlFor="lastName">last Name</label>
        <input
          id="lastName"
          className="form-control"
          type="text"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
        <label htmlFor="exampleInputEmail1">Email</label>
        <input
          className="form-control"
          type="email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        {edit ? (
          <button type="submit" className="btn btn-warning">
            update
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => dispatch(removeAll())}
        >
          Remove All
        </button>
      </form>

      <Table
        //  handleUpdate = {setedit}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default SimpleForm;
