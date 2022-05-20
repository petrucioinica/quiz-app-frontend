// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
	primary: {
		100: "#bbfcf4",
		200: "#8ce6da",
		300: "#7ac2b9",
		400: "#5aa69d",
		500: "#1B998B",
		600: "#167d72",
		700: "#126b62",
		800: "#0b574f",
		900: "#1f403c",
	},
	secondary: {
		100: "#e3ebc0",
		200: "#e7f0c0",
		300: "#e5f2a7",
		400: "#e1f294",
		500: "#C5D86D",
		600: "#b6cc54",
		700: "#83962a",
		800: "#72851b",
		900: "#516109",
	},
	danger: {
		100: "#d1808a",
		200: "#d46c79",
		300: "#d45565",
		400: "#d9384d",
		500: "#D7263D",
		600: "#bf192e",
		700: "#9e0e20",
		800: "#730311",
		900: "#57030e",
	},
	warning: {
		100: "#d6b683",
		200: "#deb471",
		300: "#e0ac58",
		400: "#db9c37",
		500: "#E89005",
		600: "#c77b02",
		700: "#a16302",
		800: "#855101",
		900: "#613b00",
	},
	alternate: {
		500: "#2191FB",
	},
};

export const QITheme = extendTheme({
	colors,
	fonts: {
		body: "Mukta, sans-serif",
		secondary: "Koulen, cursive",
	},
});
