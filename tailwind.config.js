/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      backgroundImage: {
        /** Gradients */
        gradientBackdrop: `linear-gradient(
          243.18deg,
          rgba(86, 52, 189, 0.85) 0%,
          rgba(49, 41, 223, 0.85) 63.54%,
          rgba(7, 98, 149, 0.85) 100%
        )`,
        gradientPrimary: `linear-gradient(89.69deg, #4411E1 0.27%, #7537F9 99.73%)`,
        gradientSecondary: `linear-gradient(32.51deg, #951990 -15.23%, #3A35B1 48.55%, #20A8B0 100%)`,
      },

      colors: {
        "bright-purple": {
          50: "#f5f5ff",
          100: "#ecebff",
          200: "#dfdbff",
          300: "#cac2ff",
          400: "#b9a3ff",
          500: "#a880ff",
          600: "#9c57ff",
          700: "#7d20fd",
          800: "#5f09dd",
          900: "#4e13af",
          950: "#320c6a",
        },
        "deep-purple": {
          50: "#E4D7F9",
          100: "#D5C1F6",
          200: "#BA98F0",
          300: "#9F70EB",
          400: "#8448E5",
          500: "#6920DF",
          600: "#561AB7",
          700: "#43148F",
          800: "#300F67",
          900: "#1D093E",
          950: "#14062A",
        },

        /** Semantic */
        positive: "#1FC266",
        negative: "#C2501F",
        info: "#0076CC",
        warning: "#F4B03E",

        arbitrumDark: "#212D44",
        arbitrumLight: "#93D4FF",
        avalanceDark: "#810C0C",
        avalanceLight: "#FF8080",
        bscDark: "#584508",
        bscLight: "#FCCF43",
        ethereumDark: "#132362",
        ethereumLight: "#AABBFF",
        gnosisDark: "#084246",
        gnosisLight: "#8CF6FD",
        polygonDark: "#350881",
        polygonLight: "#C7A6FF",

        /** Dark */
        dark_text100: "rgba(255, 255, 255, 1)",
        dark_text80: "rgba(255, 255, 255, 0.8)",
        dark_text50: "rgba(255, 255, 255, 0.5)",
        dark_textInverse100: "rgba(0, 0, 0, 1)",

        dark_backgroundPrimary: "rgba(0, 0, 0, 1)",
        dark_backgroundSecondary: "rgba(255, 255, 255, 0.1)",
        dark_backgroundContrast: "rgba(0, 0, 0, 0.5)",
        dark_backgroundMuted: "rgba(255, 255, 255, 0.05)",
        dark_backgroundControl: "rgba(255, 255, 255, 0.25)",
        dark_backgroundInverse: "rgba(255, 255, 255, 1)",
        dark_backgroundBackdrop: "rgba(34, 34, 34, 0.9)",
        dark_backgroundOverlay: "rgba(0, 0, 0, 0.7)",
        dark_backgroundRaised: "rgba(54, 54, 54, 0.7)",

        dark_buttonGlass: "rgba(255, 255, 255, 0.15)",
        dark_buttonEmphasis: "rgba(0, 0, 0, 0.5)",
        dark_buttonInverse: "rgba(255, 255, 255, 0.8)",

        dark_borderNormal: "rgba(255, 255, 255, 0.25)",
        dark_borderFocus: "rgba(255, 255, 255, 0.5)",

        /** Light */
        light_text100: "rgba(0, 0, 0, 1)",
        light_text80: "rgba(0, 0, 0, 0.8)",
        light_text50: "rgba(0, 0, 0, 0.5)",
        light_textInverse100: "rgba(255, 255, 255, 1)",

        light_backgroundPrimary: "rgba(244, 244, 244, 1)",
        light_backgroundSecondary: "rgba(0, 0, 0, 0.1)",
        light_backgroundContrast: "rgba(244, 244, 244, 0.5)",
        light_backgroundMuted: "rgba(0, 0, 0, 0.05)",
        light_backgroundControl: "rgba(0, 0, 0, 0.25)",
        light_backgroundInverse: "rgba(0, 0, 0, 1)",
        light_backgroundBackdrop: "rgba(221, 221, 221, 0.9)",
        light_backgroundOverlay: "rgba(244, 244, 244, 0.7)",
        light_backgroundRaised: "rgba(192, 192, 192, 0.7)",

        light_buttonGlass: "rgba(0, 0, 0, 0.15)",
        light_buttonEmphasis: "rgba(255, 255, 255, 0.5)",
        light_buttonInverse: "rgba(0, 0, 0, 0.8)",

        light_borderNormal: "rgba(0, 0, 0, 0.25)",
        light_borderFocus: "rgba(0, 0, 0, 0.5)",

        /** Palettes */
        grey: {
          50: "#D1D1D1",
          100: "#B0B0B0",
          200: "#888888",
          300: "#6D6D6D",
          400: "#5D5D5D",
          500: "#4F4F4F",
          600: "#454545",
          700: "#3D3D3D",
          800: "#262626",
          900: "#1B1B1B",
          950: "#101010",
        },
        red: {
          50: "#FDF7EF",
          100: "#FBECD9",
          200: "#F6D7B2",
          300: "#F1BB80",
          400: "#EA954D",
          500: "#E5792A",
          600: "#D66020",
          700: "#C2501F",
          800: "#8E3B1E",
          900: "#72331C",
          950: "#3E170C",
        },
        green: {
          50: "#F0FDF5",
          100: "#DCFCE9",
          200: "#BAF8D4",
          300: "#85F0B3",
          400: "#48E089",
          500: "#1FC266",
          600: "#14A554",
          700: "#148144",
          800: "#156639",
          900: "#135431",
          950: "#042F19",
        },
        yellow: {
          50: "#FBFAEB",
          100: "#F6F2CB",
          200: "#EFE499",
          300: "#E5CE5F",
          400: "#DDB938",
          500: "#CDA125",
          600: "#B07E1E",
          700: "#8D5C1B",
          800: "#754A1E",
          900: "#653F1E",
          950: "#3A200E",
        },
        blue: {
          50: "#F0F8FF",
          100: "#E0F0FE",
          200: "#B9E0FE",
          300: "#7CC8FD",
          400: "#36AEFA",
          500: "#0C94EB",
          600: "#0076CC",
          700: "#015CA3",
          800: "#064F86",
          900: "#0B426F",
          950: "#072A4A",
        },
        indigo: {
          50: "#F2F2FF",
          100: "#E9E7FF",
          200: "#D3D1FF",
          300: "#B3ADFF",
          400: "#8E7EFF",
          500: "#6A4AFF",
          600: "#5826FF",
          700: "#4411E1",
          800: "#3D10C7",
          900: "#340FA3",
          950: "#1C066F",
        },
        violet: {
          50: "#F3F2FF",
          100: "#EBE8FF",
          200: "#D9D3FF",
          300: "#BDB0FF",
          400: "#9D84FF",
          500: "#7F52FF",
          600: "#7537F9",
          700: "#601CE5",
          800: "#5117C0",
          900: "#43159D",
          950: "#270A6B",
        },
      },
      fontSize: [
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28, 30, 32, 34,
        36, 38, 40, 42, 44, 46, 48,
      ].reduce(
        (
          acc: Record<number, [string, Record<string, string>]>,
          key: number
        ) => {
          acc[key] = [
            `calc(${key / 16}rem * var(--font-size-multiplier, 1))`,
            {
              letterSpacing: "1%",
            },
          ];
          return acc;
        },
        {}
      ),
    },
  },
  plugins: [],
} satisfies Config;
