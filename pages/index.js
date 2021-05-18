import SiteLayout from '../components/layouts/site-layout'
import React from 'react'
import Section from '../components/elements/section'
import Carousel from '../components/elements/carousel'
import { useAuthState } from '../hooks/useAuth'
import ResourceCard from '../components/elements/resource-card'
import Link from 'next/link'

const HomePage = () => {
	const { token } = useAuthState()

	React.useEffect(() => {
		document.title = 'Proview'
	}, [])
	return (
		<SiteLayout>
			<div className="proview-home">
				<Carousel>
					<Section
						name="book"
						pretitle="Book rating"
						title="For Book Lovers"
						sub="Already know what kind of book you might want to read? Find it here"
					/>

					<Section
						name="movie"
						pretitle="Movie rating"
						title="For Movie Addicts"
						sub="Just finished watching a movie? Search for your next movie now"
					/>
				</Carousel>

				<div className="proview-home-suggest">
					<div className="proview-home-suggest_title">
						<span className="proview-home-suggest_title--sub">
							Don't know what to search for?
						</span>
						<span className="proview-home-suggest_title--main">
							Try our suggestion
						</span>
					</div>

					<div className="proview-home-suggest_options">
						<ResourceCard title="Books" img="/img/books.jpg" />
						<ResourceCard title="Movies" img="/img/movies.jpg" />
					</div>
				</div>

				{!token ? (
					<div className="proview-home-suggest proview-home-suggest--npt">
						<div className="proview-home-suggest_title">
							<span className="proview-home-suggest_title--sub">
								Wanna be a part of the community?
							</span>
						</div>

						<div className="proview-home-suggest_options proview-home-suggest_options--cw">
							<Link href="/signup">
								<a className="proview-home-suggest-join-button">Join us</a>
							</Link>

							<div className="proview-home-suggest_small">
								to post, reviews, comments, and many more
							</div>
						</div>
					</div>
				) : null}
			</div>
		</SiteLayout>
	)
}

export default HomePage
