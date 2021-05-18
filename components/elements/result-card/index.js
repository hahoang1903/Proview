import React from 'react'
import ResourceCard from '../resource-card'
import { Col, Row } from 'antd'

const ResultCard = ({ name, img, rating, fields = [] }) => {
	return (
		<div className="result-card">
			<ResourceCard title={name} rating={rating} img={img} fields={fields} />
		</div>
	)
}

export default ResultCard
