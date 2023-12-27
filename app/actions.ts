"use server";

import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { SearchExecutionFunction } from "@spotify/web-api-ts-sdk/dist/mjs/endpoints/SearchEndpoints";
import { Beatmapset, Client } from "osu-web.js";
import { cookies } from "next/headers";

export async function getSpotifyMetadata(query: string) {
  if (
    !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ||
    !process.env.SPOTIFY_CLIENT_SECRET
  )
    throw new Error("Missing Spotify client ID or secret");

  const spotifySdk = SpotifyApi.withClientCredentials(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
  );

  // Check if the query is a Spotify URL
  if (query.startsWith("https://open.spotify.com/track/")) {
    // Extract the track ID from the URL
    const trackId = query
      .split("https://open.spotify.com/track/")[1]
      .split("?")[0];

    // Get the track data
    const track = await spotifySdk.tracks.get(trackId);

    // Return the track data in a format that matches the search result
    return track;
  }

  const result = await spotifySdk.search(query, ["track"]);

  return result.tracks.items[0];
}

export async function getOsuMaps(track: Track) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const body = `client_id=${process.env.NEXT_PUBLIC_OSU_CLIENT_ID}&client_secret=${process.env.OSU_CLIENT_SECRET}&grant_type=client_credentials&scope=public`;

  let accessTokenResponse = await fetch("https://osu.ppy.sh/oauth/token", {
    method: "POST",
    headers,
    body: body,
  });

  let accessToken: {
    token_type: string;
    expires_in: number;
    access_token: string;
  } = await accessTokenResponse.json();

  const osuClient = new Client(accessToken.access_token);

  let beatmaps: { beatmapsets: Beatmapset[] } = await osuClient.getUndocumented(
    "/beatmapsets/search/?q=" + track.name
  );

  let filteredBeatmaps = beatmaps.beatmapsets.filter(
    (mapset) => mapset.title === track.name
  );

  return filteredBeatmaps;
}

export async function setCookies(key: string, value: string) {
  cookies().set(key, value);
}

export async function getCookie(key: string) {
  return cookies().get(key);
}
