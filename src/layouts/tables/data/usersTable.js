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
import { getUsers } from "../../../api/getUsers";

function selectGenderColor(gender) {
  switch (gender) {
    case "Mujer cis":
      return "success"
    case "Hombre cis":
      return "error"
    case "Mujer trans":
      return "info"
    case "Hombre trans":
      return "warning"
    case "No binario":
      return "light"
    case "Otro":
      return "primary"
    default:
      return "dark"
  }
};

function GetUsers(searchText, gender, country, age) {
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);

  const fetchAllUsers = async () => {
    setLoadingRows(true);
    getUsers().then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setLoadingRows(false);
          setRows(r);
          setAllRows(r);
        });
      } else {
        if (response.status === 401) {
          navigate("/authentication/sign-in");
        }
        return Promise.reject(response);
      }
    }).catch((e) => {
      console.log('error', e);
    });
  }

  const filterRows = (searchText, gender, country, age) => {
    let filteredRows = [];
    if (searchText === '') {
      filteredRows = allRows;
    } else {
      filteredRows = allRows.filter((row) => {
        return (
          (row.instagramProfile && row.instagramProfile.toLowerCase().startsWith(searchText.toLowerCase())) ||
          (row.instagramProfile && row.instagramProfile.toLowerCase().includes(searchText.toLowerCase())) ||
          (row.alias && row.alias.toLowerCase().includes(searchText.toLowerCase()))
        );
      });
    }

    if (gender) {
      filteredRows = filteredRows.filter((row) => row.gender === gender)
    }

    if (country) {
      filteredRows = filteredRows.filter((row) => row.country === country)
    }

    if (age) {
      filteredRows = filteredRows.filter((row) => row.yearsOld === age)
    }

    setRows(filteredRows);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterRows(searchText, gender, country, age);
  }, [searchText, gender, country, age]);



  const navigate = useNavigate();

  return {
    columns: [
      { Header: "sujeto", accessor: "alias", width: "30%", align: "left" },
      { Header: "edad", accessor: "yearsOld", align: "left" },
      { Header: "genero", accessor: "gender", align: "center" },
      { Header: "pais", accessor: "country", align: "center" },
      { Header: "acciones", accessor: "actions", align: "center" },
    ],
    rows:
      rows.map((row) => {
        return {
          alias: (
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDAvatar src={profilePhoto} alias={row.userId} size="sm" />
              <MDBox ml={2} lineHeight={1}>
                <MDTypography component="a" href="#" display="block" variant="button" fontWeight="medium" onClick={() => navigate("/user/" + row.userId)}>
                  {row.alias || '- Sujeto sin alias -'}
                </MDTypography>
                <MDTypography variant="caption">{row.instagramProfile}</MDTypography>
              </MDBox>
            </MDBox>
          ),
          yearsOld: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {row.yearsOld}
            </MDTypography>
          ),
          gender: (
            <MDBox ml={-1}>
              <MDBadge badgeContent={row.gender} color={selectGenderColor(row.gender)} variant="gradient" size="sm" />
            </MDBox>
          ),
          country: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {row.country}
            </MDTypography>
          ),
          actions: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => navigate("/editUser/" + row.userId)}>
              <Tooltip title="Editar">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </MDTypography>
          ),
        }
      }),
    csvData: rows,
    loading: loadingRows,
  };
}

export default GetUsers;
