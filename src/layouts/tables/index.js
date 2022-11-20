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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import usersTable from "layouts/tables/data/usersTable";
import observationsTable from "layouts/tables/data/observationsTable";
import edigaUsersTable from "layouts/tables/data/edigaUsersTable";

// Button, Navigation
import MDButton from "components/MDButton";
import {Routes, Route, useNavigate} from 'react-router-dom';


function Tables(props) {
  const { columns, rows } = props.type === 'users' ? usersTable() : props.type === 'edigaUsers'? edigaUsersTable(): observationsTable(props.userId);
  const title = props.type === 'users' ? 'Usuarios' : props.type === 'edigaUsers' ? "Usuarios Ediga" : "Observaciones";
  const navigate = useNavigate();

  const navigateToCreateNewUser = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    if (props.type === 'edigaUsers') {
      navigate('/authentication/sign-up');
    } else {
      navigate('/createNewUser');
    }
  };

  return (
    <div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex" }}
              >
                <MDTypography variant="h6" color="white">
                  {title}
                </MDTypography>
                <MDButton variant="outlined" color="white" size="small"  style={{ marginLeft: "auto" }} onClick={navigateToCreateNewUser}>
                  +
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </div>
  );
}

export default Tables;
