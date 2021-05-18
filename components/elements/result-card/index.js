import React from 'react'
import ResourceCard from '../resource-card'
import Link from 'next/link'

const ResultCard = ({ id, type, name, year, img, rating, fields = [] }) => {
	return (
		<div>
			<Link href={`/${type}s/${id}`}>
				<a className="result-card">
					<ResourceCard
						year={year}
						title={name}
						rating={rating}
						img={img}
						fields={fields}
					/>
				</a>
			</Link>
		</div>
	)
}

export default ResultCard
