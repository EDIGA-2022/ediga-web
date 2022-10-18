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
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfilesList from "examples/Lists/ProfilesList";
import ImageInfoCard from "examples/Cards/InfoCards/ImageInfoCard";

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from "@mui/material/Card";

// API requests
import getUserProfile from "../../api/getUserProfile"
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

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
        answer3 } = state;

    return (
        <DashboardLayout>
            <DashboardNavbar onArrowClick={() => navigate(-1)} />
            <MDBox mb={2} />
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} xl={6} sx={{ display: "flex", height: 400 }}>
                    <img
                        src={`data:image/jpeg;base64,${photo.replaceAll('"', '')}`}
                        loading="lazy"
                        height="350"
                    />
                </Grid>
                <Grid item xs={12} md={12} xl={6} sx={{ display: "flex", height: 400 }}>
                    <ImageInfoCard
                        answer1={answer1}
                        answer2={answer2}
                        answer3={answer3}
                        shadow
                    />
                </Grid>
            </Grid>

        </DashboardLayout>
    );
};

export default UserImage;
