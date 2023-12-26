"use client";

import { useRouter } from "next/navigation";
import { env } from "process";

export default function LoginButton(props: any) {
  const router = useRouter();

  function getData(service: string) {
    if (service == "osu") {
      return {
        color: "bg-pink-500",
        name: "osu!",
        url: "https://osu.ppy.sh/oauth/authorize",
        scopes: "public",
        envVar: process.env.NEXT_PUBLIC_OSU_CLIENT_ID,
      };
    } else {
      return {
        color: "bg-green-500",
        name: "Spotify",
        url: "https://accounts.spotify.com/authorize",
        scopes: "user-read-private user-read-email",
        envVar: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      };
    }
  }

  function handleLogin() {
    const clientId = serviceData.envVar!;
    const redirectUri = encodeURIComponent(
      `http://localhost:3000/auth/${props.service}`
    );
    const scopes = encodeURIComponent(serviceData.scopes); // replace with your actual scopes

    const authUrl = `${serviceData.url}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

    // Redirect the user to the Spotify authorization page
    router.push(authUrl);
  }

  const serviceData = getData(props.service);

  return (
    <>
      <button
        onClick={handleLogin}
        className={`block flex-1 p-3 rounded ${
          serviceData.color
        } text-white font-bold ${
          props.disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={props.disabled}
      >
        Login with {serviceData.name}
      </button>
    </>
  );
}
