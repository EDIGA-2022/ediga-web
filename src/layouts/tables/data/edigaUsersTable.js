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
import ConfirmIcon from '@mui/icons-material/Delete';

import { IconButton, Tooltip } from '@mui/material';
import { getEdigaUsers } from "../../../api/getEdigaUsers";
import { setAdminEdiga } from "../../../api/setAdminEdiga";
import { deleteEdigaUser } from "../../../api/deleteEdigaUser";

function adminColor(isAdmin) {
  if (isAdmin) {
    return "success"
  }
  return "light"
};



function EdigaUsers() {
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
          console.log(r);
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

  const updateRole = async (userId, isAdmin) => {
    setLoadingRows(true);
    setAdminEdiga(userId, isAdmin).then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          console.log(r);
          fetchAllUsers();
          console.log("show confirm button", showDeleteButton);
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
      } else {
        console.log("no eliminado");
      }
    });
  }

  const requestConfirmation = (user) => {
    setShowDeleteButton(true);
    setUserIdToDelete(user.edigaUserId);
    setTimeout(function () {
      setShowDeleteButton(false);
    }, 5000);
  }


  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigate = useNavigate();

  return {
    columns: [
      { Header: "usuario", accessor: "name", width: "30%", align: "left" },
      { Header: "rol", accessor: "role", align: "left" },
      { Header: "cambiar rol", accessor: "actions", align: "center" },
      { Header: "eliminar", accessor: "delete", align: "center" },

    ],
    rows:
      rows.map((user) => {
        return {
          name: (
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDBox lineHeight={1}>
                <MDTypography component="a" href="#" display="block" variant="button" fontWeight="medium">
                  {user.name}
                </MDTypography>
                <MDTypography component="a" href="#" display="block" variant="button" fontWeight="normal">
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
              {showDeleteButton && user.edigaUserId === userIdToDelete && <MDButton color="error" onClick={()=> deleteUser(user)}>Eliminar</MDButton>}

            </MDTypography>
          ),

        }
      })

  };
}

export default EdigaUsers;
