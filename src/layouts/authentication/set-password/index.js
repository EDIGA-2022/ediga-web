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
import setPasswordApi from "../../../api/setPassword";

// FormError
import FormError from "components/shared/formError/formError"

// Loader
import Spinner from "components/shared/spinner/spinner"




function Basic(props) {

  const [password, setPassword] = useState('');
  const passwordChange = (e) => setPassword(e.target.value);

  const [repeatPassword, setRepeatPassword] = useState('');
  const repeatPasswordChange = (e) => setRepeatPassword(e.target.value);
  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false);


  function submit(event) {
    setLoading(true);
    setSubmitted(true);
    props.childToParent("");
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }
    setPasswordApi(password).then(response => {
      if (response.ok) {
        console.log('Set pass success.');
      } else {
        response.json().then(r => {
          setError(r.message);
          setLoading(false);
        })

      }
    });
  }

  return (

      <Card>
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
            ¡Hola, {props.name}!
          </MDTypography>
          <MDTypography  fontWeight="medium" color="white" mt={1}>
            Establece una contraseña
          </MDTypography>

        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {submitted && error && <MDAlert p={0.5} color="error" style={{ fontWeight: "normal", fontSize: "14px" }}>{error}</MDAlert>}
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" fullWidth value={password} onChange={passwordChange} />
              {!password && submitted && <FormError text="Este campo es obligatorio"></FormError>}

            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Repetir contraseña" fullWidth value={repeatPassword} onChange={repeatPasswordChange} />
              {!repeatPassword && submitted && <FormError text="Este campo es obligatorio"></FormError>}

            </MDBox>
            <MDBox mt={4} mb={1}>
              {!loading && <MDButton variant="gradient" color="info" fullWidth onClick={submit}>
                Confirmar
              </MDButton>}
              {loading && <Spinner></Spinner>}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

  );
}

export default Basic;
