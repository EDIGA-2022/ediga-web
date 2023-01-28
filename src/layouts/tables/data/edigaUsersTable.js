/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IconButton, Tooltip } from '@mui/material';
import { getEdigaUsers } from "../../../api/getEdigaUsers";
import { deleteEdigaUser } from "../../../api/deleteEdigaUser";
import { useGlobalState } from "../../../App";
import AddIcon from '@mui/icons-material/Add';
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";


function adminColor(isAdmin) {
  if (isAdmin) {
    return "success"
  }
  return "light"
};

function countryColor(country) {
  if (country === "ES") {
    return "warning"
  } else if (country === "MX") {
    return "error"
  } else {
    return "info"
  }
};



function EdigaUsersTable(props) {

  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);

  const [showDeleteButton, setShowDeleteButton] = useState(false);
  // const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const fetchAllUsers = async () => {
    setLoadingRows(true);
    getEdigaUsers().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setRows(r.users);
          setLoadingRows(false);
        });
      } else {
        if (response.status === 401) {
          navigate("/authentication/sign-in");
        }
      }
    });
  }

  const edit = async (user) => {
    navigate(`/edigaUser/${user.edigaUserId}`);
  }

  const deleteUser = (user) => {
    deleteEdigaUser(user.edigaUserId).then((response) => {
      if (response.ok) {
        response.json().then(async (r) => {
          await fetchAllUsers();
        });
      }
    });
  }

  const requestConfirmation = (user) => {
    setShowDeleteButton(true);
    setUserIdToDelete(user.edigaUserId);
    setTimeout(function () {
      setShowDeleteButton(false);
    }, 9000);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  var columns = [
    { Header: "usuario", accessor: "name", width: "30%", align: "left" },
    { Header: "rol", accessor: "role", align: "left" },
    { Header: "pais", accessor: "country", align: "center" },
    { Header: "cambiar rol", accessor: "actions", align: "center" },
    { Header: "eliminar", accessor: "delete", align: "center" },
  ];
  const title = 'Usuarios Ediga';
  const onClick = () => {
    navigate('/authentication/sign-up');
  };

  const navigate = useNavigate();

  const createRows = (rows) => rows.map((user) => {
    return {
      name: (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDBox lineHeight={1}>
            <MDTypography component="a" href="#" display="block" variant="button" fontWeight="medium">
              {user.name}
            </MDTypography>
            <MDTypography component="a" href="#" display="block" variant="button">
              {user.email}
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      role: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={user.isAdmin ? "Administrador" : "Investigador"} color={adminColor(user.isAdmin)} variant="gradient" size="sm" />
        </MDBox>
      ),
      country: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={user.country === 'UY' ? "Uruguay" : user.country === 'MX' ? "México" : "España"} color={countryColor(user.country)} variant="gradient" size="sm" />
        </MDBox>
      ),
      actions: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => edit(user)}>
          <Tooltip title="Editar">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </MDTypography>
      ),

      delete: (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium" onClick={() => requestConfirmation(user)}>
          {(!showDeleteButton || user.edigaUserId != userIdToDelete) && <Tooltip title="Eliminar usuario">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>}
          {showDeleteButton && user.edigaUserId === userIdToDelete && <MDButton color="error" onClick={() => deleteUser(user)}>Eliminar</MDButton>}
        </MDTypography>
      ),

    }
  });

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

                  <MDButton variant="outlined" color="white" size="small" style={{ marginLeft: "auto" }} onClick={onClick}>
                    <AddIcon />
                  </MDButton>

                </Grid>
              </MDBox >
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: createRows(rows) }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  canSearch={false}
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


export default EdigaUsersTable;
