import React from 'react'
import Logo from '../../../public/img/logo.svg'

const BrandLogo = ({ width, fill = 'black' }) => {
	return <Logo viewBox="0 0 340 60" width={width} height="100%" fill={fill} />
}

export default BrandLogo
