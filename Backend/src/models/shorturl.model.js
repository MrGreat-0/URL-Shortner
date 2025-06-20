import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    expiresAt: {
        type: Date,
        required: true,
    }
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrl;