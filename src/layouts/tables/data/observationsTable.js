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
import MDTypography from "components/MDTypography";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import { getUserObservations } from "../../../api/getUserObservations";
import moment from 'moment';
import 'moment/locale/es';

function GetObservations(userId) {
  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  moment.locale();
  moment.locale('es');

  const fetchAllObservations = async () => {
    setLoadingRows(true);
    getUserObservations(userId).then((response) => {
      if (response.ok) {
        response.json().then((r) => {
          setRows(r);
        });

      } else {
        return Promise.reject(response);
      }
    })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setLoadingRows(false);
      });
  }


  useEffect(() => {
    fetchAllObservations();
  }, []);

  const navigate = useNavigate();

  return {
    columns: [
      { Header: "titulo", accessor: "title", align: "left" },
      { Header: "contenido", accessor: "text", align: "left" },
      { Header: "creado por", accessor: "createdBy", align: "left" },
      { Header: "fecha de creación", accessor: "createdAt", align: "left" },
      { Header: "ultima vez actualizado", accessor: "updatedAt", align: "left" },
      { Header: "", accessor: "accions", align: "left" },
    ],
    rows:
      rows.map((row) => {
        return {
          title: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => row.photoId ? navigate(`/image/${row.observationId}?view=true`) : navigate("/viewObservation/" + row.observationId)}>
              {row.title}
            </MDTypography>
          ),
          text: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {extractContent(row.text).slice(0, 25) + "..."}
            </MDTypography>
          ),
          createdBy: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" style={{ cursor: 'default' }}>
              {row.createdBy}
            </MDTypography>
          ),
          createdAt: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" style={{ cursor: 'default' }}>
              {moment(row.createdAt).locale('es').format('LLL')}
            </MDTypography>
          ),
          updatedAt: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" style={{ cursor: 'default' }}>
              {moment(row.updatedAt).locale('es').format('LLL')}
            </MDTypography>
          ),
          accions: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => row.photoId ? navigate(`/image/${row.observationId}?edit=true`) : navigate("/editObservation/" + row.observationId)}>
              <Tooltip title="Editar">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </MDTypography>
          ),
        }
      }),
    loading: loadingRows,
  };
}

function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
};

export default GetObservations;
