import React from "react";
import { Skeleton } from "./ui/skeleton";
import { ImageIcon } from "lucide-react";

const GenImageSkeleton = () => {
	return (
		<div>
			{" "}
			<div className="bg-accent/40 rounded-md">
				<Skeleton className=" flex items-center justify-center animate-[pulse_1s_ease-in-out_infinite] h-[250px] rounded-md bg-slate-200 dark:bg-accent">
					<ImageIcon strokeWidth={0.5} className="w-10 h-10 opacity-50" />
				</Skeleton>
			</div>
		</div>
	);
};

export default GenImageSkeleton;
