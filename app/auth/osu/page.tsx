"use client";

import { setCookies } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OsuAuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const router = useRouter();

  useEffect(() => {
    setCookies("osuAuthCode", searchParams.code);

    router.push("/");
  }, []);

  return <></>;
}
