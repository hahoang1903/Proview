import React from 'react'
import Button from '@material-ui/core/Button'
import { Divider, Form } from 'antd'
import Link from 'next/link'
import BrandLogo from '../brand-logo'
import Input from '../input'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const AuthForm = ({
	main = '',
	sub = '',
	formFields = [],
	submitText = '',
	linkText = '',
	linkTo = '/',
	fetchMethod,
	authRoute = '',
	useAuthDispatch
}) => {
	const router = useRouter()
	const authDispatch = useAuthDispatch()
	const [errorMessage, setErrorMessage] = React.useState('')

	const onFinish = async values => {
		try {
			const res = await fetchMethod(`/api/auth/${authRoute}`, values)

			const { user, token } = res.data

			authDispatch({ user, token })
			router.push('/')
		} catch (error) {
			setErrorMessage(error.response.data.message)
		}
	}

	const onFormFocus = () => setErrorMessage(null)

	return (
		<div className="auth-form">
			<div className="auth-form-logo">
				<BrandLogo width={200} />
			</div>

			<div className="auth-form-title">
				<span className="auth-form-title--main">{main}</span>
				<span className="auth-form-title--sub">{sub}</span>
			</div>

			{errorMessage ? (
				<div className="auth-form-error">
					<span>{errorMessage}</span>
				</div>
			) : null}

			<Form onFinish={onFinish} onFocus={onFormFocus}>
				{formFields.map(field => {
					return (
						<Form.Item key={field.name} name={field.name} rules={field.rules}>
							<Input
								name={field.name}
								label={field.label}
								type={
									field.name.toLowerCase() == 'password' ? 'password' : 'text'
								}
							/>
						</Form.Item>
					)
				})}

				<Button
					className="auth-form-button"
					type="submit"
					size="large"
					variant="contained"
				>
					{submitText}
				</Button>
			</Form>

			<div className="auth-form-policy">
				This site is protected by hCaptcha and its&nbsp;
				<a
					href="https://www.hcaptcha.com/privacy"
					target="_blank"
					className="auth-form-link"
				>
					Privacy Policy
				</a>
				&nbsp; and&nbsp;
				<a
					href="https://www.hcaptcha.com/terms"
					target="_blank"
					className="auth-form-link"
				>
					Terms of Service
				</a>{' '}
				apply.
			</div>

			<Divider className="auth-form-divider">Or</Divider>

			<div className="auth-form-link auth-form-link--uppercase">
				<Link href={linkTo}>
					<a>{linkText}</a>
				</Link>
			</div>
		</div>
	)
}

AuthForm.propTypes = {
	fetchMethod: PropTypes.func.isRequired,
	useAuthDispatch: PropTypes.func.isRequired,
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			label: PropTypes.string,
			rules: PropTypes.array
		})
	)
}

export default AuthForm
