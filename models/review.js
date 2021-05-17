import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	reviewOn: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: 'onModel'
	},
	onModel: {
		type: String,
		required: true,
		enum: ['Book', 'Movie']
	},
	score: {
		type: Number,
		required: true,
		default: 0
	},
	at: {
		type: Date,
		default: Date.now,
		required: true
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

const Review =
	mongoose.models['Review'] || mongoose.model('Review', reviewSchema)

export default Review
