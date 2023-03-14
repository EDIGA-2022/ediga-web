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

import { useCallback, useEffect, useState } from "react";

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
import RegisterLayout from "layouts/authentication/components/NoNavbarLayout";

// Loader component
import Spinner from "components/shared/spinner/spinner"
import FormError from "components/shared/formError/formError"


import MDAlert from "components/MDAlert";
import { useParams, useNavigate } from "react-router-dom";
import getEdigaUserApi from "../../api/getEdigaUser";
import editEdigaUser from "../../api/editEdigaUser";


function Cover() {
  const { userId } = useParams();
  const [name, setName] = useState('');
  const nameChange = (e) => setName(e.target.value);

  const [email, setEmail] = useState('');
  const emailChange = (e) => setEmail(e.target.value);

  const [role, setRole] = useState('researcher');

  useEffect(function effectFunction() {
    async function fetchEdigaUser() {
      await getEdigaUserApi(userId).then(res => {
        res.json().then(response => {
          setName(response.user.name);
          setEmail(response.user.email);
          if (response.user.isAdmin) {
            setRole('admin');
          } else {
            setRole('researcher');
          }
        })
      })
    }

    fetchEdigaUser();
  }, []);


  const roles = [
    { label: 'Investigador', code: "researcher" },
    { label: 'Administrador', code: "admin" },
  ];

  const navigate = useNavigate();
  const [errors, setErrors] = useState('')

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);


  function edit(event) {
    setLoading(true);
    setSubmitted(true);
    if (!name || !email) {
      setErrors({ email: !email, name: !name });
      setLoading(false);
      return;
    }
    setEmail(email)
    setName(name)
    let isAdmin;
    if (role === 'admin') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    editEdigaUser(userId, name, email, isAdmin).then(res => {
      if (res.status === 200) {
        setLoading(false);
        res.json().then(msg => {
          goBack(msg.message);
        })
      } else {
        setErrors({ email: true, password: true, name: true });
        setSuccess(false);
        setLoading(false);
      }
    })
  }

  function setRoleInForm() {
    if (role === 'admin') {
      return 'Administrador';
    } else {
      return 'Investigador';
    }
  }

  const goBack = (displayText) => {
    navigate(`/admin/`,
      {
        state: {
          displayText,
        }
      }
    )
  }

  return (
    <RegisterLayout>
      <Card>
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
            Editar investigador
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {submitted && errors.serverError && <MDAlert p={0.5} color="error" style={{ fontSize: "14px" }}>{errors.serverError}</MDAlert>}
            {success && <MDAlert p={0.5} color="success" style={{ fontSize: "14px" }}>Usuario editado exitosamente</MDAlert>}
            <MDBox mb={2}>
              <MDInput type="text" label="Nombre" variant="standard" fullWidth value={name} onChange={nameChange} disabled={loading} />
              {!name && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth value={email} onChange={emailChange} disabled={loading} />
              {!email && submitted && <FormError text="Este campo es obligatorio"></FormError>}
            </MDBox>

            <MDBox mb={1}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={roles}
                sx={{ width: "100%" }}
                value={setRoleInForm()}
                onChange={(e, value) => {
                  console.log(e, value)
                  setRole(value.code)
                }}
                renderInput={(params) => <TextField {...params} label="Asigna un rol" />}
              />
            </MDBox>
            <MDBox mt={1} mb={1}>
              {!loading && <MDButton variant="outlined" color="dark" fullWidth onClick={() => navigate("/admin")}>
                Cancelar
              </MDButton>}
            </MDBox>
            <MDBox mt={1} mb={1}>
              {!loading && <MDButton variant="contained" color="dark" fullWidth onClick={edit}>
                Editar
              </MDButton>}
              {loading && <Spinner></Spinner>}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </RegisterLayout>
  );
}

export default Cover;