import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const CloudinaryWidget = (props) => {
	const [isUploaded, setUploaded] = useState();

	const openWidget = () => {
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: process.env.REACT_APP_CLOUNDIARY_CLOUD_NAME,
				uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
				multiple: false,
				singleUploadAutoClose: false,
				showAdvancedOptions: false,
				showCompletedButton: true,
				defaultSource: 'local',
				sources: [
					'local',
					'camera',
					'google_drive',
					'facebook',
					'instagram',
					'url',
				],
			},
			(error, response) => {
				if (response.event === 'success') {
					//props.getImageUrl(response.info.secure_url);
					setUploaded({ isUploaded: true });
				} else {
					console.log(error);
				}
			}
		);
		widget.open(); // open up the widget after creation
	};

	return (
		<Button
			color='primary'
			variant={isUploaded ? 'contained' : 'outlined'}
			onClick={openWidget}
		>
			{isUploaded ? 'Image Uploaded' : 'Upload Image'}
		</Button>
	);
};

export default CloudinaryWidget;
