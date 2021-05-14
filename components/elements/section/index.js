import React from 'react'
import SearchBar from '../search-bar'

const Section = ({ name, pretitle, title, sub }) => {
	const optionList = [
		{ value: 'name', name: 'Name' },
		{ value: 'genres', name: 'Genres' }
	].concat(
		name == 'book'
			? [{ value: 'authors', name: 'Authors' }]
			: [
					{ value: 'directors', name: 'Directors' },
					{ value: 'casts', name: 'Casts' }
			  ]
	)

	return (
		<div className={`section section--${name}`}>
			<div className="section-title section-title--pretitle">{pretitle}</div>

			<div className="section-title section-title--main">{title}</div>

			<div className="section-title section-title--sub">{sub}</div>

			<div className="section-search-bar">
				<SearchBar
					optionList={optionList}
					haveButton={true}
					placeholder={`Search for ${name}s`}
				/>
			</div>
		</div>
	)
}

export default Section
