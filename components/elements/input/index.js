import React from 'react'
import TextField from '@material-ui/core/TextField'

const Input = ({
	name = '',
	className = '',
	defaultValue = '',
	type = 'text'
}) => {
	const [value, setValue] = React.useState(defaultValue)

	const handleChange = ({ value }) => setValue(value)

	return (
		<TextField
			label={name}
			variant="filled"
			className={`input ${className}`}
			type={type}
			value={value}
			onChange={handleChange}
			name={name}
		/>
	)
}

export default Input
