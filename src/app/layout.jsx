import '../index.css';
import '../App.css';

export const metadata = {
  title: 'Ịbạnị Nume — Ibani Songs & Indigenous Music Videos',
  description: 'Authentic indigenous music videos and cultural songs from Grand Bonny and Opobo Kingdoms in Rivers State, Nigeria.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
