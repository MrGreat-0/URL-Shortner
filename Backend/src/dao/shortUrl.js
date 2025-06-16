import urlSchema from "../models/shorturl.model.js"
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (originalUrl, shortUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            original_url: originalUrl,
            short_url: shortUrl
        })
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save();
    } catch (err) {
        // console.log(err)
        if (err.code == 11000) {
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err);
    }
}

export const getShortUrl = async (id) => {
    // id === short_url
    return await urlSchema.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } });
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({ short_url: slug });
}