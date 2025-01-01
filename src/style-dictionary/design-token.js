export const MfeDesignTokens = {
  mfe: {
    color: {
      primary: {
        base: { value: "#f27a1a" },
        highlight: { value: "#ef6114" },
        contrast: { value: "#fef2e8" },
      },
      success: {
        base: { value: "#0bc15c" },
        highlight: { value: "#09a44e" },
        contrast: { value: "#e7f9ef" },
      },
      danger: {
        base: { value: "#ff5043" },
        highlight: { value: "#ff3028" },
        contrast: { value: "#ffeeec" },
      },
      warning: {
        base: { value: "#ffb600" },
        highlight: { value: "#ff9800" },
        contrast: { value: "#fff8e6" },
      },
      info: {
        base: { value: "#5794ff" },
        highlight: { value: "#457eff" },
        contrast: { value: "#eef4ff" },
      },
      neutral: {
        none: { value: "#000" },
        darkest: { value: "#0f131a" },
        darker: { value: "#273142" },
        dark: { value: "#6e7787" },
        light: { value: "#95a1b5" },
        lighter: { value: "#afbbca" },
        lightest: { value: "#f1f2f7" },
        full: { value: "#fff" },
      },
    },
    size: {
      "4xs": { value: "0.125rem" }, // 2px
      "3xs": { value: "0.25rem" }, // 4px
      "2xs": { value: "0.5rem" }, // 8px
      xs: { value: "0.75rem" }, // 12px
      s: { value: "0.875rem" }, // 14px
      m: { value: "1rem" }, // 16px
      l: { value: "1.25rem" }, // 20px
      xl: { value: "1.5rem" }, // 24px
      "2xl": { value: "2rem" }, // 32px
      "3xl": { value: "2.5rem" }, // 40px
      "4xl": { value: "3rem" }, // 48px
      "5xl": { value: "4rem" }, // 64px
      "6xl": { value: "5rem" }, // 80px
    },
    index: {
      deep: { value: "-1" },
      base: { value: "1" },
      popover: { value: "100" },
      tooltip: { value: "200" },
      sticky: { value: "300" },
      overlay: { value: "400" },
      dialog: { value: "500" },
      notification: { value: "600" },
    },
    font: {
      family: { value: '"Rubik", sans-serif' },
      weight: {
        light: { value: "300" },
        regular: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
      },
      size: {
        "2xs": { value: "0.5rem" }, // 8px
        xs: { value: "0.625rem" }, // 10px
        s: { value: "0.75rem" }, // 12px
        m: { value: "0.875rem" }, // 14px
        l: { value: "1rem" }, // 16px
        xl: { value: "1.25rem" }, // 20px
        "2xl": { value: "1.5rem" }, // 24px
        "3xl": { value: "1.75rem" }, // 28px
        "4xl": { value: "2rem" }, // 32px
        "5xl": { value: "3rem" }, // 48px
        "6xl": { value: "4rem" }, // 64px
      },
      display: {
        "font-size": {
          value: "{mfe.font.size.5xl.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.display.font-size.value} + {mfe.size.2xs.value})",
        },
        size: {
          value:
            "{mfe.font.display.font-size.value} / {mfe.font.display.line-height.value}",
        },
        base: {
          value: "{mfe.font.display.size.value} {mfe.font.family.value}",
        },
        light: {
          value: "{mfe.font.weight.light.value} {mfe.font.display.base.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.display.base.value}",
        },
        medium: {
          value: "{mfe.font.weight.medium.value} {mfe.font.display.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.display.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.display.base.value}",
        },
      },
      "heading-1": {
        "font-size": {
          value: "{mfe.font.size.4xl.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.heading-1.font-size.value} + {mfe.size.3xs.value})",
        },
        size: {
          value:
            "{mfe.font.heading-1.font-size.value} / {mfe.font.heading-1.line-height.value}",
        },
        base: {
          value: "{mfe.font.heading-1.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.heading-1.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.heading-1.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.heading-1.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.heading-1.base.value}",
        },
      },
      "heading-2": {
        "font-size": {
          value: "{mfe.font.size.3xl.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.heading-2.font-size.value} + {mfe.size.3xs.value})",
        },
        size: {
          value:
            "{mfe.font.heading-2.font-size.value} / {mfe.font.heading-2.line-height.value}",
        },
        base: {
          value: "{mfe.font.heading-2.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.heading-2.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.heading-2.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.heading-2.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.heading-2.base.value}",
        },
      },
      "heading-3": {
        "font-size": {
          value: "{mfe.font.size.2xl.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.heading-3.font-size.value} + {mfe.size.3xs.value})",
        },
        size: {
          value:
            "{mfe.font.heading-3.font-size.value} / {mfe.font.heading-3.line-height.value}",
        },
        base: {
          value: "{mfe.font.heading-3.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.heading-3.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.heading-3.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.heading-3.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.heading-3.base.value}",
        },
      },
      "title-1": {
        "font-size": {
          value: "{mfe.font.size.xl.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.title-1.font-size.value} + {mfe.size.3xs.value})",
        },
        size: {
          value:
            "{mfe.font.title-1.font-size.value} / {mfe.font.title-1.line-height.value}",
        },
        base: {
          value: "{mfe.font.title-1.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.title-1.base.value}",
        },
        medium: {
          value: "{mfe.font.weight.medium.value} {mfe.font.title-1.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.title-1.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.title-1.base.value}",
        },
      },
      "title-2": {
        "font-size": {
          value: "{mfe.font.size.l.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.title-2.font-size.value} + {mfe.size.3xs.value})",
        },
        size: {
          value:
            "{mfe.font.title-2.font-size.value} / {mfe.font.title-2.line-height.value}",
        },
        base: {
          value: "{mfe.font.title-2.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.title-2.base.value}",
        },
        medium: {
          value: "{mfe.font.weight.medium.value} {mfe.font.title-2.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.title-2.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.title-2.base.value}",
        },
      },
      "title-3": {
        "font-size": {
          value: "{mfe.font.size.m.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.title-3.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.title-3.font-size.value} / {mfe.font.title-3.line-height.value}",
        },
        base: {
          value: "{mfe.font.title-3.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.title-3.base.value}",
        },
        medium: {
          value: "{mfe.font.weight.medium.value} {mfe.font.title-3.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.title-3.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.title-3.base.value}",
        },
      },
      "title-4": {
        "font-size": {
          value: "{mfe.font.size.s.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.title-4.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.title-4.font-size.value} / {mfe.font.title-4.line-height.value}",
        },
        base: {
          value: "{mfe.font.title-4.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.title-4.base.value}",
        },
        medium: {
          value: "{mfe.font.weight.medium.value} {mfe.font.title-4.base.value}",
        },
        semibold: {
          value:
            "{mfe.font.weight.semibold.value} {mfe.font.title-4.base.value}",
        },
        bold: {
          value: "{mfe.font.weight.bold.value} {mfe.font.title-4.base.value}",
        },
      },
      "body-text-1": {
        "font-size": {
          value: "{mfe.font.size.l.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.body-text-1.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.body-text-1.font-size.value} / {mfe.font.body-text-1.line-height.value}",
        },
        base: {
          value: "{mfe.font.body-text-1.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.body-text-1.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.body-text-1.base.value}",
        },
      },
      "body-text-2": {
        "font-size": {
          value: "{mfe.font.size.m.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.body-text-2.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.body-text-2.font-size.value} / {mfe.font.body-text-2.line-height.value}",
        },
        base: {
          value: "{mfe.font.body-text-2.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.body-text-2.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.body-text-2.base.value}",
        },
      },
      "body-text-3": {
        "font-size": {
          value: "{mfe.font.size.s.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.body-text-3.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.body-text-3.font-size.value} / {mfe.font.body-text-3.line-height.value}",
        },
        base: {
          value: "{mfe.font.body-text-3.size.value} {mfe.font.family.value}",
        },
        regular: {
          value:
            "{mfe.font.weight.regular.value} {mfe.font.body-text-3.base.value}",
        },
        medium: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.body-text-3.base.value}",
        },
      },
      caption: {
        "font-size": {
          value: "{mfe.font.size.xs.value}",
        },
        "line-height": {
          value:
            "calc({mfe.font.caption.font-size.value} + {mfe.size.4xs.value})",
        },
        size: {
          value:
            "{mfe.font.caption.font-size.value} / {mfe.font.caption.line-height.value}",
        },
        base: {
          value:
            "{mfe.font.weight.medium.value} {mfe.font.caption.size.value} {mfe.font.family.value}",
        },
      },
    },
    "border-radius": {
      xs: { value: "0.125rem" }, // 2px
      s: { value: "0.25rem" }, // 4px
      m: { value: "0.375rem" }, // 6px
      l: { value: "0.5rem" }, // 8px
      pill: { value: "62.438rem" }, // 999px
      circle: { value: "50%" },
    },
    "text-x-direction": { value: "1" },
    button: {
      display: {
        value: "block",
      },
    },
  },
};
