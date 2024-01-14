import { connect } from "@/config/dbConfig";
import { getUserImages } from "@/schema/Image";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		await connect();
		if (!id) {
			throw new Error("Missing 'useId' field in the params");
		}
		const images = await getUserImages(id);
		const response = NextResponse.json(
			{
				message: "success",
				success: true,
				data: images,
			},
			{ status: 200 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
