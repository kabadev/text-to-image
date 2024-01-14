// import Hero from "@/components/Hero";
// import Tools from "@/components/Tools";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Home() {
	return (
		<div className=" text-slate-300 px-16 max-md:px-4 max-sm:px-2 py-6 bg-top  bg-[url('/bg.svg')] bg-no-repeat h-full overflow-x-hidden ">
			<div className="w-full h-[65px] flex items-center justify-between">
				<Image
					src="/sabilogo4.png"
					height={1000}
					width={1000}
					alt="logo"
					className="w-24  "
				/>

				<Link
					href={"/image"}
					className="text-white max-md:hidden p-3 py-3 px-6 rounded-3xl flex items-center justify-center bg-myprimary hover:bg-myprimary/50 transition-all duration-300 max-md:p-2 max-md:px-4"
				>
					Start for free
				</Link>
			</div>
			<section className="flex items-center  gap-10 max-lg:flex-col max-md:mt-10">
				<div className="lg:w-1/2 max-lg:order-2 flex flex-col items-start max-md:px-4 max-sm:p-2 max-lg:items-center  ">
					<h1 className="text-6xl font-black leading-[1] text-white max-md:text-4xl max-md:text-center">
						Unleash your Creativity with the power of{" "}
						<span className="text-myprimary">Sabi AI</span>
					</h1>
					<p className="text-lg mt-10 max-sm:mt-4">
						Transform words into vivid visuals effortlessly. Our cutting-edge AI
						technology brings your ideas to life, making creativity boundless.
						Explore the power of text-to-image generation and redefine the way
						you express yourself.
					</p>
					<Link
						href={"/image"}
						className=" text-white p-3 py-3 mt-5 px-6 rounded-3xl flex items-center justify-center bg-myprimary hover:bg-myprimary/50 transition-all duration-300"
					>
						Start for free
					</Link>
				</div>

				<div className="w-1/2 max-lg:order-1 max-lg:w-full">
					<Image src="/sabibox.png" height={1000} width={1000} alt="logo" />
				</div>
			</section>
			<section className="mt-32 max-md:mt-24">
				{/* <h2 className="text-center text-6xl font-bold md:w-1/2">
					Many tools to express your creativity
				</h2> */}
				<div className="flex max-md:flex-col gap-4 mb-24">
					<FeatureCard>
						<h2 className="text-xl font-bold text-myprimary">
							Intelligent Imagination
						</h2>
						<p>
							Our AI understands your words and crafts visuals that capture the
							essence of your imagination. Effortlessly translate your ideas
							into stunning images with a simple text input.
						</p>
					</FeatureCard>
					<FeatureCard>
						<h2 className="text-xl font-bold text-myprimary">
							Instant Artistry
						</h2>
						<p>
							Say goodbye to long hours of designing. Our AI swiftly generates
							high-quality images, saving you time to focus on what matters most
							– your ideas. Embrace efficiency without compromising on
							creativity.
						</p>
					</FeatureCard>
					<FeatureCard>
						<h2 className="text-xl font-bold text-myprimary">
							Tailored Visuals
						</h2>
						<p>
							Take charge of your creations. Adjust styles, colors, and details
							to match your vision. Our platform provides unparalleled
							customization, ensuring each image reflects your unique artistic
							perspective.
						</p>
					</FeatureCard>
				</div>
			</section>
			<section className="my-24 mt-34">
				<h2 className="text-6xl font-bold text-center text-white max-md:text-4xl">
					Use Sabi AI today
				</h2>
				<div className="md:px-32 mt-7 ">
					<Image
						src="/screen1.png"
						height={1000}
						width={1000}
						alt="logo"
						className="w-full h-full shadow-2xl shadow-blue-300/25 rounded-lg "
					/>
				</div>
			</section>
			<section className=" flex items-center my-10 mt-34 max-md:flex-col">
				<div className="flex flex-col items-start max-md:items-center gap-6">
					<h2 className="text-3xl font-bold leading-[1.3] text-white max-md:text-center">
						Create your next artwork, with the power of Sabi Ai
					</h2>
					<Link
						href={"/image"}
						className="text-white p-3 py-3 px-6 max-md:p-2 max-md:px-4 rounded-3xl flex items-center justify-center bg-myprimary hover:bg-myprimary/50 transition-all duration-300"
					>
						Start for free
					</Link>
				</div>
				<div className="md:px-32 mt-7 ">
					<Image
						src="/screen.png"
						height={1000}
						width={1000}
						alt="logo"
						className="w-full h-full border rounded-lg shadow-2xl shadow-blue-300/25 "
					/>
				</div>
			</section>
		</div>
	);
}

const FeatureCard = ({ children }: { children: ReactNode }) => {
	return (
		<div className="space-y-3 bg-slate-700 p-6 py-10 rounded-sm shadow-2xl shadow-blue-300/25">
			{children}
		</div>
	);
};
