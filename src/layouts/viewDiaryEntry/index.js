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

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import Switch from '@mui/material/Switch';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API requests
import editDiaryEntryAPI from "../../api/editDiaryEntry";
import getDiaryEntryAPI from "../../api/getDiaryEntry";
import { useNavigate, useParams } from "react-router-dom";
import Quill from 'quill'
import htmlDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver'

function ViewDiaryEntry() {
  const { itemId } = useParams();
  const [entry, setEntry] = useState('');
  const [userId, setUserId] = useState('');
  const [diaryEntryId, setDiaryEntryId] = useState('');
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  }

  useEffect(function effectFunction() {
    async function fetchDiaryEntry() {
      await getDiaryEntryAPI(itemId).then(res => {
        res.json().then(response => {
          setDiaryEntryId(itemId);
          setUserId(response.userId);
          setEntry(response.entry);
        })
      });
    }
    fetchDiaryEntry();
  }, []);

  const Link = Quill.import('formats/link');
  Link.sanitize = function (url) {
    // quill by default creates relative links if scheme is missing.
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`
    }
    return url;
  }

  function exportToWord(e) {
    (async () => {
      const converted = htmlDocx.asBlob(entry);
      saveAs(converted, 'entradaDiarioCampo.docx');
    })();
  }

  return (
    <DashboardLayout>
      <DashboardNavbar
        onArrowClick={() =>
          navigate(`/user/${userId}`,
            {
              state: {
                tab: 2
              }
            }
          )
        }
      />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" style={{ marginLeft: "16px" }}>Entrada de diario de campo</MDTypography>
              </MDBox>
              <MDBox p={2}>
                <MDButton variant="outlined" color="info" size="small" style={{ marginLeft: "16px" }} onClick={exportToWord}>
                  Exportar .docx
                </MDButton>
              </MDBox>
              <form>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs={12} lg={12}>
                    <MDBox p={4}>
                      <ReactQuill
                        value={entry}
                        readOnly={true}
                        style={{ width: '90%', height: 500, background: 'white' }}
                        theme={"bubble"} />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox p={3}></MDBox>
              </form>
              <MDBox p={2}>
                <MDButton
                  variant="outlined"
                  color="dark"
                  size="small"
                  style={{ marginRight: "auto", marginLeft: "16px" }}
                  onClick={() =>
                    navigate(`/user/${userId}`,
                      {
                        state: {
                          tab: 2
                        }
                      }
                    )
                  }
                >
                  Volver
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewDiaryEntry;
