"use client";

import { useRouter } from "next/navigation";

export default function LoginButton(props: {
  service: {
    color: string;
    name: string;
    url: string;
    scopes: string;
    clientId: string;
    cookieName: string;
    callbackName: string;
  };
}) {
  const router = useRouter();

  function handleLogin() {
    const redirectUri = encodeURIComponent(
      `http://localhost:3000/auth/${props.service.callbackName}`
    );
    const scopes = encodeURIComponent(props.service.scopes); // replace with your actual scopes

    const authUrl = `${props.service.url}?client_id=${props.service.clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

    // Redirect the user to the Spotify authorization page
    router.push(authUrl);
  }

  function isDisabled() {
    return window.document.cookie.includes(props.service.cookieName);
  }

  return (
    <>
      <button
        onClick={handleLogin}
        className={`block flex-1 p-3 rounded ${
          props.service.color
        } text-white font-bold ${
          isDisabled() ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDisabled()}
      >
        Login with {props.service.name}
      </button>
    </>
  );
}
