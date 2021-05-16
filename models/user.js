import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please add a name']
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email'
		]
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 8,
		select: false
	},
	avatar: {
		type: String
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	credit: {
		type: Number,
		default: 0,
		required: true
	},
	since: {
		type: Date,
		default: Date.now,
		required: true
	},
	books: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Book'
		}
	],
	movies: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Movie'
		}
	],
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	],
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	})
}

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex')

	// Hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	// Set expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

	return resetToken
}

const User = mongoose.models['User'] || mongoose.model('User', userSchema)

export default User
