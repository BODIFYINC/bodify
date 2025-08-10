
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
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
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
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				bodify: {
					purple: '#A15EFF',
					orange: '#1A8FE3',
					dark: '#0B0B0F',
					darker: '#111320',
					accent: '#00FF88',
					light: '#D6D6E0',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'gradient-shift': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				},
				'shimmer': {
					'0%': { 'background-position': '-200% 0' },
					'100%': { 'background-position': '200% 0' }
				},
				'slideInBottom': {
					'from': { opacity: '0', transform: 'translateY(30px)' },
					'to': { opacity: '1', transform: 'translateY(0)' }
				},
				'slideInRight': {
					'from': { opacity: '0', transform: 'translateX(30px)' },
					'to': { opacity: '1', transform: 'translateX(0)' }
				},
				'fadeInUp': {
					'from': { opacity: '0', transform: 'translateY(20px)' },
					'to': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulsePremium': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' }
				},
				'spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'gradient-shift': 'gradient-shift 6s ease infinite',
				'shimmer': 'shimmer 2s infinite',
				'slide-in-bottom': 'slideInBottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				'pulse-premium': 'pulsePremium 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'spin': 'spin 1s linear infinite'
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-pattern': "url('/hero-pattern.svg')",
				'bodify-gradient': 'linear-gradient(135deg, #1A8FE3 0%, #00FF88 100%)',
				'bodify-gradient-animated': 'linear-gradient(-45deg, #1A8FE3, #00FF88, #A15EFF, #22D3EE)'
			},
			backdropBlur: {
				'xs': '2px',
				'3xl': '64px'
			},
			boxShadow: {
				'premium': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'glow': '0 0 20px rgba(156, 77, 204, 0.3), 0 0 40px rgba(156, 77, 204, 0.1)',
				'glow-hover': '0 0 30px rgba(156, 77, 204, 0.4), 0 0 60px rgba(156, 77, 204, 0.2)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
