"use client";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { imageGenerator } from "@/util/falmodelsApi";
import { useUser } from "@clerk/nextjs";

type NewImageData = {
	prompt: string;
	negative_prompt: string;
	image_size: {
		width: number;
		height: number;
	};
	num_images: number;
};

export type ImageType = {
	prompt: string;
	userId?: string | null;
	fullName?: string | null;
	images: any[];
	_id?: string | undefined;
};

interface ImageContextProps {
	currentResult: ImageType | null;
	userImages: ImageType[];
	allImages: ImageType[];
	GenerateNewImage: (data: NewImageData) => void;
	fetchAllImages: () => void;
	fetchUserImages: () => void;
	deletePrompt: (imgId: string | undefined) => void;
	deleteImage: (imgId: string, fileId: string) => void;
	setOpenModal: (value: boolean) => void;
	setResult: () => void;
	resetResult: () => void;
	setLoaderNumber: (value: number) => void;
	loaderNumber: number;
	openModal: boolean;
	isLoading: boolean;
	errorMessage: Error | null;
	isSubmit: boolean;
}

const ImageContext = createContext<ImageContextProps | null>(null);

export default function ImageContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { user } = useUser();
	const router = useRouter();

	const [currentResult, setCurrentResult] = useState<ImageType | null>(null);
	const [userImages, setUserImages] = useState<ImageType[]>([]);
	const [allImages, setAllImages] = useState<ImageType[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<any>(false);
	const [errorMessage, setErrorMessage] = useState<any>(null);
	const [loaderNumber, setLoaderNumber] = useState(2);
	const [isSubmit, setIsSubmit] = useState(false);

	const GenerateNewImage = async (NewImagedata: NewImageData) => {
		try {
			setLoaderNumber(NewImagedata.num_images);
			setIsSubmit(true);

			// Generate the new image
			const res: any = await imageGenerator(NewImagedata);

			// Save the new image to the server
			const data: ImageType = {
				prompt: NewImagedata.prompt,
				userId: user?.id,
				fullName: user?.fullName,
				images: res.images,
			};
			const result = await axios.post("/api/image/", data);
			const newResult = result.data.data;
			setCurrentResult(newResult);

			// Fetch updated user images
			const updatedImagesRes = await axios.get("/api/image/" + user?.id);
			setUserImages(() =>
				updatedImagesRes.data.data.filter(
					(data: any) => newResult?._id !== data._id
				)
			);

			setIsSubmit(false);
		} catch (error) {
			setErrorMessage("Something went wrong");
			console.error(error);
			setIsSubmit(false);
		}
	};

	const fetchAllImages = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get("/api/image/");
			setAllImages(res.data.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage("Something went wrong"), console.log(error);
		}
	};

	const fetchUserImages = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get("/api/image/" + user?.id);
			setUserImages(res.data.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setErrorMessage("Something went wrong"), console.log(error);
		}
	};

	const deleteImage = async (imgId: string, fileId: string) => {
		try {
			await axios.put(`/api/image/${user?.id}/${imgId}/${fileId}`);
			fetchUserImages();
		} catch (error) {
			setIsLoading(false);
			setErrorMessage("Something went wrong"), console.log(error);
		}
	};
	const deletePrompt = async (imgId: string | undefined) => {
		setIsLoading(true);
		try {
			await axios.delete(`/api/image/${user?.id}/${imgId}`);
			fetchUserImages();
		} catch (error) {
			setErrorMessage("Something went wrong"), console.log(error);
		}
	};

	const setResult = () => {
		router.push("#result");
		setOpenModal(true);
	};

	const resetResult = () => router.back();

	useEffect(() => {
		function handleHashChange() {
			if (window.location.hash === "") {
				setOpenModal(false);
			}
		}
		window.addEventListener("hashchange", handleHashChange);
		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	const contextValue: ImageContextProps = {
		currentResult,
		userImages,
		allImages,
		setResult,
		GenerateNewImage,
		fetchUserImages,
		fetchAllImages,
		deleteImage,
		deletePrompt,
		setOpenModal,
		loaderNumber,
		setLoaderNumber,
		openModal,
		isLoading,
		isSubmit,
		errorMessage,
		resetResult,
	};

	return (
		<ImageContext.Provider value={contextValue}>
			{children}
		</ImageContext.Provider>
	);
}

export const useImageContext = (): ImageContextProps => {
	const context = useContext(ImageContext);
	if (!context) {
		throw new Error(
			"useImageContext must be used within a ImageContextProvider"
		);
	}
	return context;
};
