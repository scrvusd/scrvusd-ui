"use client"
import { ManageStaking } from "@/components/ManageStaking";
import { Stats } from "@/components/Stats";

export default function Home() {


  return (
    <div className="flex flex-row justify-center items-stretch min-h-full gap-2 sm:p-10 p-10 font-[family-name:var(--font-geist-sans)]">
    
        <ManageStaking />
        <Stats />
      
    </div>
  );
}
