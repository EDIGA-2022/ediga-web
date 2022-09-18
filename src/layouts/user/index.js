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
import ProfilesList from "examples/Lists/ProfilesList";

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';

// API requests
import { getUser } from "../../api/getUser"
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function User() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [user, setUser] = useState({
    userId: '',
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
    const userData = await getUser('7a7d8d2b-9a89-4bee-823f-f07b2b50383d');
    setUser(userData);
  }, []);

  console.log("user", user, user.photos)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      {/* <Header> */}
      <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
        <Tab label={"App ediga"} />
        <Tab label="Observaciones" />
        <Tab label="Diario de campo" />
      </Tabs>
      {user.photos.forEach(photo => {
        <div>
          <img src={`data:image/jpeg;base64,${photo.photo}`} />
          {/* <img src={`data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`} /> */}
        </div>

      })}
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          {/* <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid> */}
          <Grid item xs={12} md={12} xl={6} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title="Informacion"
              description=""
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
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
            <ProfilesList title="Imagenes" photos={user.photos} shadow={true} />
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default User;
