import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	)
}

export async function dbConnect() {
	if (mongoose.connection.readyState >= 1) return

	await mongoose.connect(
		MONGODB_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		},
		e => console.log(e ?? 'Connected to MongoDB')
	)
}
