import React from 'react';
import MDButton from "components/MDButton";
import htmlDocx from 'html-docx-js/dist/html-docx'
import { saveAs } from 'file-saver'
import Tooltip from '@mui/material/Tooltip';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import moment from 'moment';

const ExportDiaryEntries = ({ data, fileName }) => {

  function exportToWord() {
    (async () => {
      var entradas = ""
      data.map((c) => {
        entradas = entradas + "<p><br></p><p><br></p><h2>Nueva entrada de diario de campo</h2><p><strong>Fecha de creación: </strong>" + (moment(new Date(c.createdAt)).format("YYYY-MM-DD")) + 
        "<p><strong>Última modificación: </strong>" + (moment(new Date(c.updatedAt)).format("YYYY-MM-DD")) + 
        "<p><strong>Entrada: </strong>" + c.entry + "</p>";
      });
      const converted = htmlDocx.asBlob(entradas);
      saveAs(converted, fileName + '.docx');
    })();
  };

  return (
    <Tooltip title="Descargar entradas de diario de campor en formato DOCX" placement="bottom">
      <MDButton variant="outlined" color="white" size="small" onClick={() => exportToWord()}>
        <FileDownloadOutlinedIcon />
      </MDButton>
    </Tooltip>
  );
};

export default ExportDiaryEntries;

