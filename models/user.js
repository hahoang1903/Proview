import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	credit: {
		type: Number,
		default: 0,
		required: true
	},
	since: {
		type: Date,
		default: Date.now,
		required: true
	}
})

const User = mongoose.model('User', userSchema)

export default User
