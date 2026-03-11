import localFont from "next/font/local";

export const bricolageGrotesque = localFont({
  src: [
    {
      path: "../public/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf",
      weight: "700",
    },
  ],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      weight: '300 700',
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      weight: '600',
      style: "italic",
    }
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
