import { connect } from "@/config/dbConfig";
import Image from "@/schema/Image";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	await connect();
	try {
		await connect();

		const reqBody = await request.json();

		const newImage = new Image(reqBody);
		const saveData = await newImage.save();

		const response = NextResponse.json(
			{
				message: "New Image created successfully",
				success: true,
				data: saveData,
			},
			{ status: 200 }
		);
		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
