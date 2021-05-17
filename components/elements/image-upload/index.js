import React from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const ImageUpload = ({ onChange, imgAlt }) => {
	const [state, setState] = React.useState({
		previewVisible: false,
		previewImage: '',
		fileList: []
	})

	const getBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => resolve(reader.result)
		})
	}

	const handleCancel = () => setState({ ...state, previewVisible: false })

	const handlePreview = () => {
		setState({
			...state,
			previewVisible: true
		})
	}

	const handleChange = async ({ fileList }) => {
		const previewImage =
			fileList.length > 0 ? await getBase64(fileList[0].originFileObj) : ''
		setState({ ...state, fileList, previewImage })
		onChange(state.previewImage)
	}

	return (
		<>
			<Upload
				listType="picture-card"
				fileList={state.fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				className="image-upload"
			>
				{state.fileList.length >= 1 ? null : (
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</div>
				)}
			</Upload>

			<Modal
				visible={state.previewVisible}
				title={null}
				footer={null}
				onCancel={handleCancel}
			>
				<img alt={imgAlt} style={{ width: '100%' }} src={state.previewImage} />
			</Modal>
		</>
	)
}

export default ImageUpload
