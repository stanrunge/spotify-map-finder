import "./globals.css";

import Icons from "@/components/Icons";
import SearchField from "@/components/SearchField";
import { setCookies } from "./actions";
import { usePathname } from "next/navigation";

export default function Index({
  searchParams,
}: {
  searchParams: {
    osuCode: string | undefined;
    spotifyCode: string | undefined;
  };
}) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
        Development is actively being done right now, check my Twitter for
        updates
      </div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <SearchField />
        <Icons />
      </div>
    </>
  );
}
