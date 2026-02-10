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
      weight: " 300, 500, 600, 600i, 700",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
