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
  action,
  shadow,
  genre,
  country,
  yearsOld,
  middleForm,
  endForm,
  photos
}) {
  const labels1 = [
    'Género',
    'País',
    'Edad',
  ];
  const labels2 = [
    'Lo que compartí estos días define lo que soy',
    'Lo que compartí estos días define lo que quiero que vean de mí',
  ];
  const labels3 = [
    'He establecido contacto con otras personas a través de Instagram por afinidad de género',
    'Los contenidos de otras personas me han hecho reflexionar sobre mi identidad de género',
  ];

  const values1 = [];
  const values2 = [];
  const values3 = [];

  const { socialMediaColors } = colors;
  const { size } = typography;

  values1.push(genre);
  values1.push(country);
  values1.push(yearsOld);
  values2.push(middleForm && middleForm.answer1);
  values2.push(middleForm && middleForm.answer2);
  values3.push(endForm && endForm.answer1);
  values3.push(endForm && endForm.answer2);

  // Render the card info items
  function renderItems(labels, values) {
    return labels.map((label, key) => (
      <MDBox key={label} display="flex" >
        <div style={{ flexDirection: 'column' }}>
          <MDTypography variant="button" fontWeight="bold">
            {label}: &nbsp;
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" color="text">
            &nbsp;{values[key] ? values[key] : "-"}
          </MDTypography>
        </div>
      </MDBox>
    ));
  }

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" >
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox>
          <div>{"Preguntas iniciales"}</div>
          {renderItems(labels1, values1)}
          <Divider />
          {values2.length && <div>{"Preguntas intermedias"}</div>}
          {values2.length && renderItems(labels2, values2)}
          <Divider />
          {values3.length && <div>{"Preguntas finales"}</div>}
          {values3.length && renderItems(labels3, values3)}
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
