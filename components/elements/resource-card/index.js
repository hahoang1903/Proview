import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import { Image } from 'antd'

const ResourceCard = ({ title, rating, img, preview = false, fields = [] }) => {
	const labels = {
		0.5: 'Extremely bad',
		1: 'Very bad',
		1.5: 'Bad',
		2: 'Below average',
		2.5: 'Average',
		3: 'Above average',
		3.5: 'Good',
		4: 'Great',
		4.5: 'Excellent',
		5: 'Amazing'
	}

	return (
		<Card className="resource-card">
			<CardActionArea>
				<Image preview={preview} src={img} className="resource-card-image" />

				<CardContent className="resource-card-content">
					<Typography
						gutterBottom
						variant="h4"
						component="h2"
						className="resource-card-title"
					>
						{title}
						{typeof rating == 'number' ? (
							<Box
								component="fieldset"
								borderColor="transparent"
								className="resource-card-rating"
							>
								<Typography component="legend">{labels[rating]}</Typography>
								<Rating name="read-only" value={rating} readOnly />
							</Box>
						) : null}
					</Typography>

					{fields.map(field => (
						<div
							className={`resource-card-field resource-card-field--${field.type}`}
						>
							{field.content}
						</div>
					))}
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default ResourceCard
