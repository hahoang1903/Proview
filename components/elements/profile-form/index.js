import React from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Form } from 'antd'
import Input from '../input'
import { useAuthenticate } from '../../../hooks/useAuth'

const ProfileForm = ({
	title = '',
	formFields = [],
	initialValues = {},
	authRoute,
	userId
}) => {
	const router = useRouter()
	const authDispatch = useAuthenticate()
	const [errorMessage, setErrorMessage] = React.useState('')

	const onFinish = async values => {
		try {
			const res = await axios.patch(`/api/auth/${authRoute}`, {
				...values,
				id: userId
			})

			const { user, token } = res.data

			authDispatch({ user, token })
			router.reload()
		} catch (error) {
			setErrorMessage(error.response.data.message)
		}
	}

	const onFormFocus = () => setErrorMessage(null)

	return (
		<div className="profile-form">
			<div className="profile-form_title">{title}</div>

			{errorMessage ? (
				<div className="profile-form_error">
					<span>{errorMessage}</span>
				</div>
			) : null}

			<Form
				onFinish={onFinish}
				onFocus={onFormFocus}
				initialValues={initialValues}
			>
				{formFields.map(field => {
					return (
						<Form.Item key={field.name} name={field.name} rules={field.rules}>
							<Input
								name={field.name}
								label={field.label}
								type={
									field.name.toLowerCase().includes('password')
										? 'password'
										: 'text'
								}
							/>
						</Form.Item>
					)
				})}

				<Button
					className="profile-form_button"
					type="submit"
					size="large"
					variant="contained"
				>
					Update
				</Button>
			</Form>
		</div>
	)
}

ProfileForm.propTypes = {
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			label: PropTypes.string,
			rules: PropTypes.array
		})
	)
}

export default ProfileForm
