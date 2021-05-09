import React from 'react'
import { Row, Col } from 'antd'
import FooterSection from './section'

const AppFooter = () => {
	return (
		<div className="app-footer">
			<Row>
				<Col xs={24} md={{ span: 12, order: 1 }} lg={{ span: 6, order: 1 }}>
					<FooterSection
						title="footer.aboutMidOne"
						items={[
							{ content: 'footer.aboutUs' },
							{ content: 'footer.customer' },
							{ content: 'footer.enterprise' }
						]}
					/>

					<FooterSection
						title="footer.projects"
						items={[
							{ content: 'footer.webtoon' },
							{ content: 'footer.someProject' }
						]}
					/>
				</Col>

				<Col xs={24} md={{ span: 12, order: 3 }} lg={{ span: 6, order: 2 }}>
					<FooterSection
						title="footer.shopMidOne"
						items={[
							{ content: 'footer.shop' },
							{ content: 'footer.shoppingGuide' },
							{ content: 'footer.payingGuide' },
							{ content: 'footer.cancelGuide' },
							{ content: 'footer.returnGuide' },
							{ content: 'footer.checkGuide' }
						]}
					/>
				</Col>

				<Col xs={24} md={{ span: 12, order: 2 }} lg={{ span: 6, order: 3 }}>
					<FooterSection
						title="footer.officeHanoi"
						align="right"
						items={[
							{ content: 'footer.officeAddressHanoi' },
							{ content: 'footer.officePhoneHanoi' }
						]}
					/>

					<FooterSection
						title="footer.officeHCM"
						align="right"
						items={[
							{ content: 'footer.officeAddressHCM' },
							{ content: 'footer.officePhoneHCM' }
						]}
					/>
				</Col>

				<Col xs={24} md={{ span: 12, order: 4 }} lg={{ span: 6, order: 4 }}>
					<FooterSection
						title="footer.shopHCM"
						align="right"
						items={[
							{ content: 'footer.shopAddressHCM' },
							{ content: 'footer.shopPhoneHCM' }
						]}
					/>

					<FooterSection
						title="Email"
						align="right"
						items={[{ content: 'footer.email' }]}
					/>
				</Col>
			</Row>

			<FooterSection
				align="center"
				items={[
					{ content: 'footer.MidOneEnterprise' },
					{ content: 'footer.confirmPaper' },
					{ content: 'footer.license' }
				]}
			/>

			<FooterSection
				align="center"
				inlineItems={true}
				items={[
					{ content: 'footer.paymentPolicy' },
					{ content: 'footer.infoPolicy' },
					{ content: 'footer.termOfUse', link: '/login' }
				]}
			/>
		</div>
	)
}

export default AppFooter
