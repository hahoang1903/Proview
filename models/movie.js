import mongoose from 'mongoose'

const { Schema } = mongoose

const movieSchema = new Schema({
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
	casts: {
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

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
