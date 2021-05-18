import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Row, Col, Image } from 'antd'
import Button from '@material-ui/core/Button'
import { RightOutlined } from '@ant-design/icons'
import SiteLayout from '../../../components/layouts/site-layout'
import { useAuthState, useAuthenticate } from '../../../hooks/useAuth'
import DefaultAva from '../../../public/img/default-avatar.svg'
import ProfileForm from '../../../components/elements/profile-form'
import ImageUpload from '../../../components/elements/image-upload'
import ReviewCard from '../../../components/elements/review-card'
import { useRouter } from 'next/router'

const UserProfilePage = ({ user, token, reviews }) => {
	React.useEffect(() => {
		document.title = 'Profile'
	}, [])

	const tabs = ['Profile', 'Edit profile', 'Change password']

	const authState = useAuthState()
	const authenticate = useAuthenticate()
	const router = useRouter()
	const [activeTab, setActiveTab] = React.useState(tabs[0])
	const [previewImage, setPreviewImage] = React.useState('')
	const [upload, setUpload] = React.useState(false)

	const uploadAva = async () => {
		const res = await axios.post('/api/auth/uploadAva', {
			image: previewImage,
			id: authState.user._id
		})

		const { user: newUser, token } = res.data

		authenticate({ user: newUser, token })
		router.reload()
	}

	return (
		<SiteLayout>
			<div className="proview-profile">
				<div className="proview-profile-tabs">
					<div
						className={`proview-profile-tabs_tab${
							activeTab == tabs[0] ? ' proview-profile-tabs_tab--active' : ''
						}`}
						onClick={() => setActiveTab(tabs[0])}
					>
						{tabs[0]}
					</div>

					{token == authState.token ? (
						<React.Fragment>
							<div
								className={`proview-profile-tabs_tab${
									activeTab == tabs[1]
										? ' proview-profile-tabs_tab--active'
										: ''
								}`}
								onClick={() => setActiveTab(tabs[1])}
							>
								{tabs[1]}
							</div>

							<div
								className={`proview-profile-tabs_tab${
									activeTab == tabs[2]
										? ' proview-profile-tabs_tab--active'
										: ''
								}`}
								onClick={() => setActiveTab(tabs[2])}
							>
								{tabs[2]}
							</div>

							<div className="proview-profile-tabs_tab">
								<Link href={`/users/${user._id}/my-posts`}>
									<a>
										My posts <RightOutlined />
									</a>
								</Link>
							</div>
						</React.Fragment>
					) : null}
				</div>

				{activeTab == tabs[0] ? (
					<React.Fragment>
						<Row>
							<Col
								xs={24}
								md={7}
								xl={5}
								xxl={4}
								className="proview-profile_ava-box"
							>
								{token == authState.token ? (
									upload ? (
										<ImageUpload
											imgAlt="user avatar"
											onChange={setPreviewImage}
										/>
									) : user.avatar ? (
										<Image src={user.avatar} />
									) : (
										<DefaultAva width={200} height="100%" />
									)
								) : user.avatar ? (
									<Image src={user.avatar} />
								) : (
									<DefaultAva width={200} height="100%" />
								)}

								<div className="proview-profile_role">{user.role}</div>

								{token == authState.token ? (
									upload ? (
										<React.Fragment>
											<Button
												variant="contained"
												className="proview-profile_upload-button"
												onClick={uploadAva}
											>
												Save Image
											</Button>

											<Button
												variant="contained"
												className="proview-profile_upload-button proview-profile_upload-button--cancel"
												onClick={() => setUpload(false)}
											>
												Cancel
											</Button>
										</React.Fragment>
									) : (
										<Button
											variant="contained"
											className="proview-profile_upload-button"
											onClick={() => setUpload(true)}
										>
											Upload
										</Button>
									)
								) : null}
							</Col>

							<Col
								xs={24}
								md={17}
								xl={19}
								xxl={20}
								className="proview-profile-info"
							>
								<div className="proview-profile-info_name">{user.name}</div>
								<div className="proview-profile-info_email">{user.email}</div>
								<div className="proview-profile-info_bio">{user.bio}</div>

								<div className="proview-profile-info-bottom">
									<div className="proview-profile-info-bottom-stats">
										<div className="proview-profile-info-bottom-stats_stat">
											<span>{user.reviews.length}</span>
											{`${user.reviews.length > 1 ? 'reviews' : 'review'}`}
										</div>

										<div className="proview-profile-info-bottom-stats_stat">
											<span>{user.movies.length}</span>
											{`${user.reviews.length > 1 ? 'movies' : 'movie'} posted`}
										</div>

										<div className="proview-profile-info-bottom-stats_stat">
											<span>{user.books.length}</span>
											{`${user.reviews.length > 1 ? 'books' : 'book'} posted`}
										</div>
									</div>

									<div className="proview-profile-info-bottom_since">
										Member since {user.since.slice(0, 10)}
									</div>
								</div>
							</Col>
						</Row>

						<Row>
							<div className="proview-profile-top">
								<div className="proview-profile-top_title">Reviews</div>

								<div className="proview-profile-top-reviews">
									{reviews.length > 0 ? (
										reviews.map(review => (
											<div
												key={review._id}
												className="proview-profile-top-reviews-review"
											>
												<div className="proview-profile-top-reviews-review_title">
													<Link
														href={`/${String(review.onModel).toLowerCase()}s/${
															review.reviewOn
														}`}
													>
														<a>
															<ReviewCard
																author={review.author}
																title={review.title}
																content={review.content}
																at={review.at}
																rating={review.rating}
																score={review.score}
															/>
														</a>
													</Link>
												</div>
											</div>
										))
									) : (
										<div className="proview-profile-top-reviews--empty">
											This user hasn't posted any reviews yet.
										</div>
									)}
								</div>
							</div>
						</Row>
					</React.Fragment>
				) : activeTab == tabs[1] ? (
					<div className="proview-profile-update">
						<ProfileForm
							title="Update Profile"
							initialValues={{
								name: user.name,
								email: user.email,
								bio: user.bio
							}}
							formFields={[
								{
									name: 'name',
									label: 'Display name',
									rules: [
										{
											required: true,
											message: 'Please provide a display name'
										}
									]
								},
								{
									name: 'email',
									label: 'Email address',
									rules: [
										{
											required: true,
											type: 'email',
											message:
												'Please provide a valid email. Ex: example@gmail.com'
										}
									]
								},
								{ name: 'bio', label: 'Bio' }
							]}
							authRoute="updateDetails"
							userId={user._id}
						/>
					</div>
				) : activeTab == tabs[2] ? (
					<div className="proview-profile-update">
						<ProfileForm
							title="Update Password"
							formFields={[
								{
									name: 'currentPassword',
									label: 'Current password',
									rules: [
										{
											required: true,
											message: 'Please provide your current password'
										}
									]
								},
								{
									name: 'newPassword',
									label: 'New password',
									rules: [
										{
											required: true,
											min: 8,
											message:
												'Please provide a password with minimum 8 characters'
										}
									]
								}
							]}
							authRoute="updatePassword"
							userId={user._id}
						/>
					</div>
				) : null}
			</div>
		</SiteLayout>
	)
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const userRes = await axios.get(`http://localhost:3000/api/users/${id}`)

	const reviewRes = await axios.get(`http://localhost:3000/api/reviews`, {
		params: {
			author: id,
			limit: 5
		}
	})

	const { user, token } = userRes.data
	const reviews = reviewRes.data.data

	return {
		props: {
			user,
			token,
			reviews
		}
	}
}

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:3000/api/users')

	const users = res.data.data

	const paths = users.map(user => ({ params: { id: user._id.toString() } }))

	return {
		paths,
		fallback: false
	}
}

export default UserProfilePage
