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

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useNavigate } from "react-router-dom";

function ProfilePhotosList({ title, photos, shadow, userId }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <ImageList sx={{ width: 400, height: 400 }} cols={3} rowHeight={164}>
          {photos && photos.map((item) => (
            <ImageListItem
              style={{ cursor: 'pointer', marginRight: '20px' }}
              key={item.photo}
              onClick={
                () => navigate(
                  `/image/${item.photoId}`,
                  {
                    state: {
                      photoId: item.photoId,
                      userId: item.userId,
                      photo: JSON.stringify(item.photo),
                      answer1: item.answer1,
                      answer2: item.answer2,
                      answer3: item.answer3,
                    }
                  }
                )
              }
            >
              <img
                src={`data:image/jpeg;base64,${item.photo}`}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                // alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </MDBox>
    </Card >
  );
}

// Setting default props for the ProfilePhotosList
ProfilePhotosList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilePhotosList
ProfilePhotosList.propTypes = {
  title: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilePhotosList;
