import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CompleteProfile1 from "./completeProfile1";
import {  useSelector } from "react-redux";

const CompleteProfileProcess1 = () => {
  const { range } = useSelector((state) => state.userReducer);
  const initialValues = {
    range: range,
    fund: "",
    firstName: "",
    secondName: "",
    name: "",
    curp: "",
    rfc: "",
    tax: "",
    countryBirth: "Mexico",
    nationality: "Mexican",
    phone: "",
    occupation: "",
  };

  const validationSchema = Yup.object({
    fund: Yup.number().required("Fund cannot be blank"),
    firstName: Yup.string().required("First Name cannot be blank"),
    secondName: Yup.string(),
    name: Yup.string().required("Name cannot be blank"),
    countryBirth: Yup.string(),
    curp: Yup.string().when(["nationality"], {
      is: "Mexican",
      then: Yup.string().required("CURP cannot be blank"),
      otherwise: null,
    }),
    rfc: Yup.string().when(["nationality"], {
      is: "Mexican",
      then: Yup.string().required("RFC cannot be blank"),
      otherwise: null,
    }),
    tax: Yup.string().when(["nationality"], {
      is: "Mexican",
      then: null,
      otherwise: Yup.string().required("Tax cannot be blank"),
    }),
    occupation: Yup.string().when(["range"], {
      is: "$60,000 - $1,20,000",
      then: Yup.string().required("Occupation cannot be blank"),
      otherwise: null,
    }),
    phone: Yup.number()
      .test(
        "len",
        "Must be exactly 10 digits",
        (val) => val && val.toString().length === 10
      )
      .required("Phone Number cannot be blank"),
  });

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {(formik) => <CompleteProfile1 {...formik} />}
    </Formik>
  );
};

export default CompleteProfileProcess1;
