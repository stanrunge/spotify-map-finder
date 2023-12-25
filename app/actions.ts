"use server";

import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import { SearchExecutionFunction } from "@spotify/web-api-ts-sdk/dist/mjs/endpoints/SearchEndpoints";
import { Beatmapset, Client } from "osu-web.js";

export async function getSpotifyMetadata(query: string) {
  const spotifySdk = SpotifyApi.withClientCredentials(
    "3da326eb109b4f739f661c41a633606c",
    "2b71f2dadbaa4c5d85c9a85d37abefa8"
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

  const body =
    "client_id=18340&client_secret=cf0zEbd796RNQGu2pat0K4DvlooFbZO8HB9NaXJJ&grant_type=client_credentials&scope=public";

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
