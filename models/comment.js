import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
	creator: {
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
	content: {
		type: String,
		required: true
	}
})

const Comment =
	mongoose.models['Comment'] || mongoose.model('Comment', commentSchema)

export default Comment
