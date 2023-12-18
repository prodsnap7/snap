import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Lato', 'Nunito Sans', ...fontFamily.sans]
			},
			cursor: {
				rotate: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSIjMDAwMDAwIiB2ZXJzaW9uPSIxLjEiIGlkPSJFYmVuZV8xIiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzAsMmMwLDEuMTA0LDAuODk2LDIsMiwyYzcuNDc5LDAsMTQuNTEsMi45MTMsMTkuNzk4LDguMjAyQzU3LjA4NywxNy40OSw2MCwyNC41MjEsNjAsMzJjMCw3LjM4MS0yLjg0MiwxNC4zMjMtOCwxOS41ODcgICBWNDZjMC0xLjEwNC0wLjg5Ni0yLTItMnMtMiwwLjg5Ni0yLDJ2MTJoMTJjMS4xMDQsMCwyLTAuODk2LDItMnMtMC44OTYtMi0yLTJoLTQuNzc2QzYwLjg4NSw0OC4wMzIsNjQsNDAuMjU3LDY0LDMyICAgYzAtOC41NDctMy4zMjktMTYuNTgzLTkuMzc0LTIyLjYyN0M0OC41ODMsMy4zMjksNDAuNTQ3LDAsMzIsMEMzMC44OTYsMCwzMCwwLjg5NiwzMCwyeiIvPgoJPHBhdGggZD0iTTkuMzc0LDU0LjYyN0MxNS40MTcsNjAuNjcxLDIzLjQ1Myw2NCwzMiw2NGMxLjEwNCwwLDItMC44OTYsMi0ycy0wLjg5Ni0yLTItMmMtNy40NzksMC0xNC41MS0yLjkxMy0xOS43OTgtOC4yMDIgICBDNi45MTMsNDYuNTEsNCwzOS40NzksNCwzMmMwLTcuMzgxLDIuODQyLTE0LjMyMyw4LTE5LjU4N1YxOGMwLDEuMTA0LDAuODk2LDIsMiwyczItMC44OTYsMi0yVjZINEMyLjg5Niw2LDIsNi44OTYsMiw4ICAgczAuODk2LDIsMiwyaDQuNzc2QzMuMTE1LDE1Ljk2OCwwLDIzLjc0MywwLDMyQzAsNDAuNTQ3LDMuMzI5LDQ4LjU4Myw5LjM3NCw1NC42Mjd6Ii8+CjwvZz4KPC9zdmc+"), pointer`
			}
		}
	}
};

export default config;
