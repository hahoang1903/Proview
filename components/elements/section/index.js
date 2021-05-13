import React from 'react'
import Link from 'next/link'

const Section = ({ name, pretitle, title, sub }) => {
	return (
		<div className={`section section--${name}`}>
			<div className="section-title section-title--pretitle">{pretitle}</div>

			<div className="section-title section-title--main">{title}</div>

			<div className="section-title section-title--sub">{sub}</div>

			<div className="section-join">
				<Link href="/signup">
					<a className="section-join-button">Join our community</a>
				</Link>
			</div>
		</div>
	)
}

export default Section
