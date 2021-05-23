import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const CloudinaryWidget = (props) => {
	const [isUploaded, setUploaded] = useState(props.image);

	// cloudinary widget
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
				// check if upload successful
				if (response.event === 'success') {
					// store image url
					props.getImageUrl(response.info.secure_url);
					// change upload status to render button appearance
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
