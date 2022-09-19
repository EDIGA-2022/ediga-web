/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import { useNavigate } from 'react-router-dom';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Link } from 'react-router-dom'
import getUsers from "../../../api/getUsers";

function GetUsers() {
  const [originalRows, setOriginalRows] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [loadingRows, setLoadingRows] = React.useState(false);

  const fetchAllUsers = async () => {
    setLoadingRows(true);
    getUsers().then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        let returnList = [];
        data.forEach((element) => {
          returnList.push(element.attribute_values);
        });
        setOriginalRows(returnList);
        setRows(returnList);
      } else {
        return Promise.reject(response);
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      setLoadingRows(false);
    });
  }

  
  const User = ({ image, alias, igUser }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} alias={alias} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {alias}
        </MDTypography>
        <MDTypography variant="caption">{igUser}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Action = ({ view, edit }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {view}
      </MDTypography>
      <MDTypography variant="caption">{edit}</MDTypography>
    </MDBox>
  );

  const navigate = useNavigate();

  return {
    columns: [
      { Header: "usuario", accessor: "user", width: "45%", align: "left" },
      { Header: "edad", accessor: "age", align: "left" },
      { Header: "genero", accessor: "gender", align: "center" },
      { Header: "pais", accessor: "country", align: "center" },
      { Header: "editar", accessor: "editar", align: "center" },
      { Header: "ver", accessor: "ver", align: "center" },
    ],

    rows: [
      {
        user: <User image={team2} name="John Michael" igUser="john@creative-tim.com" />,
        ver: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => navigate("/user")}>
            View
          </MDTypography> 
        ),
        editar: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => navigate("/editUser")}>
            Edit
          </MDTypography> 
        )
      },
      // {
      //   author: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       11/01/19
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      //   function: <Job title="Executive" description="Projects" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       19/09/17
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       24/12/08
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team3} name="Richard Gran" email="richard@creative-tim.com" />,
      //   function: <Job title="Manager" description="Executive" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       04/10/21
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
      // {
      //   author: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      //   function: <Job title="Programator" description="Developer" />,
      //   status: (
      //     <MDBox ml={-1}>
      //       <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
      //     </MDBox>
      //   ),
      //   employed: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       14/09/20
      //     </MDTypography>
      //   ),
      //   action: (
      //     <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
      //       Edit
      //     </MDTypography>
      //   ),
      // },
    ],
  };
}

export default GetUsers;
