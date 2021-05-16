import React from 'react'
import TextField from '@material-ui/core/TextField'

const Input = ({
	inputProps = {},
	name = '',
	label = '',
	className = '',
	type = 'text',
	value = '',
	onChange = () => {}
}) => {
	return (
		<TextField
			label={label}
			variant="filled"
			className={`input ${className}`}
			type={type}
			value={value}
			onChange={onChange}
			name={name}
			inputProps={inputProps}
		/>
	)
}

export default Input
