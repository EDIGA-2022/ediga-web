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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API requests
import createUserAPI from "../../api/createUser";
import { useNavigate, Navigate } from "react-router-dom";

function CreateNewUser() {
  
  const [userCountry, setUserCountry] = useState('');
  const [answer1, setAnswer1] = useState('1');
  const [answer2, setAnswer2] = useState('');
  const [answer1openField, setAnswer1openField] = useState('');
  const [answer3openField, setAnswer3openField] = useState('');
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [alias, setAlias] = useState('');
  const navigate = useNavigate();

  const ages = [
    { label: '13 años', age: 13 },
    { label: '14 años', age: 14 },
    { label: '15 años', age: 15 },
    { label: '16 años', age: 16 },
    { label: '17 años', age: 17 },
  ];
  const countries = [
    { label: 'México', country: "MX" },
    { label: 'España', country: "ES" },
    { label: 'Uruguay', country: "UY" },
  ];

  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      El participante que está siendo ingresado no debe formar parte de los usuarios registrados a través de la aplicación móvil
    </MDTypography>
  );

  const jsonError = (name) => (
    <MDTypography variant="body2" color="white">
      Error: {name}.
    </MDTypography>
  );

  const jsonSuccess = () => (
    <MDTypography variant="body2" color="white">
      El participante se ha dado de alta con éxito.
    </MDTypography>
  );

  const submitUser = async () => {
    const data = {
      userCountry: userCountry,
      answer1: answer1,
      answer2: answer2,
      answer1openField: answer1openField,
      answer3: "Si",
      answer3openField: answer3openField,
      alias: alias
   }
   createUserAPI(data).then(response => {
    setIsSuccess(response.ok);
    setShowMsg(true);
    response.json().then(msg => {
      setJsonResponseMessage(msg.message);
    })
   });
  }

  return (
    <DashboardLayout>
       <DashboardNavbar onArrowClick={() => navigate("/users")} />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Fromulario de ingreso para un participante</MDTypography>
                <MDTypography variant="subtitle1">Todos los campos son obligatorios</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                <MDAlert color="info">
                  {alertContent("info")}
                </MDAlert>
              </MDBox>
              <form>
                <MDBox p={2}>
                  <MDTypography variant="h5">Nombre ficticio</MDTypography>
                  <MDBox p={1}></MDBox>
                  <TextField id="standard-basic" label="Nombre ficticio" variant="standard" onChange={(e) => setAlias(e.target.value)}/>
                </MDBox>
                <MDBox p={2}>
                    <MDTypography variant="h5">Edad</MDTypography>
                    <MDBox p={1}></MDBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={ages}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setAnswer2(value.age)}
                      renderInput={(params) => <TextField {...params} label="Edad" />}
                    />
                </MDBox>
                <MDBox p={2}>
                    <MDTypography variant="h5">País</MDTypography>
                    <MDBox p={1}></MDBox>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={countries}
                      sx={{ width: 300 }}
                      onChange={(event, value) => setUserCountry(value.country)}
                      renderInput={(params) => <TextField {...params} label="País" />}
                      
                    />
                </MDBox>
                <MDBox p={2}>
                    <MDTypography variant="h5">Género con el que se identifica</MDTypography>
                    <MDBox p={1}></MDBox>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="1"
                      name="radio-buttons-group"
                      onChange={(e) => setAnswer1(e.target.value)}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Mujer cis" />
                      <FormControlLabel value="2" control={<Radio />} label="Hombre cis" />
                      <FormControlLabel value="3" control={<Radio />} label="Mujer trans" />
                      <FormControlLabel value="4" control={<Radio />} label="Hombre trans" />
                      <FormControlLabel value="5" control={<Radio />} label="No binario" />
                      <FormControlLabel value="6" control={<Radio />} label="Otro" />
                    </RadioGroup>
                    <TextField id="standard-basic" label="Otro" variant="standard" onChange={(e) => setAnswer1openField(e.target.value)} disabled={answer1 != 6}/>
                </MDBox>
                <MDBox p={2}>
                    <MDTypography variant="h5">Usuario de instagram</MDTypography>
                    <MDBox p={1}></MDBox>
                    <TextField id="standard-basic" label="@" variant="standard" onChange={(e) => setAnswer3openField(e.target.value)}/>
                </MDBox>
              </form>
              {showMsg &&!isSuccess && <MDBox pt={2} px={2}>
                <MDAlert color="error">
                  {jsonError(jsonResponseMessage)}
                </MDAlert>
              </MDBox>}
             {showMsg && isSuccess && <MDBox pt={2} px={2}>
                <Navigate to="/users" />
              </MDBox>}
              <MDBox p={2}>
                <MDButton variant="outlined" color="info" size="small"  style={{ marginRight: "16px" }} onClick={submitUser}>
                    Añadir participante
                </MDButton>
                <MDButton variant="outlined" color="error" size="small"  style={{ marginRight: "auto" }} onClick={() => 
                  {if (window.confirm('Todos los cambios no guardados se perderán, ¿confirma cancelar?')) navigate(`/users`)}}>
                    Cancelar
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateNewUser;
