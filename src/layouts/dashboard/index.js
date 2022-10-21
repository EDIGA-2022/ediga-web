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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
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





function Dashboard() {
  // total users variable
  const [totalUsers, setTotalUsers] = useState(0);


  const [gendersBarChartData, setGendersBarChartData] = useState({labels: [], datasets: [] });
  const [countriesBarChartData, setCountriesBarChartData] = useState({ labels: [], datasets: [] });

  const [data, setData] = useState(false);



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
          setTotalUsers(r.totalUsers)
          setCountriesInChart(r.countries);
          setGendersInChart(r.userGenders);
          setData(true);
        })
      }
    });


  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person"
                title="Cantidad de usuarios"
                count={totalUsers}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {data && <ReportsBarChart
                  color="success"
                  title="Usuarios por país"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={countriesBarChartData}
                />}
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {data && <ReportsBarChart
                  color="info"
                  title="Géneros"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={gendersBarChartData}
                />}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
