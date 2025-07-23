"use client";
import posthog from "posthog-js";
import { useEffect} from "react";

export default function Home() {
  useEffect(() => {
    posthog.identify("123");
  }, []);


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button onClick={() => posthog.capture("button_clicked")}>Click me</button>
      {posthog.isFeatureEnabled("welcome-banner") &&
      <div>Welcome to the app !</div>
      }
    </div>
  );
}
