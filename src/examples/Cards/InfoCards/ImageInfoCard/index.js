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
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ImageInfoCard({
    answer1,
    answer2,
    answer3,
    shadow,
    photoSrc,
}) {
    const labels = [
        'Antes de subir esta imagen he reflexionado sobre la idea de mujer, hombre u otros que muestro hacia los demás',
        'Con esta imagen expreso INTENCIONALMENTE mi identidad como chica, chico u otras identidades',
        'En esta imagen me ajusto a lo que esperan de mí como chico, chica u otras identidades',
    ];

    const values = [];
    const { socialMediaColors } = colors;
    const { size } = typography;

    values.push(answer1);
    values.push(answer2);
    values.push(answer3);

    // Render the card info items
    const renderItems = labels.map((label, key) => (
        <MDBox key={label} display="flex" py={1} pr={2}>
            <div style={{ flexDirection: 'column' }}>
                <MDTypography variant="button" fontWeight="bold">
                    {label}: &nbsp;
                </MDTypography>
                <MDTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;{values[key]}
                </MDTypography>
            </div>
        </MDBox>
    ));


    return (
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
            <div style={{ display: "flex", height: '100%' }}>
                <div style={{ maxWidth: '46%' }}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
                        <MDTypography variant="h6" fontWeight="bold" >
                            {"Preguntas que acompañan a la imagen"}
                        </MDTypography>
                    </MDBox>
                    <MDBox p={2}>
                        <MDBox>
                            {renderItems}
                        </MDBox>
                    </MDBox>
                </div>
                <div style={{
                    padding: '20px',
                    maxWidth: '46%',
                    height: '100%'
                }}>
                    <img
                        src={photoSrc}
                        loading="lazy"
                        style={{
                            maxWidth: '100%',
                            objectFit: 'contain',
                            height: '100%'
                        }}
                    />
                </div>
            </div>
        </Card>
    );
}

// Setting default props for the ImageInfoCard
ImageInfoCard.defaultProps = {
    shadow: true,
};

// Typechecking props for the ImageInfoCard
ImageInfoCard.propTypes = {
    answer1: PropTypes.string.isRequired,
    answer2: PropTypes.string.isRequired,
    answer3: PropTypes.string.isRequired,
};

export default ImageInfoCard;
