import React from 'react'
import Button from '@material-ui/core/Button'
import { Form, Input } from 'antd'
import Rating from '@material-ui/lab/Rating'
import { useRouter } from 'next/router'

const ReviewForm = ({
	userId,
	initialValues = {},
	model,
	modelId,
	submitText,
	fetchMethod,
	onSubmit,
	authRoute
}) => {
	const router = useRouter()

	const rules = {
		title: [
			{
				required: true,
				message: 'Please provide a review title'
			}
		],
		content: [
			{
				required: true,
				message: 'Please provide a review content'
			}
		]
	}

	const [value, setValue] = React.useState(initialValues.rating ?? 0)

	const onFinish = async values => {
		await fetchMethod(`/api/${authRoute}`, {
			...values,
			reviewOn: modelId,
			onModel: model,
			rating: value,
			author: userId
		})

		onSubmit()
		router.push(`/${model.toLowerCase()}s/${modelId}`)
	}

	return (
		<div className="review-form">
			<Form
				onFinish={onFinish}
				initialValues={initialValues}
				className="review-form_form"
			>
				<Form.Item name="title" rules={rules.title}>
					<Input name="title" placeholder="Review title" />
				</Form.Item>

				<Form.Item name="content" rules={rules.content}>
					<Input.TextArea name="content" rows={7} />
				</Form.Item>

				<div className="review-form_rating">
					Rating:&nbsp;
					<Rating
						name="rating"
						value={value}
						precision={0.5}
						onChange={(event, newValue) => {
							setValue(newValue)
						}}
					/>
				</div>

				<div className="review-form-buttons">
					<Button size="large" variant="contained" onClick={onSubmit}>
						Cancel
					</Button>

					<Button
						className="review-form-buttons_button"
						type="submit"
						size="large"
						variant="contained"
					>
						{submitText}
					</Button>
				</div>
			</Form>
		</div>
	)
}

export default ReviewForm
