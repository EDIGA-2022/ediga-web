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

import { useState, useEffect } from "react";


// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ImageInfoCard from "examples/Cards/InfoCards/ImageInfoCard";
import TextField from '@mui/material/TextField';
import Divider from "@mui/material/Divider";

// Images
import React from "react";
import 'react-quill/dist/quill.snow.css';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MDButton from "components/MDButton";
import htmlDocx from 'html-docx-js/dist/html-docx'
import { saveAs } from 'file-saver'

// API requests
import createObservation from "../../api/createObservation";
import getObservationAPI from "../../api/getObservation";
import editObservationAPI from "../../api/editObservation";

function UserImage() {
	const navigate = useNavigate();
	const { state } = useLocation();
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const view = !!urlParams.get('view');
	const edit = !!urlParams.get('edit');

	const { imageId } = useParams();

	const [addingObservation, setAddingObservation] = useState(false);
	const [observationText, setObservationText] = useState('');
	const [observationTitle, setObservationTitle] = useState('')
	const [photo, setPhoto] = useState({
		photoId: '',
		photo: '',
		answer1: '',
		answer2: '',
		answer3: '',
		userId: '',
	})

	async function fetchObservation() {
		// the imageId here is the observationId 
		await getObservationAPI(imageId).then(res => {
			res.json().then(response => {
				setPhoto({
					photoId: response.photoId,
					photo: response.photo,
					answer1: response.answer1,
					answer2: response.answer2,
					answer3: response.answer3,
					userId: response.userId,
				})
				setObservationText(response.observation);
				setObservationTitle(response.title);
			})
		});
	}

	useEffect(() => {
		if (!view && !edit) {
			const {
				photoId,
				photo,
				answer1,
				answer2,
				answer3,
				userId,
			} = state;
			setPhoto({
				photoId,
				photo,
				answer1,
				answer2,
				answer3,
				userId,
			})
		} else {
			fetchObservation();
		}
	}, []);

	function exportToWord(e) {
		(async () => {
		  const datosPrevios = "<p><br></p><p><br></p><h2>Respuestas del sujeto</h2><p><strong>Antes de subir esta imagen he reflexionado sobre la idea de mujer, hombre u otros que muestro hacia los demás: </strong>" + photo.answer1 + 
							  "<p><strong>Con esta imagen expreso INTENCIONALMENTE mi identidad como chica, chico u otras identidades: </strong>" + photo.answer2 + 
							  "<p><strong>En esta imagen me ajusto a lo que esperan de mí como chico, chica u otras identidades: </strong>" + photo.answer3 + "</p>";
		  var img = "";
		  if(photo.photo != ''){
			img = "<p><img src=\"" + `data:image/jpeg;base64,${(photo.photo).replaceAll('"', '')}` + "\"></p>";
		  }
		  var observacionImagen = "<p><br></p><p><br></p><h2>Observación del investigador</h2><p><strong>Título: </strong>" + observationTitle + 
		  						  "<p><strong>Texto: </strong>" + observationText + "</p>";
		  const stringACovertir = datosPrevios + img + observacionImagen;
		  const converted = htmlDocx.asBlob(stringACovertir);
		  saveAs(converted, 'observacion.docx');
		})();
	  };

	const modules = {
		toolbar: [
			[{ font: [] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike"],
			[{ color: [] }, { background: [] }],
			[{ script: "sub" }, { script: "super" }],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ indent: "-1" }, { indent: "+1" }, { align: [] }],
			["link", "image", "video"],
			["clean"],
		],
	}

	const onAddObservation = () => {
		setAddingObservation(true);
	}

	const handleObservationTextChange = (value) => {
		setObservationText(value);
	}

	const onCancel = () => {
		if (!edit && !view) {
			setAddingObservation(false);
		} else {
			navigate(`/user/${photo.userId}`,
				{
					state: {
						tab: 1
					}
				}
			);
		}
	}

	const onSave = () => {
		if (!edit) {
			createObservation({
				title: observationTitle,
				photoId: photo.photoId,
				userId: photo.userId,
				observation: observationText,
			}).then(response => {
				navigate(`/user/${photo.userId}`,
					{
						state: {
							tab: 0
						}
					}
				);
			});
			setAddingObservation(false);
		} else {
			editObservationAPI({
				title: observationTitle,
				photoId: photo.photoId,
				userId: photo.userId,
				observation: observationText,
				observationId: imageId,
			}).then(response => {
				navigate(`/user/${photo.userId}`,
					{
						state: {
							tab: 1
						}
					}
				);
			});
		}
	}

	return (
		<DashboardLayout>
			<DashboardNavbar onArrowClick={() =>
				(view || edit) ?
					navigate(`/user/${photo.userId}`,
						{
							state: {
								tab: 1
							}
						}
					)
					: navigate(-1)} />
			<MDBox mb={2} />
			<Grid container spacing={1} sx={{ width: '1600px' }}>
				<Grid item xs={12} md={12} xl={6} sx={{ display: "flex", height: 400 }}>
					<ImageInfoCard
						answer1={photo.answer1}
						answer2={photo.answer2}
						answer3={photo.answer3}
						shadow
						photoSrc={`data:image/jpeg;base64,${(photo.photo).replaceAll('"', '')}`}
					/>
				</Grid>
			</Grid>
			{!addingObservation && !view && !edit && <div style={{ padding: '16px 0' }}>
				<MDButton variant="outlined" color="info" size="small" style={{ marginRight: "auto" }} onClick={() => onAddObservation()}>
					Añadir observacion
				</MDButton>
			</div>}
			{(addingObservation || edit || view) &&
				<>
					<Divider style={{
						width: '45%',
						borderColor: 'black',
						borderWidth: 'thin',
					}} />
					Observación:
					<div>
						<TextField
							style={{ width: '45%', marginTop: '16px' }}
							id="standard-basic"
							label="Titulo"
							variant="standard"
							onChange={(e) => setObservationTitle(e.target.value)}
							InputProps={{
								readOnly: view,
							}}
							value={observationTitle}
						/>
						<MDBox p={2} style={{ padding: '24px 0' }}>
							<Grid >
								<div>
									<ReactQuill
										value={observationText}
										modules={!view ? modules : {}}
										style={{ width: '80%', background: 'white' }}
										theme="snow"
										onChange={handleObservationTextChange}
										readOnly={view}
									/>
								</div>
							</Grid>
						</MDBox>
						{!view &&
							<div style={{ padding: '16px 0' }}>
								<MDButton variant="outlined" color="info" size="small" style={{ marginRight: "16px" }} onClick={() => onSave()}>
									Guardar
								</MDButton>
								<MDButton variant="outlined" color="error" size="small" style={{ marginRight: "auto" }} onClick={() => onCancel()}>
									Cancelar
								</MDButton>
							</div>
						}
						{view &&
							<div style={{ padding: '16px 0' }}>
								<MDButton variant="outlined" color="info" size="small" style={{ marginRight: "auto" }} onClick={exportToWord}>
									Exportar .docx
								</MDButton>
							</div>
						}
					</div>
				</>
			}
		</DashboardLayout >
	);
};

export default UserImage;
