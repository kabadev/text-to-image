import * as fal from "@fal-ai/serverless-client";
fal.config({
	proxyUrl: "/api/generate",
});
export const imageGenerator = async (data: any) => {
	// const result = await fal.subscribe("110602490-lora", {
	const result = await fal.subscribe("110602490-lcm", {
		input: {
			prompt: data.prompt,
			negative_prompt: data.negative_prompt,
			image_size: data.image_size,
			num_images: data.num_images,
		},
		logs: true,
		onQueueUpdate: (update) => {
			if (update.status === "IN_PROGRESS") {
				console.log("queue update", update);
			}
		},
	});

	return result;

	//   const imageUrl = result.images[0].url;
};
