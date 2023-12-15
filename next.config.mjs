import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "img.etimg.com",
            "assets.vogue.com",
            "m.media-amazon.com",
            "upload.wikimedia.org",
            "api.honest-photography.com",
            "fra1.digitaloceanspaces.com",
        ],
    },
}

export default withPlaiceholder(nextConfig)
