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
import Tooltip from '@mui/material/Tooltip';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
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

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function Tables(props) {
  var columns = useState([]);
  var csvData = useState([]);
  var rows = useState([]);
  const { state } = useLocation();
  const [searchText, setSearchText] = useState('');
  const [gender, setGender] = useState(0);
  const [country, setCountry] = useState(0);
  const [age, setAge] = useState(0);
  const [successSB, setSuccessSB] = useState(false);
  const [message, setMessage] = useState('');
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  let title;
  let obj;
  let onClick;
  let tooltip;
  let loading = false;

  useEffect(() => {
    if (state) {
      const { displayText } = state;
      if (displayText) {
        setMessage(displayText);
        openSuccessSB();
      }
    }
  }, []);

  const onSearchChangeTable = (value) => {
    setSearchText(value)
  };

  const navigate = useNavigate();

  const navigateToCreateNewUser = () => {
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

  switch (props.type) {
    case 'users':
      title = 'Sujetos';
      obj = usersTable(searchText, gender, country, age);
      columns = obj.columns;
      rows = obj.rows;
      loading = obj.loading;
      csvData = obj.csvData;
      onClick = navigateToCreateNewUser;
      tooltip = 'Crear nuevo sujeto'
      break;
    case 'observations':
      title = 'Observaciones';
      obj = observationsTable(props.userId);
      columns = obj.columns;
      rows = obj.rows;
      loading = obj.loading;
      onClick = navigateToCreateNewObservation;
      tooltip = 'Crear nueva observación'
      break;
    case 'diaryEntries':
      title = 'Diario de campo';
      obj = diaryEntriesTable(props.userId);
      columns = obj.columns;
      rows = obj.rows;
      loading = obj.loading;
      onClick = navigateToCreateNewDiaryEntry;
      tooltip = 'Crear nueva entrada de diario'
      break;
    default:
      break;
  }

  const onExportPhotos = () => {
    exportPhotos().then(response => {
      console.log("response", response)
    });
  }

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      title={message}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

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
                  {props.type === 'users' &&
                    <ExportUsersXLS csvData={csvData} fileName="DataSujetos" />
                  }
                  <Tooltip title={tooltip} placement="bottom">
                    <MDButton variant="outlined" color="white" size="small" style={{ marginLeft: "auto" }} onClick={onClick}>
                      <AddIcon />
                    </MDButton>
                  </Tooltip>
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
                  loading={loading}
                />
              </MDBox>
            </Card >
          </Grid >
        </Grid >
      </MDBox >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          {renderSuccessSB}
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}


export default Tables;