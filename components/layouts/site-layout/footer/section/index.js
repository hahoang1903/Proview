import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const FooterSection = ({
	title = '',
	items = [{ content: '', link: '', linkToEx: '' }],
	className = '',
	style
}) => {
	return (
		<div className={`app-footer__section ${className}`} style={style}>
			<div className="app-footer__title">{title}</div>

			{items.map((item, i) => {
				return item.linkToEx ? (
					<div key={`item#${i}`} className="app-footer__link">
						<a target="_blank" href={item.linkToEx}>
							{item.content}
						</a>
					</div>
				) : item.link ? (
					<div key={`item#${i}`} className="app-footer__link">
						<Link href={item.link}>
							<a>{item.content}</a>
						</Link>
					</div>
				) : (
					<div key={`item#${i}`} className="app-footer__item">
						{item.content}
					</div>
				)
			})}
		</div>
	)
}

FooterSection.propTypes = {
	title: PropTypes.any,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			content: PropTypes.any,
			link: PropTypes.string
		})
	)
}

export default FooterSection
