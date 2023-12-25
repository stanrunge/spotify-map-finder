import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Spotify Map Finder",
  description: "Find osu! maps from Spotify songs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
