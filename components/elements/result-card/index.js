import React from 'react'
import { Col, Row } from 'antd'

const ResultCard = () => {
	return (
		<div className="result-card">
			<Row>
				<Col>
					<img />
				</Col>

				<Col>
					<div className="result-card-title">title</div>
					<div>info1</div>
					<div>info2</div>
					<div>info3</div>
				</Col>
			</Row>
		</div>
	)
}

export default ResultCard
