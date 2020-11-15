interface PageBaseThemefont {
  size: string;
  weight: string;
}

export interface PageBaseTheme {
  fonts: {
    headline: PageBaseThemefont;
    subHeadline: PageBaseThemefont;
    outline: PageBaseThemefont;
    normal: PageBaseThemefont;
    additionalInfo: PageBaseThemefont;
  };
  colors: {
    dark: string;
    normal: string;
  };
  grayscale: {
    dark: string;
    labelOnBackground: string;
    borderOnBackground: string;
    background: string;
    labelOnColor: string;
  };
}

export const orangeTheme: PageBaseTheme = {
  fonts: {
    headline: {
      size: "24px",
      weight: "800",
    },
    subHeadline: {
      size: "18px",
      weight: "500",
    },
    outline: {
      size: "13px",
      weight: "500",
    },
    normal: {
      size: "13px",
      weight: "300",
    },
    additionalInfo: {
      size: '11px',
      weight: '300'
    }
  },
  colors: {
    dark: "#FE5800",
    normal: "#FF7300",
  },
  grayscale: {
    dark: "#444444",
    labelOnBackground: "#606060",
    borderOnBackground: "#d8d8d8",
    labelOnColor: "#fafafa",
    background: "#f5f5f5",
  },
};
