import React from 'react';
import MDButton from "components/MDButton";
import FileSaver from 'file-saver';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Tooltip from '@mui/material/Tooltip';

const XLSX = require('xlsx');

const ExportUsersXLS = ({ csvData, fileName }) => {
  const actualData = csvData.map((c) => ({
    userId: c.userId,
    alias: c.alias,
    instagramProfile: c.instagramProfile,
    gender: c.gender,
    country: c.country,
    yearsOld: c.yearsOld,
    dateMiddleForm: c.dateMiddleForm,
    middleForm1: c.middleForm1,
    middleForm2: c.middleForm2,
    dateEndForm: c.dateEndForm,
    endForm1: c.endForm1,
    endForm2: c.endForm2,
  }));

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const Heading = [
    {
      userId: 'Identificador de sujeto',
      alias: 'Alias',
      instagramProfile: 'Cuenta de Instagram',
      gender: 'Genero',
      country: 'Pais',
      yearsOld: 'Edad',
      dateMiddleForm: 'Fecha de respuesta cuestionario intermedio',
      middleForm1: 'Lo que compartí en estos días define lo que soy?',
      middleForm2: 'Lo que compartí estos días define lo que quiero que vean de mí?',
      dateEndForm: 'Fecha de respuesta cuestionario final',
      endForm1: 'He establecido contacto con otras personas por afinidad de género',
      endForm2: 'Los contenidos de otras personas me han hecho reflexionar sobre mi identidad de género'
    },
  ];

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ['userId', 'alias', 'instagramProfile', 'gender', 'country', 'yearsOld', 'dateMiddleForm', 'middleForm1', 'middleForm2', 'dateEndForm', 'endForm1', 'endForm2'],
      skipHeader: true,
      origin: 0, //ok
    });
    XLSX.utils.sheet_add_json(ws, actualData, {
      header: ['userId', 'alias', 'instagramProfile', 'gender', 'country', 'yearsOld', 'dateMiddleForm', 'middleForm1', 'middleForm2', 'dateEndForm', 'endForm1', 'endForm2'],
      skipHeader: true,
      origin: -1, //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Tooltip title="Descargar datos Sujetos xlsx" placement="bottom">
      <MDButton variant="outlined" color="white" size="small" onClick={() => exportToCSV()}>
        <FileDownloadOutlinedIcon />
      </MDButton>
    </Tooltip>
  );
};

export default ExportUsersXLS;

