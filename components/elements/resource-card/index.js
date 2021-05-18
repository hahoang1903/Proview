import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Image } from 'antd'

const ResourceCard = ({ title, mediaType, img, preview = true }) => {
	return (
		<Card className="resource-card">
			<CardActionArea>
				{/* <CardMedia
					component="img"
					image={img}
					className={`resource-card-image resource-card-image--${mediaType}`}
				/> */}
				<Image
					preview={preview}
					src={img}
					className={`resource-card-image resource-card-image--${mediaType}`}
				/>

				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>

					<Typography variant="body2" color="textSecondary" component="p">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except AntarcticaLizards are
						a widespread group of squamate reptiles, with over 6,000 species,
						ranging across all continents except AntarcticaLizards are a
						widespread group of squamate reptiles, with over 6,000 species,
						ranging across all continents except AntarcticaLizards are a
						widespread group of squamate reptiles, with over 6,000 species,
						ranging across all continents except Antarctica
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default ResourceCard
