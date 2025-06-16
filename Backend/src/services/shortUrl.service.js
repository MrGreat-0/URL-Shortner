import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js"

export const createShortUrlServiceWithoutUser = async (originalUrl) => {
    const shortUrl = generateNanoId(7);
    if (!shortUrl) throw new Error("Short URL not generated");
    await saveShortUrl(originalUrl, shortUrl);
    return shortUrl;
    // console.log(url);
    // res.send(nanoid(7));
}

export const createShortUrlServiceWithUser = async (originalUrl, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7);
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This custom url already exists")
    await saveShortUrl(originalUrl, shortUrl, userId);
    return shortUrl;
    // console.log(url);
    // res.send(nanoid(7));
}