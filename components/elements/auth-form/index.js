import React from 'react'
import Button from '@material-ui/core/Button'
import { Divider } from 'antd'
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
	forgotPassword = false
}) => {
	return (
		<div className="auth-form">
			<div className="auth-form-logo">
				<BrandLogo width={200} />
			</div>

			<div className="auth-form-title">
				<span className="auth-form-title--main">{main}</span>
				<span className="auth-form-title--sub">{sub}</span>
			</div>

			<form>
				{formFields.map(field => {
					return (
						<Input
							key={field.name}
							name={field.name}
							type={
								field.name.toLowerCase() == 'password' ? 'password' : 'text'
							}
						/>
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
			</form>

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
