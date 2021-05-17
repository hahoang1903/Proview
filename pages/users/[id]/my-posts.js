import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import SiteLayout from '../../../components/layouts/site-layout'
import { useAuthState } from '../../../hooks/useAuth'

const UserProfilePage = ({ user, token }) => {
	const authState = useAuthState()
	const router = useRouter()

	React.useEffect(() => {
		document.title = 'Profile'
		if (token != authState.token) router.push('/login')
	}, [])

	return (
		<SiteLayout>
			<div className="proview-profile">
				<div className="proview-profile-tabs">
					<div className="proview-profile-tabs_tab">
						<Link href={`/users/${user._id}`}>
							<a>
								<LeftOutlined /> Back to Profile
							</a>
						</Link>
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const userRes = await axios.get(`http://localhost:3000/api/users/${id}`)

	const bookRes = await axios.get(`http://localhost:3000/api/books`, {
		params: {
			author: id
		}
	})

	const movieRes = await axios.get(`http://localhost:3000/api/movies`, {
		params: {
			author: id
		}
	})

	const { user, token } = userRes.data
	const books = bookRes.data.data
	const movies = movieRes.data.data

	return {
		props: {
			user,
			token,
			books,
			movies
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
