import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'

const ReviewCard = ({ title, content, author, at, rating, score }) => {
	const [user, setUser] = React.useState({})

	React.useEffect(() => {
		var isSubscribed = true
		async function getUser() {
			const res = await axios.get(`/api/users/${author}`)

			if (isSubscribed) setUser(res.data.user)
		}
		getUser()

		return () => (isSubscribed = false)
	}, [])

	return (
		<div className="review-card">
			<div className="review-card-header">
				<div className="review-card-header-user">
					<Avatar src={user.avatar} className="review-card-header-user_ava" />
					<div className="review-card-header-user_info">
						<span className="review-card-header-user_info--main">
							{user.name}
						</span>

						<span className="review-card-header-user_info--sub">
							at&nbsp;
							<span>
								{new Date(at).toLocaleString('vi-VN', { timeZome: 'UTC' })}
							</span>
						</span>
					</div>
				</div>

				<div className="review-card-header_title">
					{title}{' '}
					<Rating
						className="review-card-header_title--rating"
						value={rating}
						readOnly
						precision={0.5}
					/>
				</div>
			</div>

			<div className="review-card-body">
				<div className="review-card-body-main">
					<div className="review-card-body-main_content">{content}</div>
				</div>
			</div>
		</div>
	)
}

export default ReviewCard
