import React from 'react'
import axios from 'axios'

const UserProfilePage = ({ user }) => {
	React.useEffect(() => {
		document.title = 'Profile'
	}, [])

	return <div></div>
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const res = await axios.get(`http://localhost:3000/api/users/${id}`)

	return {
		props: {
			user: res.data.data
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
