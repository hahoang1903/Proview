import mongoose from 'mongoose'

const { Schema } = mongoose

const bookSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	image: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	plot: {
		type: String,
		required: true
	},
	genres: {
		type: String,
		required: true
	},
	authors: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		defalut: 0
	},
	releasedYear: {
		type: Number,
		required: true
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
})

const Book = mongoose.models['Book'] || mongoose.model('Book', bookSchema)

export default Book
