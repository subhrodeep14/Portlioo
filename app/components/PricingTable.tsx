// components/PricingTable.js
import React from "react";

const plans = [
  {
    name: "Basic",
    price: 10,
    features: [
      "Access to all basic courses",
      "Community support",
      "10 practice projects",
      "Course completion certificate",
      "Basic code review",
    ],
    highlighted: false,
    color: "black",
    text: "zinc-800",
    border: "gray-200",
    button: "bg-indigo-500 text-white hover:bg-indigo-600",
    buttonText: "Get Started",
    badge: null,
    badgeColor: "",
    pb: "pb-16"
  },
  {
    name: "Pro",
    price: 59,
    features: [
      "Access to all Pro courses",
      "Priority community support",
      "30 practice projects",
      "Course completion certificate",
      "Advance code review",
      "1-on-1 mentoring sessions",
      "Job assistance",
    ],
    highlighted: true,
    color: "indigo-500",
    text: "white",
    border: "gray-500/30",
    button: "bg-white text-indigo-500 hover:bg-gray-200",
    buttonText: "Get Started",
    badge: "Most Popular",
    badgeColor: "bg-[#8789FB]",
    pb: "pb-14"
  },
  {
    name: "Enterprise",
    price: 99,
    features: [
      "Access to all courses",
      "Dedicated support",
      "Unlimited projects",
      "Course completion certificate",
      "Premium code review",
      "Weekly 1-on-1 mentoring",
      "Job guarantee",
    ],
    highlighted: false,
    color: "black",
    text: "zinc-800",
    border: "gray-200",
    button: "bg-indigo-500 text-white hover:bg-indigo-600",
    buttonText: "Get Started",
    badge: null,
    badgeColor: "",
    pb: "",
  },
];

function CheckIcon({ color }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill={color || "#6366F1"}/>
    </svg>
  );
}

function Plan({plan}: {plan: typeof plans[number]}) {
  return (
    <div className={`w-80 bg-${plan.color} text-center text-${plan.text} border border-${plan.border} p-10 rounded-lg ${plan.pb} hover:scale-105 transition-transform duration-300 relative`}>
      {plan.badge && (
        <p className={`absolute px-3 text-sm -top-3.5 left-3.5 py-1 ${plan.badgeColor} rounded-full`}>
          {plan.badge}
        </p>
      )}
      <p className="font-semibold pt-2">{plan.name}</p>
      <h1 className="text-3xl font-semibold">
        ${plan.price}
        <span className={`text-zinc-800 text-sm font-normal`}>/month</span>
      </h1>
      <ul className={`list-none text-${plan.text === "white" ? "white" : "gray-500"} text-sm mt-6 space-y-1`}>
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <CheckIcon color={plan.text === "white" ? "currentColor" : "#6366F1"} />
            <p>{feature}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`${plan.button} text-sm w-full py-2 rounded font-medium mt-7 transition-all`}
      >
        {plan.buttonText}
      </button>
    </div>
  );
}

export default function PricingTable() {
  return (
    <div className=" bg-gray-50  min-h-screen">
      <h1 className="text-center text-zinc-800 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">Pricing</h1>
      <p className="text-center text-gray-500 md:text-lg mt-2">Use it for free for yourself, upgrade when your team needs
        advanced control.</p>
    
    <div className="flex flex-wrap items-center justify-center gap-6 pt-25">
        
      {plans.map((plan, i) => (
        <Plan key={plan.name} plan={plan} />
      ))}
    </div>
    </div>
  );
}
