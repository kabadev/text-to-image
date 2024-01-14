import HistoryImage from "@/components/HistoryImage";
import ImageDisplay from "@/components/ImageDisplay";
import { ImageGenForm } from "@/components/ImageGenForm";

import { Card } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import React from "react";
import * as fal from "@fal-ai/serverless-client";
fal.config({
	proxyUrl: "/api/generate",
});
const page = () => {
	return (
		<div className="relative">
			<div className="bg-accent flex items-start justify-center md:h-[250px] h-[150px]  border-b relative bg-accents  -z-10 dbg-secondary ">
				<div className="md:w-1/2 max-md:px-6 mt-2  md:pt-10 flex-col flex md:gap-4 gap-1 items-center justify-center">
					<h1 className=" text-2xl md:text-3xl lg:text-6xl font-bold capitalize ">
						Image <span className="mycolor-primary">Generation</span>
					</h1>
					<p className="text-center max-sm:text-sm">
						Transform ideas into breathtaking visuals with our AI-powered image
						generation
					</p>
				</div>
			</div>
			<Card className="md:w-[90%] w-[95%] m-auto  h-full mt-[-90px] z-60 border-b-0 overflow-hidden rounded-b-none px-4 pt-4 max-md:h-full max-md:mt-[-30px] max-sm:p-2">
				<h2 className="text-xl md:text-3xl font-bold text-center mt-2 md:mt-6  capitalize ">
					<span className="mycolor-primary">AI</span> prowered Image{" "}
					<span className="mycolor-primary">Creator</span>
				</h2>
				<p className="text-center text-slate-400">
					{" "}
					Turn your imagination to reality
				</p>

				<div className="max-md:flex-col flex gap-x-4">
					<div className="md:w-[40%] md:h-[620px] overflow-y-auto">
						<ImageGenForm />
					</div>
					<div className="md:w-[60%]  md:h-[620px] overflow-y-auto  p-4">
						<div className="flex flex-col gap-6">
							<ImageDisplay />
							<Separator />
							<HistoryImage />
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default page;
