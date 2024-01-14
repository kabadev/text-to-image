import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import {
	ArrowDownToLine,
	ArrowsUpFromLine,
	DeleteIcon,
	Download,
	DownloadCloud,
	Trash,
} from "lucide-react";
import { downloadImage } from "@/util";
import { useImageContext } from "@/context/ImageContext";

const GenImage = ({ image, parentId, prompt, isResultArea }: any) => {
	const { deleteImage } = useImageContext();
	return (
		<div className=" bg-accent/40 relative rounded-md overflow-hidden">
			<Image
				src={image?.url}
				alt=""
				width={image.width}
				height={image.height}
				className="h-[full] rounded-md object-contain"
				priority={true}
			/>
			<div className=" bg-gradient-to-t from-black to-transparent via-black/40  w-full  flex justify-between absolute bottom-0  pb-1 px-3 rounded-b-md">
				<button
					className=" flex items-center justify-center shadow-none w-10 h-10 rounded-full transition-all duration-300 hover:bg-myprimary/10 text-gray-300 hover:text-myprimary"
					onClick={() => downloadImage(image?.url, prompt)}
				>
					<DownloadCloud className="w-5 h-5" />
				</button>
				{!isResultArea && (
					<button className=" flex items-center justify-center shadow-none w-10 h-10 rounded-full transition-all duration-300 hover:bg-myprimary/10 text-gray-300 hover:text-myprimary">
						<Trash
							className="w-5 h-5 "
							onClick={() => deleteImage(parentId, image?._id)}
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default GenImage;
