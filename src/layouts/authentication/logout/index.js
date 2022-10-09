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
import logoutApi from "../../../api/logout";

// FormError
import FormError from "components/shared/formError/formError"

// Loader
import Spinner from "components/shared/spinner/spinner"

// Set password form
import SetPasswordForm from "../set-password/index"

import { useNavigate } from 'react-router-dom';


function Basic() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  function clearUserInfo() {
    // Remove jwt cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  function logout(event) {
    setLoading(true);
    logoutApi().then(response => {
      clearUserInfo();
      if (response.ok) {
        setLoading(false);
        navigate("/authentication/sign-in");
      }
    })
  }

  function cancel() {
    navigate("/users");
  }

  return (
    <BasicLayout image={bgImage}>
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
            Cerrar sesión
          </MDTypography>


        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={1}>
            {!loading &&
              <MDBox mb={2}>
                <MDButton variant="gradient" color="error" fullWidth onClick={logout}>
                  Cerrar sesión
                </MDButton>
              </MDBox>}
            {!loading && <MDButton variant="gradient" color="info" fullWidth onClick={cancel}>
              Cancelar
            </MDButton>}
            {loading && <Spinner></Spinner>}

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
