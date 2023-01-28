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
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ImageInfoCard from "examples/Cards/InfoCards/ImageInfoCard";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MDButton from "components/MDButton";

// Dialog
import AlertDialog from '../../components/Dialog';

// API requests
import createObservation from "../../api/createObservation";
import getObservationAPI from "../../api/getObservation";
import editObservationAPI from "../../api/editObservation";
import deleteObservationAPI from "../../api/deleteObservation";

function UserImage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const view = !!urlParams.get('view');
  const edit = !!urlParams.get('edit');

  const { imageId } = useParams();

  const [addingObservation, setAddingObservation] = useState(false);
  const [observationText, setObservationText] = useState('');
  const [observationTitle, setObservationTitle] = useState('');
  const [photo, setPhoto] = useState({
    photoId: '',
    photo: '',
    answer1: '',
    answer2: '',
    answer3: '',
    userId: '',
  });
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [editedForm, setEditedForm] = useState(false);
  const [backAlert, setBackAlert] = useState(false);

  const openBackAlert = () => setBackAlert(true);
  const closeBackAlert = () => setBackAlert(false);


  async function fetchObservation() {
    // the imageId here is the observationId 
    await getObservationAPI(imageId).then(res => {
      res.json().then(response => {
        setPhoto({
          photoId: response.photoId,
          photo: response.photo,
          answer1: response.answer1,
          answer2: response.answer2,
          answer3: response.answer3,
          userId: response.userId,
        })
        setObservationText(response.observation);
        setObservationTitle(response.title);
      })
    });
  }

  useEffect(() => {
    if (!view && !edit) {
      const {
        photoId,
        photo,
        answer1,
        answer2,
        answer3,
        userId,
      } = state;
      setPhoto({
        photoId,
        photo,
        answer1,
        answer2,
        answer3,
        userId,
      })
    } else {
      fetchObservation();
    }
  }, []);

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

  const onAddObservation = () => {
    setAddingObservation(true);
  }

  const handleObservationTextChange = (value) => {
    setObservationText(value);
  }

  const onCancel = () => {
    if (!edit && !view) {
      setAddingObservation(false);
    } else {
      if (editedForm) {
        openBackAlert();
      } else {
        goBack(null);
      }
    }
  }

  const onSave = async () => {
    if (!edit) {
      createObservation({
        title: observationTitle,
        photoId: photo.photoId,
        userId: photo.userId,
        observation: observationText,
      }).then(response => {
        navigate(`/user/${photo.userId}`,
          {
            state: {
              tab: 0
            }
          }
        );
      });
      setAddingObservation(false);
    } else {
      editObservationAPI({
        title: observationTitle,
        photoId: photo.photoId,
        userId: photo.userId,
        observation: observationText,
        observationId: imageId,
      }).then(response => {
        response.json().then(msg => {
          goBack(msg.message);
        })
      });
    }
  }


  const openDeleteAlert = () => setDeleteAlert(true);
  const closeDeleteAlert = () => setDeleteAlert(false);

  const deleteObservation = async () => {
    deleteObservationAPI(imageId).then(response => {
      response.json().then(msg => {
        goBack(msg.message);
      })
    });
  }

  const goBack = (displayText) => {
    navigate(`/user/${photo.userId}`,
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
      <DashboardNavbar onArrowClick={() => {
        if (view || edit) {
          if (editedForm) {
            openBackAlert();
          } else {
            goBack(null);
          }
        } else {
          navigate(`/user/${photo.userId}`,
            {
              state: {
                tab: 0,
                displayText: null,
              }
            }
          )
        }
      }}
      />
      <MDBox mb={2} />
      <Grid container spacing={1} sx={{ width: '1600px' }}>
        <Grid item xs={12} md={12} xl={6} sx={{ display: "flex", height: 400 }}>
          <ImageInfoCard
            answer1={photo.answer1}
            answer2={photo.answer2}
            answer3={photo.answer3}
            shadow
            photoSrc={`data:image/jpeg;base64,${(photo.photo).replaceAll('"', '')}`}
          />
        </Grid>
      </Grid>
      {!addingObservation && !view && !edit && <div style={{ padding: '16px 0' }}>
        <MDButton variant="contained" color="dark" size="small" style={{ marginRight: "auto" }} onClick={() => onAddObservation()}>
          Añadir observacion
        </MDButton>
      </div>}
      {(addingObservation || edit || view) &&
        <>
          <Divider style={{
            width: '45%',
            borderColor: 'black',
            borderWidth: 'thin',
          }} />
          <div>
            <>Observación:</>
            {edit && <MDButton
              variant="outlined"
              color="error"
              size="small"
              style={{
                height: '1.4375em',
                margin: '16px',
                marginLeft: '44%',
              }}
              onClick={openDeleteAlert}
            >
              Eliminar observación
            </MDButton>}
          </div>
          <div>
            <TextField
              style={{ width: '45%', marginTop: '16px' }}
              id="standard-basic"
              label="Titulo"
              variant="standard"
              onChange={(e) => {
                setObservationTitle(e.target.value);
                setEditedForm(true);
              }}
              InputProps={{
                readOnly: view,
              }}
              value={observationTitle}
            />
            <MDBox p={2} style={{ padding: '24px 0' }}>
              <Grid >
                <div>
                  <ReactQuill
                    value={observationText}
                    modules={!view ? modules : {}}
                    style={{ width: '80%', background: 'white' }}
                    theme="snow"
                    onChange={(e) => {
                      handleObservationTextChange(e);
                      setEditedForm(true);
                    }}
                    readOnly={view}
                  />
                </div>
              </Grid>
            </MDBox>
            {!view &&
              <div style={{ padding: '16px 0' }}>
                <MDButton
                  variant="outlined"
                  color="dark"
                  size="small"
                  style={{ marginRight: "16px" }}
                  onClick={onCancel}
                >
                  Cancelar
                </MDButton>
                <MDButton
                  variant="contained"
                  color="dark"
                  size="small"
                  style={{ marginRight: "auto", width: '99px' }}
                  onClick={() => onSave()}
                >
                  Guardar
                </MDButton>
              </div>
            }
          </div>
          <AlertDialog
            open={deleteAlert}
            handleClose={closeDeleteAlert}
            title={"Esta seguro que desea eliminar la observacion?"}
            description={"Al eliminar la observacion no podra volver a acceder a ella ni recuperarla luego."}
            agreeText={"Eliminar"}
            handleClickAgree={() => {
              closeDeleteAlert();
              deleteObservation();
            }}
          />
          <AlertDialog
            open={backAlert && editedForm}
            handleClose={closeBackAlert}
            title={"Todos los cambios no guardados se perderán"}
            agreeText={"Continuar"}
            handleClickAgree={() => goBack(null)}
          />
        </>
      }
    </DashboardLayout >
  );
};

export default UserImage;
