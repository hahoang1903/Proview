import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Form, Row, Col, Image } from 'antd'
import Input from '../input'
import ImageUpload from '../image-upload'
import { useAuthState } from '../../../hooks/useAuth'

const ResourceForm = ({
	title = '',
	formFields = [],
	initialValues = {},
	route,
	submitText,
	fetchMethod
}) => {
	const router = useRouter()
	const { user } = useAuthState()

	React.useEffect(() => {
		if (!user) {
			router.push('/')
		}
	}, [])

	const [state, setState] = React.useState({
		successMessage: null,
		errorMessage: null,
		imageUrl: '',
		upload: false
	})

	const onFinish = async values => {
		try {
			const res = await fetchMethod(`/api/${route}`, {
				...values,
				image: state.imageUrl ? state.imageUrl : initialValues.image,
				creator: user._id
			})

			const data = res.data

			setState({
				...state,
				successMessage: data.message,
				errorMessage: null
			})
			router.reload()
		} catch (error) {
			setState({
				...state,
				successMessage: null,
				errorMessage: error.response.data.message
			})
		}
	}

	const onFormFocus = () => {
		setState({
			...state,
			errorMessage: null,
			successMessage: null
		})
	}

	const onImageChange = imageUrl => {
		setState({ ...state, imageUrl })
	}

	return (
		<div className="resource-form">
			<div className="resource-form_title">{title}</div>

			{state.errorMessage ? (
				<div className="resource-form_error">
					<span>{state.errorMessage}</span>
				</div>
			) : state.successMessage ? (
				<div className="resource-form_success">
					<span>{state.successMessage}</span>
				</div>
			) : null}

			<Row>
				<Col xs={24} md={5}>
					{initialValues.image ? (
						state.upload ? (
							<ImageUpload imgAlt="Resource image" onChange={onImageChange} />
						) : (
							<Image src={initialValues.image} width={190} />
						)
					) : (
						<ImageUpload imgAlt="Resource image" onChange={onImageChange} />
					)}

					{initialValues.image && state.upload ? (
						<div className="resource-form-upload-buttons">
							<Button
								variant="contained"
								className="resource-form-upload-buttons_button"
								onClick={() =>
									setState({ ...state, upload: false, imageUrl: '' })
								}
							>
								Cancel
							</Button>
						</div>
					) : initialValues.image ? (
						<div className="resource-form-upload-buttons">
							<Button
								variant="contained"
								className="resource-form-upload-buttons_button resource-form-upload-buttons_button--primary"
								onClick={() => setState({ ...state, upload: true })}
							>
								Upload
							</Button>
						</div>
					) : null}
				</Col>

				<Col xs={24} md={19}>
					<Form
						onFinish={onFinish}
						onFocus={onFormFocus}
						initialValues={initialValues}
						className="resource-form_form"
					>
						{formFields.map(field => {
							return (
								<Form.Item
									key={field.name}
									name={field.name}
									rules={field.rules}
								>
									<Input
										name={field.name}
										label={field.label}
										type={field.type}
										inputProps={field.inputProps}
									/>
								</Form.Item>
							)
						})}

						<div className="resource-form-buttons">
							<Button size="large" variant="contained">
								<Link href={`/users/${user ? user._id : null}/my-posts`}>
									<a>Cancel</a>
								</Link>
							</Button>

							<Button
								className="resource-form-buttons_button"
								type="submit"
								size="large"
								variant="contained"
							>
								{submitText}
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</div>
	)
}

ResourceForm.propTypes = {
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			label: PropTypes.string,
			rules: PropTypes.array,
			inputProps: PropTypes.object
		})
	)
}

export default ResourceForm
