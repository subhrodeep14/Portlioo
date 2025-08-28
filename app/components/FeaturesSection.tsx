import Image from "next/image";

const features = [
  {
    img: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-1.png",
    title: "Feedback analyser",
    desc: "Get instant insights into your finances with live dashboards.",
  },
  {
    img: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-2.png",
    title: "User management",
    desc: "Get instant insights into your finances with live dashboards.",
  },
  {
    img: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-3.png",
    title: "Better invoicing",
    desc: "Get instant insights into your finances with live dashboards.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 bg-white px-4 min-h-screen md:px-0">
      <h1 className="text-3xl text-black font-semibold text-center mx-auto">
        Powerful Features
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        Everything you need to manage, track, and grow your finances, securely and efficiently.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 mt-16">
        {features.map((feature, i) => (
          <div key={i} className="max-w-80 hover:-translate-y-0.5 transition duration-300">
            <Image
              className="rounded-xl"
              src={feature.img}
              width={320}
              height={200}
              alt={feature.title}
            />
            <h3 className="text-base font-semibold text-slate-700 mt-4">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
