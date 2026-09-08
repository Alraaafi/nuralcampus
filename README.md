## NuralCampus

### Server setup

1. Copy `server/.env.example` to `server/.env`.
2. Set `MONGODB_URI` to the MongoDB Atlas connection string for the application database.
3. Set `JWT_SECRET` to a long, random value.
4. Set `CLOUDINARY_URL` with the Cloudinary API credentials.
5. Install dependencies in `server/` and start the API.

Resource cover images and profile pictures are uploaded to Cloudinary through the server. MongoDB stores the returned HTTPS URLs, so the server no longer serves media from a local `uploads` directory.

Never commit `server/.env` or share its values. If credentials have been exposed, rotate them in the relevant provider dashboards.
