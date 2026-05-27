import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: { '2xl': '1400px' }
		},
		extend: {
			fontFamily: {
				pixel: ['"Press Start 2P"', 'monospace'],
				rubik: ['Rubik', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				glow: 'hsl(var(--glow))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: '0px',
				md: '0px',
				sm: '0px',
			},
			boxShadow: {
				pixel: '4px 4px 0px hsl(var(--shadow))',
				'pixel-lg': '6px 6px 0px hsl(var(--shadow))',
				glow: '0 0 20px hsl(var(--glow) / 0.6), 0 0 60px hsl(var(--glow) / 0.3)',
				'glow-sm': '0 0 10px hsl(var(--glow) / 0.5)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(16px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.92)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(100%)' }
				},
				'pixel-flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				},
				'scan': {
					from: { transform: 'translateY(-100%)' },
					to: { transform: 'translateY(100vh)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 10px hsl(var(--glow) / 0.4)' },
					'50%': { boxShadow: '0 0 30px hsl(var(--glow) / 0.8), 0 0 60px hsl(var(--glow) / 0.4)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'progress-bar': {
					from: { width: '0%' },
					to: { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out forwards',
				'scale-in': 'scale-in 0.3s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-in',
				'pixel-flicker': 'pixel-flicker 3s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'scan': 'scan 8s linear infinite',
				'progress-bar': 'progress-bar 10s linear forwards',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
