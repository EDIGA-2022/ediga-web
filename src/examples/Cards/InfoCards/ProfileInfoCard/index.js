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

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// genre={user.genre}
// country={user.country}
// yearsOld={user.yearsOld}
// middleForm={user.middleFormAnswers}
// endForm={user.endFormAnswers}

function ProfileInfoCard({
  title,
  description,
  info,
  social,
  action,
  shadow,
  genre,
  country,
  yearsOld,
  middleForm,
  endForm,
  photos
}) {
  const labels = [
    'Genre',
    'Country',
    'Years old',
    'Lo que compartí estos días define lo que soy',
    'Lo que compartí estos días define lo que quiero que vean de mí',
    'He establecido contacto con otras personas a través de Instagram por afinidad de género',
    'Los contenidos de otras personas me han hecho reflexionar sobre mi identidad de género',
  ];

  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  values.push(genre);
  values.push(country);
  values.push(yearsOld);
  values.push(middleForm.answer1);
  values.push(middleForm.answer2);
  values.push(endForm.answer1);
  values.push(endForm.answer2);

  // Render the card info items
  const renderItems = labels.map((label, key) => (
      <MDBox key={label} display="flex" py={1} pr={2}>
        <MDTypography variant="button" fontWeight="bold">
          {label}: &nbsp;
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          &nbsp;{values[key]}
        </MDTypography>
      </MDBox>
  ));


  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {/* <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox> */}
        <MDBox>
          {renderItems}
          {/* <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
