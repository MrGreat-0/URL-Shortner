import { getShortUrl, deleteShortUrlById } from "../dao/shortUrl.js";
import { createShortUrlServiceWithoutUser, createShortUrlServiceWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    let shortUrl
    if (req.user) {
        shortUrl = await createShortUrlServiceWithUser(data.url, req.user._id, data.slug)
    } else {
        shortUrl = await createShortUrlServiceWithoutUser(data.url)
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})

export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    // id === short_url
    const { id } = req.params;
    const url = await getShortUrl(id);

    if (!url || new Date() > url.expiresAt) {
        deleteShortUrlById(url._id);
        return res.status(410).render("error", {
            message: "This short URL has expired or is no longer available.",
        });
        // return res.status(410).json({ message: "This short URL has expired." });
        // throw new Error("This short URL has expired.");
    }
    res.redirect(url.original_url);
});

// export const createCustomShortUrl = wrapAsync(async (req, res) => {
//     const { url, slug } = req.body
//     const shortUrl = await createShortUrlServiceWithoutUser(url, customUrl)
//     res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
// })