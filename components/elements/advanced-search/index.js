import React from 'react'
import Input from '../input'
import Button from '@material-ui/core/Button'
import { Row, Col, Form } from 'antd'
import Select from '../select'
import axios from 'axios'

const AdvancedSearch = ({
	onFinished,
	formFields = [],
	submitText = 'Submit search'
}) => {
	const onFinish = async values => {
		var books = []
		var movies = []

		const type = values.type ?? 'all'
		switch (type) {
			case 'all':
				books = (
					await axios.get('http://localhost:3000/api/books', {
						params: { ...values, sortBy: values.sortBy ?? 'name' }
					})
				).data.data

				movies = (
					await axios.get('http://localhost:3000/api/movies', {
						params: { ...values, sortBy: values.sortBy ?? 'name' }
					})
				).data.data
				break

			case 'book':
				books = (
					await axios.get('http://localhost:3000/api/books', {
						params: { ...values, sortBy: values.sortBy ?? 'name' }
					})
				).data.data
				break

			case 'movie':
				movies = (
					await axios.get('http://localhost:3000/api/movies', {
						params: { ...values, sortBy: values.sortBy ?? 'name' }
					})
				).data.data
				break
		}

		onFinished({ books, movies })
	}

	const capitalize = name => name[0].toUpperCase() + name.slice(1)

	return (
		<Form layout="vertical" className="advanced-search" onFinish={onFinish}>
			<Row gutter={{ xs: 0, md: 6 }}>
				{formFields.map(field =>
					field.name ? (
						<Col key={field.name} xs={field.size.xs} md={field.size.md}>
							{typeof field.note != 'undefined' ? (
								<div>{field.note}</div>
							) : null}
							<Form.Item name={field.name}>
								{field.type == 'select' ? (
									<Select
										name={field.name}
										label={field.label ?? capitalize(field.name)}
										optionList={field.optionList}
									/>
								) : (
									<Input
										name={field.name}
										label={field.label ?? capitalize(field.name)}
										type={field.type}
										inputProps={field.inputProps}
									/>
								)}
							</Form.Item>
						</Col>
					) : (
						<Col key="space" xs={0} md={3} />
					)
				)}
			</Row>

			<Row className="advanced-search_button-wrap">
				<Button
					type="submit"
					variant="contained"
					className="advanced-search_button"
					size="large"
				>
					{submitText}
				</Button>
			</Row>
		</Form>
	)
}

export default AdvancedSearch
