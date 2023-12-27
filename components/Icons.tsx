"use client";

import { Icon } from "@iconify/react";

export default function Icons() {
  return (
    <>
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
        <a
          href="https://discord.gg/n3mZgWk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="ic:baseline-discord" height={32} />
        </a>
      </div>
    </>
  );
}
