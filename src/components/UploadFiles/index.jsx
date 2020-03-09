import React from 'react';
import { Upload } from 'antd';

import filesAPI from '../../api/filesService';


export default class UploadFiles extends React.Component {

	onRemoveFile = data => {
		console.log(data);
		this.props.onRemoveFile(data.file.uid);
                filesAPI.delete(data.file.uid);
        }

	render() {
		const { attachments } = this.props;

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
			</div>
		);
	}
}