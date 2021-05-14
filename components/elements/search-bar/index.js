import React from 'react'

import { Input, Select, Form } from 'antd'

const SearchBar = ({
	optionList = [],
	verticalCenter = false,
	haveButton = false,
	placeholder = 'Search for anything'
}) => {
	const initialValues =
		optionList.length > 0
			? {
					filterBy: optionList[0].name
			  }
			: {}

	const onFinish = values => {
		console.log(values)
	}

	return (
		<Form
			onFinish={onFinish}
			initialValues={initialValues}
			className={verticalCenter ? 'search-bar--vcenter' : ''}
		>
			<div className="search-bar">
				<Form.Item name="search">
					<Input.Search
						className="search-bar_input"
						placeholder={placeholder}
					/>
				</Form.Item>

				{optionList.length > 0 ? (
					<Form.Item name="filterBy" className="search-bar_select">
						<Select>
							{optionList.map(option => (
								<Select.Option key={option.value} value={option.value}>
									{option.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				) : null}
			</div>

			{haveButton ? (
				<div className="search-bar_button">
					<button type="submit">Search</button>
				</div>
			) : null}
		</Form>
	)
}

export default SearchBar
