"use client";

import "./globals.css";

import { getOsuMaps, getSpotifyMetadata } from "./actions";
import { ChangeEvent, useState } from "react";
import { Beatmapset } from "osu-web.js";
import { Track } from "@spotify/web-api-ts-sdk";
import { Icon } from "@iconify/react";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [mapsets, setMapsets] = useState<Beatmapset[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    if (inputValue === "") return;
    const spotifyMetadata: Track = await getSpotifyMetadata(inputValue);
    try { //? i'm not sure about this one ~ Nanoo
      const result = await getOsuMaps(spotifyMetadata)
      setMapsets(result)
      console.log(result)
    } catch (err) {
      console.error("Error fetching osu mapsets:", err);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 z-50">
        Development is actively being done right now, check my Twitter for
        updates
      </div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 max-w-5xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
              Spotify Map Finder
            </h1>
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
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/stanrunge/spotify-map-finder"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="mdi:github" height={32} />
          </a>
          <a
            href="https://x.com/stanrunge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="iconoir:x" height={32} />
          </a>
        </div>
      </div>
    </div>
  );
}
