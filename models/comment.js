import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	on: {
		type: Schema.Types.ObjectId,
		ref: 'Review',
		required: true
	},
	at: {
		type: Date,
		default: Date.now,
		required: true
	},
	upvote: {
		type: Number,
		defalut: 0,
		required: true
	},
	downvote: {
		type: Number,
		defalut: 0,
		required: true
	}
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
