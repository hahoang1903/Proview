import mongoose from 'mongoose'

const { Schema } = mongoose

const movieSchema = new Schema({
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
	directors: {
		type: String,
		required: true
	},
	casts: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: 0.0
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

const Movie = mongoose.models['Movie'] || mongoose.model('Movie', movieSchema)

export default Movie
