import mongoose from 'mongoose'

const { Schema } = mongoose

const bookSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	plot: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	author: {
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
	}
})

const Book = mongoose.model('Book', bookSchema)

export default Book
