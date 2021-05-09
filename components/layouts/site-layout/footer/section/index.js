import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const FooterSection = ({
	align = 'left',
	title = '',
	items = [{ content: '', link: '' }],
	inlineItems = false,
	className,
	style
}) => {
	const finalClassName = `app-footer__section ${
		align == 'left' ? '' : `app-footer__section--${align}`
	} ${className ?? ''}`

	return (
		<div className={finalClassName} style={style}>
			<div className="app-footer__title">{title}</div>

			{items.map((item, i) => {
				return item.link ? (
					<div
						key={`item#${i}`}
						className={`app-footer__link${
							inlineItems ? ` app-footer__link--inline` : ''
						}`}
					>
						<Link href={item.link}>{item.content}</Link>
					</div>
				) : (
					<div
						key={`item#${i}`}
						className={`app-footer__item${
							inlineItems ? ` app-footer__item--inline` : ''
						}`}
					>
						{item.content}
					</div>
				)
			})}
		</div>
	)
}

FooterSection.propTypes = {
	align: PropTypes.oneOf(['left', 'right', 'center']),
	title: PropTypes.any,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			content: PropTypes.any,
			link: PropTypes.string
		})
	)
}

export default FooterSection
