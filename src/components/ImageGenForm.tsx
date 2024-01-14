"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useImageContext } from "@/context/ImageContext";
import dynamic from "next/dynamic";

const ImageresultModal = dynamic(() => import("./ImageresultModal"), {
	ssr: false,
});

const formSchema = z.object({
	prompt: z.string().min(2, {
		message: "Prompt must be at least 3 characters.",
	}),
	negative_prompt: z.string(),
});

export function ImageGenForm() {
	const {
		isSubmit,
		GenerateNewImage,
		setLoaderNumber,
		setOpenModal,
		openModal,
		setResult,
	} = useImageContext();

	const [number, setNumber] = useState<number>(1);

	const [imageSize, setImageSize] = useState<{
		width: number;
		height: number;
	}>({ width: 512, height: 512 });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			negative_prompt: "cartoon, illustration, animation. face. male, female",
		},
	});

	function onSubmit(data: any, e: any) {
		e.preventDefault();

		data.image_size = imageSize;
		data.num_images = number;
		setLoaderNumber(number);
		GenerateNewImage(data);
		const width = window.innerWidth;
		if (width <= 768) {
			setResult();
		}
	}

	const imageSizeOptions = [
		{ label: "512 x 512", value: { width: 512, height: 512 } },
		{ label: "768 x 1024", value: { width: 768, height: 1024 } },
		{ label: "1024 x 576", value: { width: 1024, height: 576 } },
	];
	const imageNumberOptions = [
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "3", value: 3 },
		{ label: "4", value: 4 },
	];
	const [selectedSize, setSelectedSize] = useState<string>("512 x 512");
	const handleImageSizeChange = (data: any) => {
		setSelectedSize(data.label);
		setImageSize(data.value);
	};

	return (
		<div className="p-2 md:p-4 h-full md:mb-16 md:mr-4">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="prompt"
						render={({ field }) => (
							<FormItem>
								<Label>
									Prompt:*{" "}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="w-5 h-5 rounded-full border">
												?
											</TooltipTrigger>
											<TooltipContent className=" bg-accent text-accenta text-card-foreground w-[60%]">
												<p>
													The prompt to use for generating the image. Be as
													descriptive as possible for best results.
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Label>
								<FormControl>
									<Textarea
										className="resize-none no-scrollbar min-h-[90px]"
										placeholder="Please Enter you prompt here"
										{...field}
									></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="negative_prompt"
						render={({ field }) => (
							<FormItem>
								<Label>
									Negative Prompt:{" "}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="w-5 h-5 rounded-full border">
												?
											</TooltipTrigger>
											<TooltipContent className=" bg-accent text-accenta text-card-foreground w-[30%]">
												<p>
													{`The negative prompt to use.Use it to address details
													that you don't want in the image. This could be
													colors, objects, scenery and even the small details
													(e.g. moustache, blurry, low resolution). Default
													value:`}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Label>
								<FormControl>
									<Textarea
										placeholder="Please Enter you negative prompt here"
										{...field}
										className="resize-none no-scrollbar min-h-[90px]"
									></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div>
						<Label>
							Image Size:{" "}
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="w-5 h-5 rounded-full border">
										?
									</TooltipTrigger>
									<TooltipContent className=" bg-accent text-accenta text-card-foreground w-[60%]">
										<p>
											The number of images to generate. The function will return
											a list of images with the same prompt and negative prompt
											but different seeds. Default value: 1
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Label>
						<div className="flex gap-3  justify-evenly mt-2 text-sm">
							{imageSizeOptions.map((option) => (
								<div
									key={option.label}
									className={`h-10 w-full p-3 border rounded-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-myprimary hover:bg-myprimary/10 ${
										selectedSize === option.label
											? "border-myprimary bg-myprimary/10"
											: ""
									} `}
									onClick={() => handleImageSizeChange(option)}
								>
									<span>{option.label}</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<Label>
							Number of Images:{" "}
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="w-5 h-5 rounded-full border">
										?
									</TooltipTrigger>
									<TooltipContent className=" bg-accent text-accenta text-card-foreground w-[60%]">
										<p>
											The number of images to generate. The function will return
											a list of images with the same prompt and negative prompt
											but different seeds. Default value: 1
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Label>
						<div className="flex gap-3  justify-evenly mt-2 text-sm">
							{imageNumberOptions.map((option) => (
								<div
									key={option.label}
									className={`h-10 w-full p-3 border rounded-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-myprimary hover:bg-myprimary/10 ${
										number === option.value
											? "border-myprimary bg-myprimary/10"
											: ""
									} `}
									onClick={() => setNumber(option.value)}
								>
									<span>{option.label}</span>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center justify-center mt-6 w-full">
						<Button
							type="submit"
							className="w-full p-6 mt-4 bg-myprimary border-none hover:bg-myprimary/50 text-white font-bold text-lg"
							disabled={isSubmit}
						>
							{isSubmit ? "Generating" : "Run"}
						</Button>
					</div>
				</form>
			</Form>
			<ImageresultModal openModal={openModal} setOpenModal={setOpenModal} />
		</div>
	);
}
