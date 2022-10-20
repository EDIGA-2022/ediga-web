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

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MDButton from "components/MDButton";

// API requests
import createObservation from "../../api/createObservation";

function UserImage() {
    const navigate = useNavigate();
    useEffect(() => {

    }, []);

    const { imageId } = useParams();
    const { state } = useLocation();
    const {
        photoId,
        photo,
        answer1,
        answer2,
        answer3,
        userId,
    } = state;

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
    const [addingObservation, setAddingObservation] = useState(false);
    const [observationText, setObservationText] = useState('');

    const onAddObservation = () => {
        setAddingObservation(true);
    }

    const handleObservationTextChange = (value) => {
        setObservationText(value);
    }

    const onCancel = () => {
        setAddingObservation(false);
    }

    const onSave = () => {
        createObservation({
            photoId,
            userId,
            observation: observationText,
        })
        setAddingObservation(false);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar onArrowClick={() => navigate(-1)} />
            <MDBox mb={2} />
            <Grid container spacing={1} sx={{ width: '1600px' }}>
                <Grid item xs={12} md={12} xl={6} sx={{ display: "flex", height: 400 }}>
                    <ImageInfoCard
                        answer1={answer1}
                        answer2={answer2}
                        answer3={answer3}
                        shadow
                        photoSrc={`data:image/jpeg;base64,${photo.replaceAll('"', '')}`}
                    />
                </Grid>
            </Grid>
            {!addingObservation && <div style={{ padding: '16px 0' }}>
                <MDButton variant="outlined" color="info" size="small" style={{ marginRight: "auto" }} onClick={() => onAddObservation()}>
                    Añadir observacion
                </MDButton>
            </div>}
            {addingObservation &&
                <div>
                    <MDBox p={2} style={{ padding: '24px 0' }}>
                        <Grid >
                            <div>
                                <ReactQuill
                                    modules={modules}
                                    style={{ width: '80%', background: 'white' }}
                                    theme="snow"
                                    onChange={handleObservationTextChange}
                                />
                            </div>
                        </Grid>
                    </MDBox>
                    <div style={{ padding: '16px 0' }}>
                        <MDButton variant="outlined" color="info" size="small" style={{ marginRight: "16px" }} onClick={() => onSave()}>
                            Guardar
                        </MDButton>
                        <MDButton variant="outlined" color="error" size="small" style={{ marginRight: "auto" }} onClick={() => onCancel()}>
                            Cancelar
                        </MDButton>
                    </div>
                </div>
            }
        </DashboardLayout>
    );
};

export default UserImage;
