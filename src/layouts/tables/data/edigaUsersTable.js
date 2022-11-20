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
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import profilePhoto from "assets/images/profile-photo.jpg";
import { getEdigaUsers } from "../../../api/getEdigaUsers";
import { setAdminEdiga } from "../../../api/setAdminEdiga";



function adminColor(isAdmin) {
  if (isAdmin) {
    return "success"
  }
  return "light"
};


function EdigaUsers() {
  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);

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

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const navigate = useNavigate();

  return {
    columns: [
      { Header: "usuario", accessor: "name", width: "30%", align: "left" },
      { Header: "rol", accessor: "role", align: "left" },
      { Header: "cambiar rol", accessor: "actions", align: "center" },
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
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={()=> edit(user)}>
              <Tooltip title="Editar">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </MDTypography>
          ),
        }
      })
  };
}

export default EdigaUsers;
