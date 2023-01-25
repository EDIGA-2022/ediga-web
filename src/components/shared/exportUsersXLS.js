import React from 'react';
import MDButton from "components/MDButton";
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Tooltip from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaFileCsv, FaFileExcel } from 'react-icons/fa'

const XLSX = require('xlsx');
const formats = ['Formato CSV (Comma Separated Values File)', 'Formato XLSX (Excel Worksheet)'];

function ExportUsersXLSDialog(props) {
  const { onClose, selectedValue, open, csvData, fileName } = props;
  
  const handleClose = () => {
    onClose(selectedValue);
  }

  const handleListItemClick = (value) => {
    if (value == formats[0]) {
      exportToCSV();
    } else {
      if (value == formats[1]) {
        exportToExcel();
      }
    }
    onClose(value);
  }

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

  const createSheet = () => {
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
    return wb;
  }

  const exportToExcel = () => {
    const wb = createSheet();
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, fileName + '.xlsx');
  };

  const exportToCSV = () => {
    const wb = createSheet();
    const csvBuffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' });
    const data = new Blob([csvBuffer], { type: 'text/x-csv' });
    FileSaver.saveAs(data, fileName + '.csv');
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ fontSize: 18 }}>Opciones Descarga</DialogTitle>
      <List sx={{ pt: 0 }}>
        {formats.map((format) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(format)} key={format}>
              <ListItemText primaryTypographyProps={{fontSize: 16}} primary={format}/>
                {format == formats[0] &&
                <FaFileCsv/>
                }
                {format == formats[1] && 
                  <FaFileExcel/>
                }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

ExportUsersXLSDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  csvData: PropTypes.array.isRequired,
};

const ExportUsersXLS = ({ csvData, fileName })  => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(formats[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
    <Tooltip title="Descargar datos" placement="bottom">
      <MDButton variant="outlined" color="white"  style={{ marginLeft: "auto" }} size="small" onClick={handleClickOpen}>
        <FileDownloadOutlinedIcon />
      </MDButton>
    </Tooltip>
      <ExportUsersXLSDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        csvData={csvData}
        fileName={fileName}
        />
      </>
  );
}

export default ExportUsersXLS;
