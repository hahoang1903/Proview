import React from 'react'
import ResourceCard from '../resource-card'
import { Col, Row } from 'antd'

const ResultCard = () => {
	return (
		<div className="result-card">
			<ResourceCard
				title="Harry Potter"
				img="https://i.pinimg.com/564x/8f/40/28/8f4028675de8fa4d44c828b76c6b881f.jpg"
			/>
		</div>
	)
}

export default ResultCard
