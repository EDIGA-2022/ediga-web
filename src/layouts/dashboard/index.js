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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { useState, useEffect } from "react";

// import metricsApi 
import { getMetrics } from "../../api/getMetrics"
import MDAlert from "components/MDAlert";
import { useNavigate } from 'react-router-dom';





function Dashboard() {
  // total users variable
  const [totalUsers, setTotalUsers] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [trackedUsers, setTrackedUsers] = useState(0);
  const [instagramPercentage, setInstagramPercentage] = useState(0);
  const [gendersBarChartData, setGendersBarChartData] = useState({ labels: [], datasets: [] });
  const [countriesBarChartData, setCountriesBarChartData] = useState({ labels: [], datasets: [] });
  const [agesBarChartData, setAgesBarChartData] = useState({ labels: [], datasets: [] });
  const [middleFormAnswers, setMiddleFormAnswers] = useState({});
  const [endFormAnswers, setEndFormAnswers] = useState({});


  const [data, setData] = useState(false);

  const navigate = useNavigate();


  function setCountriesInChart(countries) {
    var labels = [];
    var datasets = {
      label: "Usuarios",
      data: [],
    };
    countries.forEach(element => {
      labels.push(element.country);
      datasets.data.push(element.amount);
    });

    setCountriesBarChartData({
      labels: labels,
      datasets: datasets,
    });
  }

  function setAgesInChart(ages) {
    var labels = [];
    var datasets = {
      label: "Usuarios",
      data: [],
    };
    ages.forEach(element => {
      labels.push(element.age);
      datasets.data.push(element.amount);
    });

    setAgesBarChartData({
      labels: labels,
      datasets: datasets,
    });
  }

  function setGendersInChart(genders) {
    var labels = [];
    var datasets = {
      label: "Cantidad",
      data: [],
    };

    var otherGenders = 0;
    genders.forEach(element => {
      if (element.genderCode !== 6) {
        labels.push(element.gender);
        datasets.data.push(element.amount);
      } else {
        otherGenders += element.amount;
      }
    });
    labels.push("Otros");
    datasets.data.push(otherGenders);
    setGendersBarChartData({
      labels: labels,
      datasets: datasets,
    });
  }
  const { sales, tasks } = reportsLineChartData;

  useEffect(() => {

    getMetrics().then((response) => {
      if (response.ok) {
        response.json().then(r => {
          setTotalUsers(r.totalUsers);
          setAverageTime(r.averageHours);
          setInstagramPercentage(r.instagramPercentage);
          setCountriesInChart(r.countries);
          setGendersInChart(r.userGenders);
          setAgesInChart(r.userAges);
          setTrackedUsers(r.trackedUsers);
          setMiddleFormAnswers(r.middleFormAnswers);
          setEndFormAnswers(r.endFormAnswers);
          setData(true);
        })
      } else {
        if (response.status === 401) {
          navigate("/authentication/sign-in");
        }
      }
    });


  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        color="grey"
        bgColor="light"
        fontSize={14}
        coloredShadow="light"
        borderRadius="lg"
        mb={3}
        opacity={1}
        p={2}
      ><b>Nota: </b>Los datos mostrados a continuación fueron recopilados de respuestas extraídas de la aplicación móvil de EDIGA.</MDBox>
      {data && <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person"
                title="Cantidad de sujetos"
                count={totalUsers}
                percentage={{
                  color: "success",
                  // amount: "+55%",
                  label: "Sujetos de todos los países",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="access_time"
                title="Tiempo promedio de uso diario"
                count={averageTime + " hora(s)"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Promedio de uso de varias sesiones",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="phone_android"
                title="Sujetos rastreados"
                count={trackedUsers}
                percentage={{
                  color: "success",
                  // amount: "+1%",
                  label: "Usan la aplicación en segundo plano",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="alternate_email"
                title="Cuentas de instagram registradas"
                count={instagramPercentage + "%"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Sujetos que dieron su instagram",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Sujetos por país"
                  // description="Last Campaign Performance"
                  date="Datos actualizados recientemente"
                  chart={countriesBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Géneros"
                  // description="Last Campaign Performance"
                  date="Datos actualizados recientemente"
                  chart={gendersBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="Edades"
                  // description="Last Campaign Performance"
                  date="Datos actualizados recientemente"
                  chart={agesBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Projects middleQuestions={middleFormAnswers} finalQuestions={endFormAnswers} />
        </MDBox>
      </MDBox>}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
