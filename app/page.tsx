"use client";

import "./globals.css";

import { getOsuMaps, getSpotifyMetadata } from "./actions";
import { ChangeEvent, useState } from "react";
import { Beatmapset } from "osu-web.js";

export default function Index() {
  const [inputValue, setInputValue] = useState("");
  const [mapsets, setMapsets] = useState<Beatmapset[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    let spotifyMetadata = await getSpotifyMetadata(inputValue);

    await getOsuMaps(spotifyMetadata.tracks.items[0].name)
      .then((result) => {
        setMapsets(result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching osu mapsets:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Search"
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
          <ul className="space-y-2">
            {mapsets.map((mapset) => (
              <li key={mapset.id} className="border p-4 rounded bg-gray-100">
                {mapset.artist} - {mapset.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
