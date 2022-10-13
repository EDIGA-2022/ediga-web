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
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilePhotosList from "examples/Lists/ProfilePhotosList";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from "react-router-dom";

// API requests
import getUserProfile from "../../api/getUserProfile"
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function User() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [user, setUser] = useState({
    userId,
    country: '',
    photos: [],
    genre: '',
    yearsOld: 0,
    investigated: false,
    investigated: '',
    middleFormAnswers: {},
    endFormAnswers: {},
  });


  useEffect(() => {
    async function fetchUser() {
      await getUserProfile(userId)
        .then((response) => response.json())
        .then(newUser => {
          setUser(newUser);
        });
    }
    fetchUser()
  }, []);

  const navigateToCreateNewObservation = () => {
    // 👇️ navigate to /navigateToCreateNewObservation
    navigate("/createNewObservation/" + userId);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar onArrowClick={() => navigate(-2)}/>
      <MDBox mb={2} />
      <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
        <Tab label="App ediga" />
        <Tab label="Observaciones" />
        <Tab label="Diario de campo" />
      </Tabs>
      {tabValue === 0 && <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} xl={6} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title="Informacion del participante"
              description=""
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={true}
              genre={user.genre}
              country={user.country}
              yearsOld={user.yearsOld}
              middleForm={user.middleFormAnswers}
              endForm={user.endFormAnswers}
            />
            <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
          <Grid item xs={12} xl={6}>
            <ProfilePhotosList title="Imagenes" photos={user.photos} shadow={true} />
          </Grid>
        </Grid>
      </MDBox>}
      {tabValue === 1 &&       <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                style={{ display: "flex" }}
              >
                <MDTypography variant="h6" color="white">
                  Observaciones
                </MDTypography>
                <MDButton variant="outlined" color="white" size="small"  style={{ marginLeft: "auto" }} onClick={navigateToCreateNewObservation}>
                  +
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>}
    </DashboardLayout>
  );
};

export default User;
