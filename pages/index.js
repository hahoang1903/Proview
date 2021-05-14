import SiteLayout from '../components/layouts/site-layout'
import React from 'react'
import Section from '../components/elements/section'
import Carousel from '../components/elements/carousel'
import { useAuthState } from '../hooks/useUser'

const HomePage = () => {
	const user = useAuthState()
	console.log(user)
	React.useEffect(() => {
		document.title = 'Proview - Trusted rating site'
	}, [])
	return (
		<SiteLayout>
			<div className="proview-home">
				<Carousel>
					<Section
						name="book"
						pretitle="Book rating"
						title="For Book Lovers"
						sub="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
					mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
					Aenean vitae pellentesque erat. Integer non tristique quam."
					/>

					<Section
						name="movie"
						pretitle="Movie rating"
						title="For Movie Addicts"
						sub="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
					mollis nibh, non convallis ex convallis eu. Suspendisse potenti.
					Aenean vitae pellentesque erat. Integer non tristique quam."
					/>
				</Carousel>
			</div>
		</SiteLayout>
	)
}

export default HomePage
