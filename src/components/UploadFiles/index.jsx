import React from 'react';
import { Upload, Modal } from 'antd';

import filesAPI from '../../api/filesService';

// function getBase64(file) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = error => reject(error);
// 	});
// }

export default class UploadFiles extends React.Component {
	state = {
		// previewVisible: false,
		// previewImage: '',
		// fileList: [
		// 	{
		// 		uid: '-1',
		// 		name: 'image.png',
		// 		status: 'done',
		// 		url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		// 	},
		// 	{
		// 		uid: '-3',
		// 		name: 'image.png',
		// 		status: 'done',
		// 		url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		// 	},
		// ],
	};

	// handleCancel = () => this.setState({ previewVisible: false });

	// handlePreview = async file => {
	// 	if (!file.url && !file.preview) {
	// 		file.preview = await getBase64(file.originFileObj);
	// 	}

	// 	this.setState({
	// 		previewImage: file.url || file.preview,
	// 		previewVisible: true,
	// 	});
	// };

	// handleChange = ({ fileList }) => {
	// 	this.setState({ fileList })
	// 	console.log(fileList)
	// };

	onRemoveFile = data => {
		console.log(data);
		this.props.onRemoveFile(data.file.uid);
                filesAPI.delete(data.file.uid);
        }

	render() {
		// const { 
		// 	// previewVisible, 
		// 	// previewImage, 
		// 	fileList 
		// } = this.state;
		const { attachments } = this.props;

		// const uploadButton = (
		// 	<div>
		// 		<div className="ant-upload-text">Upload</div>
		// 	</div>
		// );

		return (
			<div className="clearfix">
				<Upload
					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
					listType="picture-card"
					fileList={attachments}
					// onPreview={this.handlePreview}
					onChange={this.onRemoveFile}
					// onRemove={this.onFileRemove}
				>
					{/* {fileList.length >= 3 ? null : uploadButton} */}
				</Upload>

				{/* <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal> */}
			</div>
		);
	}
}