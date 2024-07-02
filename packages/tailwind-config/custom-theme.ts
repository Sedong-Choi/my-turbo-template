const customTheme = {
  extend: {
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      "spin-down": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(-180deg)" },
      },
      "spin-up": {
        "0%": { transform: "rotate(180deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      "move-to-left": {
        "0%": { marginLeft: "100%", transform: "translateX(100%)" },
        "100%": { marginLeft: "0" },
      },
      "move-to-right": {
        "0%": { marginRight: "100%", transform: "translateX(-100%)" },
        "100%": { marginRight: "0" },
      },
    },
    animation: {
      spinUp: "spin-up 1s linear",
      spinDown: "spin-down 1s linear",
      "move-to-left-20": "move-to-left 20s linear infinite",
      "move-to-right-20": "move-to-right 20s linear infinite",
      "move-to-left-10": "move-to-left 10s linear infinite",
      "move-to-right-10": "move-to-right 10s linear infinite",
    },
  },
};
export default customTheme;
