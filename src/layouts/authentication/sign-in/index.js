/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import loginApi from "../../../api/login";

// FormError
import FormError from "components/shared/formError/formError"

// Loader
import Spinner from "components/shared/spinner/spinner"

// Set password form
import SetPasswordForm from "../set-password/index"

import { useNavigate } from 'react-router-dom';


function Basic() {

  const [email, setEmail] = useState('');
  const emailChange = (e) => setEmail(e.target.value);

  const [password, setPassword] = useState('');
  const passwordChange = (e) => setPassword(e.target.value);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState('')
  const [submitted, setSubmitted] = useState(false);

  const [showSetPassword, setShowSetPassword] = useState(false);
  const [name, setName] = useState('');

  const navigate = useNavigate();


  const childToParent = (childdata) => {
    setShowSetPassword(false);
    navigate("/users");
  }

  function login(event) {
    setLoading(true);
    setSubmitted(true);
    if (!password || !email) {
      setErrors({ email: !email, password: !password });
      setLoading(false);
      return;
    }
    loginApi(email, password).then(response => {
      if (response.ok) {
        response.json().then(r => {
          localStorage.setItem("token", r.token)
          if (r.user.firstLogIn) {
            setName(r.user.name);
            setLoading(false);
            setShowSetPassword(true);
          } else {
            navigate("/dashboard");
          }
        })
      } else {
        response.json().then(r => {
          setErrors({ serverError: r.message });
          setLoading(false);
        })

      }
    });
  }

  return (
    <BasicLayout image={bgImage}>
      {!showSetPassword && <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar sesión
          </MDTypography>


        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {submitted && errors.serverError && <MDAlert p={0.5} color="error" style={{ fontWeight: "normal", fontSize: "14px" }}>{errors.serverError}</MDAlert>}
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={emailChange} />
              {!email && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" fullWidth value={password} onChange={passwordChange} />
              {!password && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mt={4} mb={1}>
              {!loading && <MDButton variant="gradient" color="info" fullWidth onClick={login}>
                Iniciar sesión
              </MDButton>}
              {loading && <Spinner></Spinner>}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>}
      {showSetPassword && <SetPasswordForm name={name} childToParent={childToParent} ></SetPasswordForm>}
    </BasicLayout>
  );
}

export default Basic;
