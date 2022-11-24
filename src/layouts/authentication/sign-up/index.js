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

import { useCallback, useState } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';



// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Loader component
import Spinner from "components/shared/spinner/spinner"
import FormError from "components/shared/formError/formError"

import registerApi from "../../../api/register";
import MDAlert from "components/MDAlert";
import { useNavigate } from 'react-router-dom';


function Cover() {

  const [name, setName] = useState('');
  const nameChange = (e) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const emailChange = (e) => setEmail(e.target.value);

  const [role, setRole] = useState('researcher');

  const [password, setPassword] = useState('');
  const passwordChange = (e) => {
    setPassword(e.target.value)
    if (password.length > 6) {
      setPasswordError('');
    }
  };

  const [country, setCountry] = useState('');



  let isAdmin = false;

  const roles = [
    { label: 'Investigador', code: "researcher" },
    { label: 'Administrador', code: "admin" },
  ];

  const countries = [
    { label: 'México', country: "MX" },
    { label: 'España', country: "ES" },
    { label: 'Uruguay', country: "UY" },
  ];

  const navigate = useNavigate();
  const [errors, setErrors] = useState('')
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  function register(event) {
    setLoading(true);
    setSubmitted(true);
    if (!name || !password || !email) {
      setErrors({ email: !email, password: !password, name: !name });
      setLoading(false);
      return;
    }
    if (password.length <= 6) {
      setPasswordError('La contraseña debe tener al menos 7 caracteres.');
      setLoading(false);
      return;
    }
    if (role === 'admin') {
      isAdmin = true;
    }
    registerApi(name, email, password, isAdmin, country).then(response => {
      if (response.ok) {
        setSuccess(true);
        cleanForm();
        setLoading(false);
      } else {
        if (response.status === 401) {
          navigate("/authentication/sign-in");
        }
        response.json().then(r => {
          setErrors({ serverError: r.message });
          setLoading(false);
        });
      }
    })
  }

  function cleanForm() {
    setEmail("");
    setName("");
    setPassword("");
    setSubmitted(false);
  }

  function redirectToLogin() {
    if (localStorage.getItem("token")) {
      return true
    }
    // navigate to sign in
    navigate("/authentication/sign-in");

  }
  return (
    <CoverLayout>
      {redirectToLogin() && <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registra un nuevo investigador
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {submitted && errors.serverError && <MDAlert p={0.5} color="error" style={{ fontWeight: "normal", fontSize: "14px" }}>{errors.serverError}</MDAlert>}
            {success && <MDAlert p={0.5} color="success" style={{ fontWeight: "normal", fontSize: "14px" }}>Usuario creado exitosamente</MDAlert>}
            <MDBox mb={2}>
              <MDInput type="text" label="Nombre" variant="standard" fullWidth onChange={nameChange} disabled={loading} />
              {!name && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={emailChange} disabled={loading} />
              {!email && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" variant="standard" fullWidth onChange={passwordChange} disabled={loading} />
              {password && passwordError && submitted && <FormError text={passwordError}></FormError>}
              {!password && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mb={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={countries}
                sx={{ width: "100%" }}
                onChange={(event, value) => setCountry(value.country)}
                renderInput={(params) => <TextField {...params} label="País" />}
              />
            </MDBox>
            <MDBox mb={1}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={roles}
                sx={{ width: "100%" }}
                onChange={(e, value) => {
                  console.log(e, value)
                  setRole(value.code)
                }}
                renderInput={(params) => <TextField {...params} label="Asigna un rol" />}
              />
            </MDBox>

            <MDBox mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                El usuario deberá cambiar la contraseña al iniciar sesión
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mb={1}>
              {!loading && <MDButton variant="gradient" color="info" fullWidth onClick={register}>
                Registrar
              </MDButton>}
              {loading && <Spinner></Spinner>}
            </MDBox>
            <MDBox mt={1} mb={1}>
              {!loading && <MDButton variant="gradient" color="error" fullWidth onClick={() => navigate("/admin")}>
                Cancelar
              </MDButton>}
              {loading && <Spinner></Spinner>}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>}
    </CoverLayout>
  );
}

export default Cover;