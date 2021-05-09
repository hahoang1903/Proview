import React from 'react'
import Link from 'next/link'

const Section = ({ name, pretitle, title, sub }) => {
	return (
		<div className={`proview-home-section proview-home-section--${name}`}>
			<div className="proview-home-section-title proview-home-section-title--pretitle">
				{pretitle}
			</div>

			<div className="proview-home-section-title proview-home-section-title--main">
				{title}
			</div>

			<div className="proview-home-section-title proview-home-section-title--sub">
				{sub}
			</div>

			<div className="proview-home-section-join">
				<Link href="/signup">
					<a className="proview-home-section-join-button">Join our community</a>
				</Link>
			</div>
		</div>
	)
}

export default Section
