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

// Dialog
import AlertDialog from '../../components/Dialog';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import moment from 'moment';

// API requests
import createObservationAPI from "../../api/createObservation";
import { useNavigate, useParams } from "react-router-dom";
import Quill from 'quill'

function CreateNewObservation() {

  const { itemId } = useParams();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('P');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [date, setDate] = useState('');
  const [music, setMusic] = useState('');
  const [hasMusic, setHasMusic] = useState(false);
  const [observation, setObservation] = useState('');
  const [photo, setPhoto] = useState('');
  const [selectedImage, setSelectedImage] = useState(false);
  const [jsonResponseMessage, setJsonResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();
  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [editedForm, setEditedForm] = useState(false);
  const [backAlert, setBackAlert] = useState(false);
  const openBackAlert = () => setBackAlert(true);
  const closeBackAlert = () => setBackAlert(false);

  function handleHasMusicChange() {
    if (hasMusic) {
      setHasMusic(false);
    }
    else {
      setHasMusic(true);
    }
  };

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
      Se ha creado una nueva observación.
    </MDTypography>
  );

  const submitObservation = async () => {
    const data = {
      userId: itemId,
      title: title,
      type: type,
      likes: likes,
      comments: comments,
      music: music,
      date: date,
      hasMusic: hasMusic,
      observation: observation,
      edigaUserPhoto: photo
    }
    createObservationAPI(data).then(response => {
      response.json().then(msg => {
        goBack(msg.message);
      })
    });
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setPhoto(base64);
    setSelectedImage(true);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const Link = Quill.import('formats/link');
  Link.sanitize = function (url) {
    // quill by default creates relative links if scheme is missing.
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`
    }
    return url;
  }

  const goBack = (displayText) => {
    navigate(`/user/${itemId}`,
      {
        state: {
          tab: 1,
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
      <MDBox mt={2} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Nueva observación</MDTypography>
              </MDBox>
              <form>
                <MDBox p={2}>
                  <MDBox p={1}></MDBox>
                  <TextField
                    id="standard-basic"
                    label="Título de la observación"
                    variant="outlined"
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setEditedForm(true);
                    }}
                    style={{ width: 650 }}
                  />
                </MDBox>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={4} lg={4}>
                    <MDBox p={2}>
                      <MDTypography color="info" fontWeight="regular" variant="h6">Tipo</MDTypography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="P"
                        name="radio-buttons-group"
                        onChange={(e) => {
                          setType(e.target.value);
                          setEditedForm(true);
                        }}
                      >
                        <FormControlLabel value="P" control={<Radio />} label="Publicación" />
                        <FormControlLabel value="S" control={<Radio />} label="Historia" />
                        <FormControlLabel value="R" control={<Radio />} label="Reel" />
                        <FormControlLabel value="L" control={<Radio />} label="Live" />
                      </RadioGroup>
                    </MDBox>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <MDBox p={2}>
                      <MDTypography color="info" fontWeight="regular" variant="h6">Cantidad de likes</MDTypography>
                      <MDBox p={1}></MDBox>
                      <TextField
                        id="outlined-number"
                        label="Likes"
                        type="number"
                        value={likes}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setLikes(e.target.value);
                          setEditedForm(true);
                        }}
                      />
                    </MDBox>
                    <MDBox p={2}>
                      <MDTypography color="info" fontWeight="regular" variant="h6">Cantidad de comentarios</MDTypography>
                      <MDBox p={1}></MDBox>
                      <TextField
                        id="outlined-number"
                        label="Comentarios"
                        type="number"
                        value={comments}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setComments(e.target.value);
                          setEditedForm(true);
                        }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={4} lg={4}>
                    <MDBox p={2}>
                      <MDTypography color="info" fontWeight="regular" variant="h6">Fecha de publicación</MDTypography>
                      <MDBox p={1}></MDBox>
                      <TextField
                        id="outlined-number"
                        label="Fecha"
                        type="date"
                        value={date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setEditedForm(true);
                        }}
                        inputProps={{ max: today }}
                      />
                    </MDBox>
                    <MDBox p={1}>
                      <MDBox p={1}></MDBox>
                      <MDBox p={1}></MDBox>
                      <Grid container spacing={2} justifyContent="left">
                        <MDTypography color="info" fontWeight="regular" variant="h6">Contiene música?</MDTypography>
                        <Switch
                          checked={hasMusic}
                          onChange={handleHasMusicChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </Grid>
                      <TextField id="standard-basic" label="Música" variant="standard" onChange={(e) => setMusic(e.target.value)} disabled={!hasMusic} />
                    </MDBox>
                  </Grid>
                  <MDBox p={2}></MDBox>
                </Grid>
                <Grid container spacing={2} >
                  <Grid item xs={4.5} lg={4.5} justifyContent="left">
                    <MDBox p={1}>
                      <ReactQuill theme="snow"
                        modules={modules}
                        value={observation}
                        onChange={(e) => {
                          setObservation(e);
                          setEditedForm(true);
                        }}
                        style={{ width: '180%', height: 300, aspectRatio: 1 }} />
                    </MDBox>
                  </Grid>

                  <Grid item xs={4} lg={4} style={{ marginLeft: '28%' }} justifyContent="right">
                    <MDBox p={1}>
                      <TextField
                        id="edigaUserPhoto"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        label="Foto"
                        name="photo"
                        onChange={e => {
                          handleFileRead(e);
                          setEditedForm(true);
                        }}
                        size="small"
                        variant="standard"
                      />
                    </MDBox>
                    <MDBox>
                      {selectedImage && (
                        <div>
                          <img style={{ width: '80%', aspectRatio: 1 }} src={`${photo}`} />
                        </div>)}
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
              {showMsg && isSuccess && <MDBox pt={2} px={2}>
                {navigate(`/user/${itemId}`,
                  {
                    state: {
                      tab: 1
                    }
                  }
                )}
              </MDBox>}
              <MDBox p={2}>
                <MDButton
                  variant="outlined"
                  color="dark"
                  size="small"
                  style={{ marginRight: "16px", marginTop: "25px" }}
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
                <MDButton variant="contained" color="dark" size="small" style={{ marginRight: "auto", marginTop: "25px" }} onClick={submitObservation}>
                  Crear observación
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

export default CreateNewObservation;
