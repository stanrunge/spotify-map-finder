"use server";

import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { SearchExecutionFunction } from "@spotify/web-api-ts-sdk/dist/mjs/endpoints/SearchEndpoints";

export async function getSpotifyMetadata(query: string) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET)
    throw new Error("Missing Spotify client ID or secret");

  const spotifySdk = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
  );

  // Check if the query is a Spotify URL
  if (query.startsWith("https://open.spotify.com/track/")) {
    // Extract the track ID from the URL
    const trackId = query
      .split("https://open.spotify.com/track/")[1]
      .split("?")[0];

    // Get and return the track data in a format that matches the search result
    return await spotifySdk.tracks.get(trackId);
  }

  const result = await spotifySdk.search(query, ["track"]);

  return result.tracks.items[0];
}

export async function getOsuMaps(track: Track) {
  const beatmapRequest = await fetch(`https://catboy.best/api/v2/search?q=${track.name}`)
  const beatmaps = await beatmapRequest.json()

  return beatmaps.filter((mapset) => mapset.title === track.name);
}
