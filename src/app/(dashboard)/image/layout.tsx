import ImageContextProvider from "@/context/ImageContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ImageContextProvider>
			<div>{children}</div>;
		</ImageContextProvider>
	);
};

export default layout;
