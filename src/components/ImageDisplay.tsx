"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import GenImage from "./GenImage";
import GenImageSkeleton from "./GenImageSkeleton";
import ImageContextProvider, {
	ImageType,
	useImageContext,
} from "@/context/ImageContext";
import { Separator } from "./ui/separator";

const ImageDisplay = () => {
	const { isLoading, loaderNumber, isSubmit, currentResult } =
		useImageContext();

	return (
		<div>
			{isSubmit && (
				<>
					<div className="mb-4">
						{isSubmit ? (
							<h3 className="text-2xl font-bold text-center">Generating...</h3>
						) : (
							<h3 className="text-xl font-bold ">Result</h3>
						)}
					</div>

					<div className="grid md:grid-cols-2 gap-2">
						{isSubmit ? (
							<ImageSkeletons num={loaderNumber} />
						) : (
							currentResult?.images.map((image, i) => (
								<GenImage key={i} image={image} prompt={currentResult.prompt} />
							))
						)}
					</div>
				</>
			)}
			{!isSubmit && currentResult && (
				<>
					<div className="mb-4">
						<h3 className="text-xl font-bold ">Result</h3>
					</div>
					<div>
						<div className="flexs justify-betweens my-2  p-2">
							<h2 className="Text-2xl font-900">
								{currentResult.prompt.slice(0, 30) +
									(currentResult.prompt.length > 30 ? "..." : "")}
							</h2>
							<Separator />
						</div>

						<div className="grid md:grid-cols-2 gap-2">
							{isSubmit ? (
								<ImageSkeletons num={loaderNumber} />
							) : (
								currentResult?.images.map((image: any, i) => (
									<GenImage
										key={i}
										image={image}
										isResultArea={true}
										prompt={currentResult.prompt}
									/>
								))
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ImageDisplay;

export const ImageSkeletons = ({ num }: any) => {
	const components = [];

	for (let i = 0; i < num; i++) {
		components.push(<GenImageSkeleton key={i} />);
	}
	return components;
};
