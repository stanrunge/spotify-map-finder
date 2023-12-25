"use client";

import { Track } from "@spotify/web-api-ts-sdk";
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
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>

      <h2>Results ({mapsets.length})</h2>
      <ul>
        {mapsets.map((mapset) => (
          <li key={mapset.id}>
            {mapset.artist} - {mapset.title}
          </li>
        ))}
      </ul>
    </>
  );
}
