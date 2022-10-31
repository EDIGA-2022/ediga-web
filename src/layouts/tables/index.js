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
import observationsTable from "layouts/tables/data/observationsTable";
import diaryEntriesTable from "layouts/tables/data/diaryEntriesTable";

// Button, Navigation
import MDButton from "components/MDButton";

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { column } from "stylis";


function Tables(props) {
  var [columns, setColumns] = useState([]);
  var [csvData, setCsvData] = useState([]);
  var [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  let title;
  // let columns;
  // let rows;
  let obj;
  let onClick;

  // switch (props.type) {
  //   case 'Users':
  //     ({columns, rows, csvData} = usersTable(searchText));
  // }

  const onSearchChangeTable = (value) => {
    console.log('index', value)
    setSearchText(value)
  };


  const navigate = useNavigate();

  const navigateToCreateNewUser = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createNewUser');
  };

  const navigateToCreateNewObservation = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createNewObservation/' + props.userId);
  };

  const navigateToCreateNewDiaryEntry = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createDiaryEntry/' + props.userId);
  };

  const navigateToEditDiaryEntry = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/editDiaryEntry/' + props.userId);
  };

  const navigateToViewDiaryEntry = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/viewDiaryEntry/' + props.userId);
  };

  switch (props.type) {
    case 'users':
      title = 'Sujetos';
      obj = usersTable(searchText);
      setColumns(obj.columns);
      setRows(obj.rows);
      setCsvData(obj.csvData);
      onClick = navigateToCreateNewUser;
      break;
    case 'observations':
      title = 'Observaciones';
      obj = observationsTable(props.userId);
      setColumns(obj.columns);
      setRows(obj.rows);
      onClick = navigateToCreateNewObservation;
      break;
    case 'diaryEntries':
      title = 'Diario de campo';
      obj = diaryEntriesTable(props.userId);
      setColumns(obj.columns);
      setRows(obj.rows);
      onClick = navigateToCreateNewDiaryEntry;
      break;
    default:
      break;
  }

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
                <Grid container justifyContent="flex-end">
                  <Grid item xs={10}>
                    <MDTypography variant="h6" color="white">
                      {title}
                    </MDTypography>

                  </Grid>
                  <Grid item xs>
                    <ExportUsersXLS csvData={csvData} fileName="DataSujetos" />
                  </Grid>
                  <Grid item xs>
                    <MDButton variant="outlined" color="white" size="small" style={{ marginLeft: "auto" }} onClick={onClick}>
                      <AddIcon />
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox >
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
            </Card >
          </Grid >
        </Grid >
      </MDBox >
      <Footer />
    </div >
  );
}

export default Tables;
