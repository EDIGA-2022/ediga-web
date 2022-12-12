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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

export default function data(middleQuestions, finalQuestions) {


  const questionArray = () => {
    let questionArray = [];
    // merge middleQuestions and finalQuestions
    let all = middleQuestions.concat(finalQuestions)
    middleQuestions.forEach((question) => {
      questionArray.push(question.question);
    });
    return questionArray;
  }

  const Question = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const answers = (answers) => {
    var allAnswers = "";
    answers.forEach(element => {
      allAnswers += element.answerText + '/'
    })

    allAnswers = allAnswers.substring(0, allAnswers.length - 1);
    return <MDBox display="flex" py={1}>
      {allAnswers}
    </MDBox>;
  }

  return {
    columns: [
      { Header: "pregunta", accessor: "questions", width: "45%", align: "left" },
      { Header: "respuestas", accessor: "answers", width: "10%", align: "left" },
      { Header: "respuesta mas popular", accessor: "popular", align: "center" },
      { Header: "respondidas", accessor: "completion", align: "center" },
    ],




    rows: (middleQuestions ?? []).concat(finalQuestions ?? []).map((question) => {
      return {
        questions: <Question name={question.question} />,
        answers: answers(question.answers),
        popular: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {question.mostPopularAnswer}
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={question.completionPercentage} color="info" variant="gradient" label={false} />
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {question.completionPercentage}%
            </MDTypography>
          </MDBox>

        ),
      };
    }),
  };
}
