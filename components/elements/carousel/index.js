import React from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const CustomNextArrow = ({ className, onClick }) => (
	<div className={`${className} carousel-arrow`} onClick={onClick}>
		<RightOutlined />
	</div>
)

const CustomPrevArrow = ({ className, onClick }) => (
	<div className={`${className} carousel-arrow`} onClick={onClick}>
		<LeftOutlined />
	</div>
)

const settings = {
	nextArrow: <CustomNextArrow />,
	prevArrow: <CustomPrevArrow />
}

const CustomCarousel = ({
	className = '',
	children = null,
	autoplay = true,
	autoplaySpeed = 5000,
	arrows = true
}) => {
	return (
		<Carousel
			className={`${className} carousel`}
			autoplay={autoplay}
			autoplaySpeed={autoplaySpeed}
			arrows={arrows}
			{...settings}
		>
			{children}
		</Carousel>
	)
}

export default CustomCarousel
