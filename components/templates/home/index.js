import React from 'react'
import CarouselSection from './section'
import Carousel from '../../elements/carousel'

const HomeTemplate = () => {
	return (
		<div className="proview-home">
			<Carousel>
				<CarouselSection
					name="book"
					pretitle="Book rating"
					title="For Book Lovers"
					sub="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
				mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
				Aenean vitae pellentesque erat. Integer non tristique quam."
				/>

				<CarouselSection
					name="movie"
					pretitle="Movie rating"
					title="For Movie Addicts"
					sub="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
						mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
						Aenean vitae pellentesque erat. Integer non tristique quam."
				/>
			</Carousel>
		</div>
	)
}

export default HomeTemplate
