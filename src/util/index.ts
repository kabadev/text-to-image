export const downloadImage = (imageURL: string, name: string) => {
	const imageName = name.slice(0, 50).split(" ").join("_");

	fetch(imageURL)
		.then((response) => response.blob())
		.then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${imageName}_image.png`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		})
		.catch((error) => {
			console.error("Error downloading image:", error);
		});
};

export const calculateGridColumns = (image: any) => {
	const minImageWidth = image.images[0].width;

	if (minImageWidth === 512) {
		return 2;
	} else if (minImageWidth === 768) {
		return 2;
	} else if (minImageWidth === 1024) {
		return 1;
	}
};

interface ConversationItem {
	_id: string;
	userInput: string;
	AIOutput: string;
	conversationId: string;
	userId: string;
	__v: number;
}

export default function convertArrayToData(array: ConversationItem[]): string {
	let result = "";
	console.log(array);
	array.forEach((obj, index) => {
		result += ` Human:${obj.userInput}\nYou:${obj.AIOutput}\n`;
		if (index < array.length - 1) {
			result += "\n\n";
		}
	});

	return result;
}

export const getFormattedDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = Math.floor(duration % 60);

	const formattedHours = hours > 0 ? `${hours > 1 ? hours : "0" + hours}:` : "";
	const formattedMinutes =
		minutes > 0 ? `${minutes > 9 ? minutes : "0" + minutes}:` : "";
	const formattedSeconds = `${
		duration > 60
			? seconds > 9
				? seconds
				: "0" + seconds
			: "00:" + (seconds > 9 ? seconds : "0" + seconds)
	}`;

	return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
};
