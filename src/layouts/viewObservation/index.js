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
import editObservationAPI from "../../api/editObservation";
import getObservationAPI from "../../api/getObservation";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

function ViewObservation() {
  
  const { itemId } = useParams(); 
  const [userId, setUserId] = useState('');
  const [observationId, setObservationId] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('1');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
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

  useEffect(function effectFunction() {

    async function fetchObservation() {
        await getObservationAPI(itemId).then(res => {
          res.json().then(response => {
            setObservationId(itemId);
            setUserId(response.userId);
            setTitle(response.title);
            setType(response.type);
            setLikes(response.likes);
            setComments(response.comments);
            setMusic(response.music);
            setDate(moment(new Date(response.date)).format("YYYY-MM-DD"));
            setHasMusic(response.hasMusic);
            setObservation(response.observation);
            setPhoto(response.edigaUserPhoto);
            setSelectedImage(true);
          })
        });
    }

    fetchObservation();

}, []);

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



  return (
    <DashboardLayout>
      <DashboardNavbar onArrowClick={() => navigate(-2)} />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={11}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Observación</MDTypography>
              </MDBox>
              <form>
                <MDBox p={2}>
                  <MDBox p={1}></MDBox>
                  <TextField id="standard-basic" label="Título de la observación" variant="outlined" value={title} readOnly={true} style = {{width: 650}}/>
                </MDBox>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={4} lg={4}>
                        <MDBox p={2}>
                            <MDTypography color="info" fontWeight="regular" variant="h6">Tipo</MDTypography>
                            <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={type}
                            name="radio-buttons-group"
                            readOnly={true}
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
                            readOnly={true}
                            InputLabelProps={{
                                shrink: true,
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
                            readOnly={true}
                            InputLabelProps={{
                                shrink: true,
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
                            readOnly={true}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                      </MDBox>
                      <MDBox p={1}>
                      <MDBox p={1}></MDBox>
                      <MDBox p={1}></MDBox>
                      <Grid container spacing={2} justifyContent="left">
                        <MDTypography color="info" fontWeight="regular" variant="h6">Contiene música?</MDTypography>
                        <Switch
                            checked={hasMusic}
                            disabled={true}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </Grid>
                        <TextField id="standard-basic" label="Música" variant="standard" value={music} readOnly={true} />
                        </MDBox>
                    </Grid>
                    <MDBox p={2}></MDBox>
                </Grid>   
                <Grid container spacing={1} justifyContent="left">
                    <Grid item xs={4} lg={4}> 
                        <MDBox p={1}>
                                <ReactQuill    value={observation}
                                              readOnly={true}
                                              theme={"bubble"} style = {{width: 650, height: 300}}/>
                        </MDBox>
                    </Grid>
                    <Grid item xs={4} lg={4}>

                    </Grid>
                    <Grid item xs={4} lg={4}>
                        <MDBox p={1}>
                        
                        </MDBox>
                        <MDBox>
                        {selectedImage && photo && (
                        <div>
                          <img style={{width: 400, height: 400}} src={`${photo}`}/>
                          </div>)}
                        </MDBox>
                    </Grid>
                </Grid> 
                <MDBox p={3}></MDBox>            
              </form>
              <MDBox p={2}>
                <MDButton variant="outlined" color="error" size="small"  style={{ marginRight: "auto" }} onClick={() => navigate(-2)}>
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

export default ViewObservation;
