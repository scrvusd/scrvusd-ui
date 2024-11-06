"use client"
import { ManageStaking } from "@/components/ManageStaking";
import { Stats } from "@/components/Stats";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 min-h-full sm:p-10 pt-1 pb-1 font-[family-name:var(--font-geist-sans)]">
    
        <ManageStaking />
        <Stats />
      
    </div>
  );
}
