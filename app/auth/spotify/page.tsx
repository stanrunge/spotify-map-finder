"use client";

import { setCookies } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SpotifyAuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const router = useRouter();

  useEffect(() => {
    setCookies("spotifyAuthCode", searchParams.code);

    router.push("/");
  }, []);

  return <></>;
}
