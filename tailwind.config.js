/** @type {import('tailwindcss').Config} */

import boilerplateConfig from "@0xsequence-demos/boilerplate-design-system/tailwind-config";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ...boilerplateConfig.content,
  ],
  presets: [boilerplateConfig],
};
