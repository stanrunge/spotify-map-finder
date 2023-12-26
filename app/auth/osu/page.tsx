"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OsuAuthPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const [osuAuthCode, setOsuAuthCode] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    setOsuAuthCode(searchParams.code);
    router.push("/");
  }, []);

  useEffect(() => {
    console.log(osuAuthCode);
  }, [osuAuthCode]);
}
