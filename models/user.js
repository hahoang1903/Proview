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
	},
	uploads: [
		{
			type: Schema.Types.ObjectId
		}
	],
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

userSchema.virtual('bookUploads', {
	ref: 'Book',
	localField: 'uploads',
	foreignField: '_id'
})

userSchema.virtual('movieUploads', {
	ref: 'Movie',
	localField: 'uploads',
	foreignField: '_id'
})

const User = mongoose.models['User'] || mongoose.model('User', userSchema)

export default User
