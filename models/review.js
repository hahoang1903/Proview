import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	on: {
		type: Schema.Types.ObjectId,
		required: true,
		refPath: 'onModel'
	},
	onModel: {
		type: String,
		required: true,
		enum: ['Book', 'Movie']
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
