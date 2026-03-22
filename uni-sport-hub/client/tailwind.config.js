/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "gradient-shift": "gradient-shift 12s ease infinite",
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out 1s infinite",
        "float-reverse": "float-reverse 10s ease-in-out 0.5s infinite",
        "turf-shift": "turf-shift 10s linear infinite",
        "turf-pan": "turf-pan 6s ease-in-out infinite",
        "player-run": "player-run 2.6s ease-in-out infinite",
        "player-run-fast": "player-run-fast 1.8s ease-in-out infinite",
        "ball-arc": "ball-arc 1.9s ease-in-out infinite",
        "rugby-hike": "rugby-hike 2.3s ease-in-out infinite",
        "bowler-bob": "bowler-bob 1.6s ease-in-out infinite",
        "bat-swing": "bat-swing 1.2s ease-in-out infinite",
        "wicket-breathe": "wicket-breathe 2.8s ease-in-out infinite",
        "bowler-bob-cricket": "bowler-bob-cricket 1.2s ease-in-out infinite",
        "bat-swing-cricket": "bat-swing-cricket 1s ease-in-out infinite",
        "wicket-breathe-cricket": "wicket-breathe-cricket 1.8s ease-in-out infinite",
        "cricket-ball-arc": "cricket-ball-arc 1.4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay-1": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
        "fade-in-up-delay-2": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
        "fade-in-up-delay-3": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards",
        "fade-in-up-delay-4": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -25px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-35px, 20px)" },
        },
        "turf-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "turf-pan": {
          "0%, 100%": { transform: "translateX(-26px)" },
          "50%": { transform: "translateX(26px)" },
        },
        "player-run": {
          "0%, 100%": { transform: "translateX(0px) translateY(0px) scale(1)" },
          "50%": { transform: "translateX(34px) translateY(-4px) scale(1.02)" },
        },
        "player-run-fast": {
          "0%, 100%": { transform: "translateX(0px) translateY(0px)" },
          "50%": { transform: "translateX(44px) translateY(-6px)" },
        },
        "ball-arc": {
          "0%, 100%": { transform: "translateX(0px) translateY(0px) rotate(-12deg) scale(1)" },
          "35%": { transform: "translateX(42px) translateY(-38px) rotate(22deg) scale(1.02)" },
          "70%": { transform: "translateX(86px) translateY(0px) rotate(8deg) scale(0.98)" },
        },
        "rugby-hike": {
          "0%, 100%": { transform: "translateX(0px) translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateX(-18px) translateY(6px) rotate(-6deg)" },
          "60%": { transform: "translateX(36px) translateY(-18px) rotate(10deg)" },
        },
        "bowler-bob": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bat-swing": {
          "0%, 100%": { transform: "rotate(-10deg) translateY(0px)" },
          "50%": { transform: "rotate(26deg) translateY(-4px)" },
        },
        "wicket-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "bowler-bob-cricket": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-16px) scale(1.03)" },
        },
        "wicket-breathe-cricket": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.16)" },
        },
        "bat-swing-cricket": {
          "0%, 100%": { transform: "rotate(-18deg) translateY(0px)" },
          "50%": { transform: "rotate(34deg) translateY(-8px)" },
        },
        "cricket-ball-arc": {
          "0%, 100%": {
            transform: "translateX(0px) translateY(0px) rotate(-10deg) scale(1)"
          },
          "35%": {
            transform: "translateX(62px) translateY(-44px) rotate(26deg) scale(1.06)"
          },
          "70%": {
            transform: "translateX(108px) translateY(0px) rotate(12deg) scale(0.98)"
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
