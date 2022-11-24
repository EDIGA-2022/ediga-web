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
import AddIcon from '@mui/icons-material/Add';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
// Button, Navigation
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import ExportUsersXLS from "components/shared/exportUsersXLS";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import diaryEntriesTable from "layouts/tables/data/diaryEntriesTable";
import observationsTable from "layouts/tables/data/observationsTable";
// Data
import exportPhotos from "../../api/exportPhotos";
import usersTable from "layouts/tables/data/usersTable";

import observationsTable from "layouts/tables/data/observationsTable";
import edigaUsersTable from "layouts/tables/data/edigaUsersTable";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Tables(props) {
  var columns = useState([]);
  var csvData = useState([]);
  var rows = useState([]);
  const [searchText, setSearchText] = useState('');
  const [gender, setGender] = useState(0);
  const [country, setCountry] = useState(0);
  const [age, setAge] = useState(0);

  let title;
  let obj;
  let onClick;

  const onSearchChangeTable = (value) => {
    setSearchText(value)
  };

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

  const navigateToCreateNewObservation = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createNewObservation/' + props.userId);
  };

  const navigateToCreateNewDiaryEntry = () => {
    // 👇️ navigate to /navigateToCreateNewUser
    navigate('/createDiaryEntry/' + props.userId);
  };

  switch (props.type) {
    case 'users':
      title = 'Sujetos';
      obj = usersTable(searchText, gender, country, age);
      columns = obj.columns;
      rows = obj.rows;
      csvData = obj.csvData;
      onClick = navigateToCreateNewUser;
      break;
    case 'observations':
      title = 'Observaciones';
      obj = observationsTable(props.userId);
      columns = obj.columns;
      rows = obj.rows;
      onClick = navigateToCreateNewObservation;
      break;
    case 'diaryEntries':
      title = 'Diario de campo';
      obj = diaryEntriesTable(props.userId);
      columns = obj.columns;
      rows = obj.rows;
      onClick = navigateToCreateNewDiaryEntry;
      break;
    default:
      break;
  }

  const onExportPhotos = () => {
    exportPhotos().then(response => {
      console.log("response", response)
    });
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
                  <Grid item xs={9}>
                    <MDTypography variant="h6" color="white">
                      {title}
                    </MDTypography>
                  </Grid>
                  {/* {props.type === 'users' && <Grid item xs>
                    <MDButton variant="outlined" color="white" size="small" onClick={() => onExportPhotos()}>
                      <ImageOutlinedIcon />
                      <FileDownloadOutlinedIcon />
                    </MDButton>
                  </Grid>} */}
                  {props.type === 'users' && <Grid item xs>
                    <ExportUsersXLS csvData={csvData} fileName="DataSujetos" />
                  </Grid>}
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
                  canSearch={props.type === 'users'}
                  onSearchChangeTable={onSearchChangeTable}
                  setCountry={setCountry}
                  setGender={setGender}
                  setAge={setAge}
                  gender={gender}
                  country={country}
                  age={age}
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
