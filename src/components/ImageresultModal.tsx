"use client";
import React from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import ImageDisplay from "./ImageDisplay";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useImageContext } from "@/context/ImageContext";

const ImageresultModal = ({
	openModal,
	setOpenModal,
}: {
	openModal: boolean;
	setOpenModal: any;
}) => {
	const router = useRouter();

	return (
		<Dialog
			open={openModal}
			onOpenChange={() => {
				setOpenModal(false);
				router.back();
			}}
		>
			<DialogContent className="overflow-y-scroll sm:max-w-full h-screen">
				<ImageDisplay />
			</DialogContent>
		</Dialog>
	);
};

export default ImageresultModal;
