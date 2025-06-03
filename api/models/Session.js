import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Add index for faster queries
sessionSchema.index({ userId: 1 });
sessionSchema.index({ token: 1 });

const Session = mongoose.model('Session', sessionSchema);

export default Session; 