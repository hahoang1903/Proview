import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import { Image } from 'antd'

const ResourceCard = ({
	title,
	rating,
	year,
	img,
	preview = false,
	fields = []
}) => {
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
						{`${title} ${year ? `(${year})` : ''}`}
						{typeof rating == 'number' ? (
							<Box
								component="fieldset"
								borderColor="transparent"
								className="resource-card-rating"
							>
								<Rating
									name="read-only"
									value={rating}
									readOnly
									precision={0.1}
								/>
							</Box>
						) : null}
					</Typography>

					{fields.map(field => (
						<div
							key={field.type}
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
