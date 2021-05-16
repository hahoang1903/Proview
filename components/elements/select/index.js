import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const CustomSelect = ({
	name,
	label,
	optionList = [{ value: '', name: '' }],
	value = '',
	onChange
}) => {
	return (
		<FormControl className="select">
			<InputLabel id={name}>{label}</InputLabel>
			<Select labelId={name} value={value} onChange={onChange}>
				{optionList.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default CustomSelect
