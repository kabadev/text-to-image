import { connect } from "@/config/dbConfig";
import Image, {
	deleteById,
	deleteImageFile,
	getAllImages,
	getUserImages,
} from "@/schema/Image";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { imgId: string; fileId: string } }
) {
	try {
		await connect();
		const imgId = params.imgId;
		const fileId = params.fileId;
		if (!imgId) {
			throw new Error("Missing 'Image prompt Id' field in the params");
		}
		if (!fileId) {
			throw new Error("Missing 'Image file Id' field in the params");
		}

		const image = await Image.findById(imgId);
		if (image.images.length === 1) {
			await deleteById(imgId);
		} else {
			await deleteImageFile(imgId, fileId);
		}
		const response = NextResponse.json(
			{
				message: "Image Deleted Successfully",
				success: true,
			},
			{ status: 200 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
