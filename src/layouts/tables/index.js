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
import AddIcon from '@mui/icons-material/Add';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ExportUsersXLS from "components/shared/exportUsersXLS";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import usersTable from "layouts/tables/data/usersTable";

// Button, Navigation
import MDButton from "components/MDButton";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";


function Tables(props) {
  var columns = useState([]);
  var csvData = useState([]);
  var rows = useState([]);
  const [searchText, setSearchText] = useState('');
  
  switch (props.type) {
    case 'Users':
      ({columns, rows, csvData} = usersTable(searchText));
  }

  const onSearchChangeTable = (value) => {
    console.log('index', value)
    setSearchText(value)
  };
  
  const navigate = useNavigate();

  const navigateToCreateNewUser = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createNewUser');
  };

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
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
                {props.type === 'Users' && (
                <>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={10}>
                    <MDTypography variant="h6" color="white">
                      Usuarios
                    </MDTypography>
                  </Grid>
                  <Grid item xs>
                    <ExportUsersXLS csvData={csvData} fileName="DataSujetos" />
                  </Grid>
                  <Grid item xs>
                    <MDButton variant="outlined" color="white" size="small" onClick={navigateToCreateNewUser}>
                      <AddIcon/>
                    </MDButton>
                  </Grid>
                </Grid>
                </>
                )}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  canSearch={true}
                  onSearchChangeTable={onSearchChangeTable}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
