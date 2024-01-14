import mongoose from "mongoose";
import { Document, Types } from "mongoose";

const imageSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	width: {
		type: Number,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	content_type: {
		type: String,
		required: true,
	},
});

const ImageSchema = new mongoose.Schema({
	prompt: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	images: [imageSchema],
});

const Image = mongoose.models.image || mongoose.model("image", ImageSchema);

export default Image;

export const addImage = (requestData: any): Promise<any> => {
	const newImage = new Image(requestData);
	return newImage.save();
};

export const getAllImages = (): Promise<any[]> => {
	return Image.find();
};
export const getUserImages = (userId: string): Promise<any[]> => {
	return Image.find({ userId }).sort({ _id: -1 });
};

export const deleteById = (id: string): Promise<any | null> => {
	return Image.findByIdAndDelete(id).exec();
};
export const deleteImageFile = (
	imgId: string,
	fileId: string
): Promise<any | null> => {
	return Image.findByIdAndUpdate(
		imgId,
		{ $pull: { images: { _id: fileId } } },
		{ new: true }
	).exec();
};
