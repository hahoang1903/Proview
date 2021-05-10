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
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
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

const Review =
	mongoose.models['Review'] || mongoose.model('Review', reviewSchema)

export default Review
