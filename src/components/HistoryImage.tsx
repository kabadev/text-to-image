"use client";
import React, { useEffect, useState } from "react";

import GenImage from "./GenImage";
import { ImageSkeletons } from "./ImageDisplay";
import { useImageContext } from "@/context/ImageContext";
import { useUser } from "@clerk/nextjs";
import { RocketIcon, Trash } from "lucide-react";
import { Separator } from "./ui/separator";

const HistoryImage = () => {
	const { isLoading, fetchUserImages, deletePrompt, userImages } =
		useImageContext();
	const { user } = useUser();
	useEffect(() => {
		if (user) {
			fetchUserImages();
		}
	}, [user]);

	return (
		<div className="min-h-[300px]">
			<h3 className="text-xl font-bold mb-4">Recent creation</h3>

			{isLoading ? (
				<div className="grid md:grid-cols-2 gap-4">
					<ImageSkeletons num={4} />
				</div>
			) : userImages.length > 0 ? (
				<>
					{userImages.map((image, index) => (
						<div className="mt-4 md:mt-10" key={index}>
							<div className="flex justify-between  pb-1">
								<h2 className="Text-2xl font-900">
									{image.prompt.slice(0, 30) +
										(image.prompt.length > 30 ? "..." : "")}
								</h2>
								<Trash
									className="w-5 h-5 cursor-pointer"
									onClick={() => deletePrompt(image._id)}
								/>
							</div>
							<Separator className="mb-4" />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{image.images.map((img: any, i) => (
									<GenImage
										key={i}
										image={img}
										isResultArea={false}
										prompt={userImages[index].prompt}
										parentId={userImages[index]._id}
									/>
								))}
							</div>
						</div>
					))}
				</>
			) : (
				<div className="flex flex-col space-y-2 justify-center items-center h-[300px]">
					<RocketIcon className="w-10 h-10 text-myprimary" />
					<h2 className="text-2xl font-bold">No record found</h2>
					<p>All your generated image will show here </p>
				</div>
			)}
		</div>
	);
};

export default HistoryImage;
