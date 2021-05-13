import React from 'react'
import { Row, Col } from 'antd'
import FooterSection from './section'
import BrandLogo from '../../../elements/brand-logo'

const AppFooter = () => {
	return (
		<div className="app-footer">
			<Row>
				<Col xs={24} md={6}>
					<FooterSection title={<BrandLogo width={140} fill="white" />} />
				</Col>

				<Col xs={24} md={12}>
					<Row>
						<Col xs={24} md={12}>
							<FooterSection
								title="Proview"
								items={[
									{ content: 'About Us', link: '/about' },
									{ content: 'Contact', link: '/contact' },
									{ content: 'Help', link: '/help' }
								]}
							/>
						</Col>

						<Col xs={24} md={12}>
							<FooterSection
								title="Policy"
								items={[
									{
										content: 'Private Policy',
										linkToEx: 'https://www.hcaptcha.com/privacy'
									},
									{
										content: 'Term Of Use',
										linkToEx: 'https://www.hcaptcha.com/terms'
									}
								]}
							/>
						</Col>
					</Row>
				</Col>

				<Col xs={24} md={6}>
					<FooterSection items={[{ content: '© 2021 Proview' }]} />
				</Col>
			</Row>
		</div>
	)
}

export default AppFooter
