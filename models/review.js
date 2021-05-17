import mongoose from 'mongoose'

const { Schema } = mongoose

const commentSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	commentedOn: {
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

const voteSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	voteOn: {
		type: Schema.Types.ObjectId,
		ref: 'Review',
		required: true
	},
	voteType: {
		type: Boolean,
		required: true
	}
})

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
	comments: [commentSchema],
	votes: [voteSchema]
})

const Review =
	mongoose.models['Review'] || mongoose.model('Review', reviewSchema)

export default Review
