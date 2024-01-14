import { connect } from "@/config/dbConfig";
import { deleteById, getAllImages, getUserImages } from "@/schema/Image";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { imgId: string } }
) {
	try {
		await connect();
		const imgId = params.imgId;
		if (!imgId) {
			throw new Error("Missing 'useId' field in the params");
		}

		await deleteById(imgId);

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
