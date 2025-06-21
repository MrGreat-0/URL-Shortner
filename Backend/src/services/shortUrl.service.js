import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js"

export const createShortUrlServiceWithoutUser = async (originalUrl) => {
    const shortUrl = generateNanoId(6);
    if (!shortUrl) throw new Error("Short URL not generated");
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
    await saveShortUrl(originalUrl, shortUrl, null, expiresAt);
    return shortUrl;
    // console.log(url);
    // res.send(nanoid(6));
}

export const createShortUrlServiceWithUser = async (originalUrl, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(6);
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This custom url already exists")
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await saveShortUrl(originalUrl, shortUrl, userId, expiresAt);
    return shortUrl;
    // console.log(url);
    // res.send(nanoid(6));
}