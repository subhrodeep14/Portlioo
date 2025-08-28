import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-10 bg-white">
      <h1 className="text-6xl font-semibold text-center text-black mx-auto">About our apps</h1>
      <p className="text-md text-slate-500 text-center mt-2 max-w-md mx-auto">
        A visual collection of our most recent works - each piece crafted with intention, emotion and style.
      </p>
      <div className="max-w-7xl mx-auto mt-5 flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <Image
          className="max-w-md w-full rounded-xl h-auto"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          width={600}
          height={600}
          alt=""
        />
        <div>
          <h1 className="text-3xl text-black font-semibold">Our Latest features</h1>
          <p className="text-sm text-slate-500 mt-2">
            Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
          </p>
          <div className="flex flex-col gap-10 mt-6">
            <Feature
              emojiSrc="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
              title="Lightning-Fast Performance"
              desc="Built with speed — minimal load times and optimized."
            />
            <Feature
              emojiSrc="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
              title="Beautifully Designed Components"
              desc="Modern, pixel-perfect UI components ready for any project."
            />
            <Feature
              emojiSrc="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
              title="Plug-and-Play Integration"
              desc="Simple setup with support for React, Next.js and Tailwind css."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ emojiSrc, title, desc }: { emojiSrc: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
        <Image src={emojiSrc} width={32} height={32} alt="" />
      </div>
      <div>
        <h3 className="text-base font-medium text-slate-600">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
