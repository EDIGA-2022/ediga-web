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

import { useState } from "react";

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
import createDiaryEntryAPI from "../../api/createDiaryEntry";
import { useNavigate, useParams } from "react-router-dom";
import Quill from 'quill'

function CreateNewDiaryEntry() {

  const { itemId } = useParams();
  const [entry, setEntry] = useState('');
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

  const jsonError = (name) => (
    <MDTypography variant="body2" color="white">
      Error: {name}.
    </MDTypography>
  );

  const jsonSuccess = () => (
    <MDTypography variant="body2" color="white">
      Se ha creado una nueva entrada de diario de campo.
    </MDTypography>
  );

  const submitDiaryEntry = async () => {
    const data = {
      userId: itemId,
      entry: entry,
    }
    createDiaryEntryAPI(data).then(response => {
      setIsSuccess(response.ok);
      setShowMsg(true);
      response.json().then(msg => {
        setJsonResponseMessage(msg.message);
      })
    });
  }

  const Link = Quill.import('formats/link');
  Link.sanitize = function (url) {
    // quill by default creates relative links if scheme is missing.
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`
    }
    return url;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar onArrowClick={() => navigate(-2)} />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Nueva entrada de diario de campo</MDTypography>
              </MDBox>
              <MDBox p={2}>
                <MDButton variant="outlined" color="info" size="small" style={{ marginRight: "auto" }} onClick={submitDiaryEntry}>
                  Exportar .docx
                </MDButton>
              </MDBox>
              <form>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs={12} lg={12}>
                    <MDBox p={1}>
                      <ReactQuill
                        modules={modules}
                        style={{ width: '90%', height: 700, background: 'white' }}
                        theme="snow"
                        onChange={setEntry}
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
              {showMsg && isSuccess && navigate(-1)}
              <MDBox p={2}>
                <MDButton variant="outlined" color="info" size="small" style={{ marginRight: "auto" }} onClick={submitDiaryEntry}>
                  Crear entrada
                </MDButton>
                <MDButton variant="outlined" color="error" size="small" style={{ marginRight: "auto" }} onClick={() => navigate(-2)}>
                  Cancelar
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

export default CreateNewDiaryEntry;
