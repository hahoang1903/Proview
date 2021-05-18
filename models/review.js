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
	rating: {
		type: Number,
		required: true,
		default: 0.0
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
	at: {
		type: Date,
		default: Date.now,
		required: true
	}
})

const Review =
	mongoose.models['Review'] || mongoose.model('Review', reviewSchema)

export default Review
