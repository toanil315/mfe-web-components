import StyleDictionary from "style-dictionary";
import createDictionary from "style-dictionary/lib/utils/createDictionary.js";
import { writeFileSync } from "fs";
import { MfeDesignTokens } from "./design-token.js";

const sd = StyleDictionary.extend({
  tokens: MfeDesignTokens,
  platforms: {
    css: {
      transformGroup: "css",
    },
  },
});

const cssString = StyleDictionary.format["css/variables"]({
  dictionary: createDictionary({ properties: sd.exportPlatform("css") }),
});

const cssFileContent = `
@import url("@fontsource-variable/rubik");

${cssString} 

:root[dir="rtl"] {
  /* Direction */
  direction: rtl;

  --mfe-text-x-direction: -1;

  /* Typography */
  --mfe-font-family: "Cairo";
}
`;

writeFileSync("src/style-dictionary/variables.css", cssFileContent);
