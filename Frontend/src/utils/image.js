import { BACKEND_URL } from "../config/config";

export const getImageUrl = (image) => {

    if (!image) {
        return "";
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `${BACKEND_URL}${image}`;
};