import path from "path";

export const getImagePath = (imageName: string) => {
    return path.join(__dirname, 'images', imageName);
}
