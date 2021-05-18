import React from 'react'
import ResourceCard from '../resource-card'
import { Col, Row } from 'antd'

const ResultCard = ({ name, img }) => {
	return (
		<div className="result-card">
			<ResourceCard title={name} img={img} preview={false} />
		</div>
	)
}

export default ResultCard
