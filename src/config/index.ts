import * as dotenv from "dotenv"

dotenv.config()

export default {
    NODE_ENV: process.env.NODE_ENV,
    APP_NAME: process.env.APP_NAME,
    PORT: process.env.PORT
}