"use client";

import { ChangeEvent, useState } from "react";
import { getOsuMaps, getSpotifyMetadata } from "../app/actions";
import { Track } from "@spotify/web-api-ts-sdk";
import { Beatmapset } from "osu-web.js";
import LoginButton from "./LoginButton";

export default function SearchField(props: any) {
  const [inputValue, setInputValue] = useState<string>("");
  const [mapsets, setMapsets] = useState<Beatmapset[]>([]); // TODO: Change to Beatmapset[

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    if (inputValue === "") return;
    let spotifyMetadata: Track = await getSpotifyMetadata(inputValue);

    await getOsuMaps(spotifyMetadata)
      .then((result) => {
        setMapsets(result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching osu mapsets:", error);
      });
  };

  const osuLoginButtonData = {
    color: "bg-pink-500",
    name: "osu!",
    url: "https://osu.ppy.sh/oauth/authorize",
    scopes: "identify",
    clientId: process.env.NEXT_PUBLIC_OSU_CLIENT_ID!,
    cookieName: "osuAuthCode",
    callbackName: "osu",
  };

  const spotifyLoginButtonData = {
    color: "bg-green-500",
    name: "Spotify",
    url: "https://accounts.spotify.com/authorize",
    scopes: "user-read-currently-playing",
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    cookieName: "spotifyAuthCode",
    callbackName: "spotify",
  };

  return (
    <>
      <div className="relative py-3 max-w-5xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Spotify Map Finder
          </h1>
          <div className="flex space-x-4 py-4">
            <LoginButton service={osuLoginButtonData} />
            <LoginButton service={spotifyLoginButtonData} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Enter title or URL"
              onChange={handleInputChange}
              className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 text-white transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 rounded"
            >
              Search
            </button>
          </form>

          <h2 className="pt-8 text-2xl font-semibold">
            Results ({mapsets.length})
          </h2>
          <ul className="grid grid-cols-3 gap-4">
            {mapsets.map((mapset) => (
              <a
                href={`https://osu.ppy.sh/beatmapsets/${mapset.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li
                  key={mapset.id}
                  className="border p-4 rounded bg-gray-100 text-white shadow shadow-black w-64 "
                  style={{
                    backgroundImage: `url(${mapset.covers["card@2x"]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {mapset.artist} - {mapset.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
