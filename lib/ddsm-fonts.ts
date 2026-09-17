import { DM_Serif_Text, Manrope } from "next/font/google";

export const dmSerif = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const fontVariables = `${dmSerif.variable} ${manrope.variable}`;
