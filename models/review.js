import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		on: {
			type: Schema.Types.ObjectId,
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
	},
	{
		toJSON: { virtuals: true }
	}
)

reviewSchema.virtual('onBook', {
	ref: 'Book',
	localField: 'on',
	foreignField: '_id',
	justOne: true
})

reviewSchema.virtual('onMovie', {
	ref: 'Movie',
	localField: 'on',
	foreignField: '_id',
	justOne: true
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
