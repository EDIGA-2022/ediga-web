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
import htmlDocx from 'html-docx-js/dist/html-docx'
import { saveAs } from 'file-saver'

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// API requests
import editDiaryEntryAPI from "../../api/editDiaryEntry";
import getDiaryEntryAPI from "../../api/getDiaryEntry";
import { useNavigate, useParams } from "react-router-dom";
import Quill from 'quill'

// Dialog
import AlertDialog from '../../components/Dialog';

function EditDiaryEntry() {

  const { itemId } = useParams();
  const [entry, setEntry] = useState('');
  const [userId, setUserId] = useState('');
  const [diaryEntryId, setDiaryEntryId] = useState('');
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  const [editedForm, setEditedForm] = useState(false);
  const [backAlert, setBackAlert] = useState(false);
  const openBackAlert = () => setBackAlert(true);
  const closeBackAlert = () => setBackAlert(false);

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

  const jsonError = (name) => (
    <MDTypography variant="body2" color="white">
      Error: {name}.
    </MDTypography>
  );

  const jsonSuccess = () => (
    <MDTypography variant="body2" color="white">
      Se ha editado la entrada de diario de campo.
    </MDTypography>
  );

  const submitDiaryEntry = async () => {
    const data = {
      entryId: itemId,
      entry: entry,
    }
    editDiaryEntryAPI(data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage(msg.message);
      })
    });
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

  const goBack = (displayText) => {
    navigate(`/user/${userId}`,
      {
        state: {
          tab: 2,
          displayText,
        }
      }
    )
  }

  return (
    <DashboardLayout>
      <DashboardNavbar
        onArrowClick={
          () => {
            if (editedForm) {
              openBackAlert()
            } else {
              goBack(null);
            }
          }
        }
      />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5" style={{ marginLeft: "16px" }} >Editar entrada de diario de campo</MDTypography>
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
                        modules={modules}
                        value={entry}
                        style={{ width: '90%', height: 500, background: 'white' }}
                        theme="snow"
                        onChange={(e) => {
                          setEntry(e);
                          setEditedForm(true);
                        }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox p={3}></MDBox>
              </form>
              {showMsg && !isSuccess && <MDBox pt={2} px={2}>
                <MDAlert color="error">
                  {jsonError(jsonResponseMessage)}
                </MDAlert>
              </MDBox>}
              {showMsg && isSuccess && navigate(`/user/${userId}`,
                {
                  state: {
                    tab: 2
                  }
                }
              )}
              <MDBox p={4}>
                <MDButton
                  variant="outlined"
                  color="dark"
                  size="small"
                  onClick={
                    () => {
                      if (editedForm) {
                        openBackAlert()
                      } else {
                        goBack(null);
                      }
                    }
                  }
                >
                  Cancelar
                </MDButton>
                <MDButton
                  variant="contained"
                  color="dark"
                  size="small"
                  style={{ marginRight: "16px", marginLeft: "16px" }}
                  onClick={submitDiaryEntry}
                >
                  Guardar
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <AlertDialog
        open={backAlert && editedForm}
        handleClose={closeBackAlert}
        title={"Todos los cambios no guardados se perderán"}
        agreeText={"Continuar"}
        handleClickAgree={() => goBack(null)}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default EditDiaryEntry;
