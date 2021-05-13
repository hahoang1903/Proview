import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import { Divider, Form } from 'antd'
import Link from 'next/link'
import BrandLogo from '../brand-logo'
import Input from '../input'

const AuthForm = ({
	main = '',
	sub = '',
	formFields = [],
	submitText = '',
	linkText = '',
	linkTo = '/',
	method = axios.post,
	authRoute = '',
	forgotPassword = false
}) => {
	const onFinish = async values => {
		try {
			const res = await method(`/api/auth/${authRoute}`, values)

			console.log(res.data)
		} catch (error) {
			console.log(error.response.data.message)
		}
	}

	return (
		<div className="auth-form">
			<div className="auth-form-logo">
				<BrandLogo width={200} />
			</div>

			<div className="auth-form-title">
				<span className="auth-form-title--main">{main}</span>
				<span className="auth-form-title--sub">{sub}</span>
			</div>

			<Form onFinish={onFinish}>
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

				{forgotPassword ? (
					<div className="auth-form-link auth-form-link--right">
						<Link href="/forgot-password">
							<a>Forgot password?</a>
						</Link>
					</div>
				) : null}

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

export default AuthForm
