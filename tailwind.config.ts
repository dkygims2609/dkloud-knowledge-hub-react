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
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))'
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			animation: {
				// Base animations
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'slide-up': 'slideUp 0.6s ease-out forwards',
				'bounce-in': 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
				'scale-in': 'scaleIn 0.6s ease-out forwards',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				
				// Modern micro-animations
				'hover-scale': 'hoverScale 0.2s ease-out',
				'hover-lift': 'hoverLift 0.3s ease-out',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite',
				'magnetic-pull': 'magneticPull 0.2s ease-out',
				'tilt-3d': 'tilt3D 0.3s ease-out',
				
				// Card animations
				'card-entrance': 'cardEntrance 0.8s ease-out forwards',
				'card-flip': 'cardFlip 0.6s ease-in-out',
				'card-glow': 'cardGlow 2s ease-in-out infinite',
				
				// Gradient animations  
				'gradient-shift': 'gradientShift 3s ease-in-out infinite',
				'gradient-flow': 'gradientFlow 4s ease-in-out infinite',
				'border-glow': 'borderGlow 2s linear infinite',
				
				// Text animations
				'typewriter': 'typewriter 3s ease-out forwards',
				'text-reveal': 'textReveal 1s ease-out forwards',
				'gradient-text': 'gradientText 3s ease-in-out infinite',
				
				// Interactive animations
				'parallax-slow': 'parallaxSlow 20s ease-in-out infinite',
				'parallax-medium': 'parallaxMedium 15s ease-in-out infinite',
				'parallax-fast': 'parallaxFast 10s ease-in-out infinite',
				
				// Floating animations
				'float-gentle': 'floatGentle 3s ease-in-out infinite',
				'float-dramatic': 'floatDramatic 4s ease-in-out infinite',
				'orbit': 'orbit 8s linear infinite',
				
				// Loading animations
				'shimmer': 'shimmer 2s ease-in-out infinite',
				'skeleton-pulse': 'skeletonPulse 1.5s ease-in-out infinite',
				'loading-dots': 'loadingDots 1.5s ease-in-out infinite',
				
				// Scroll animations
				'scroll-reveal': 'scrollReveal 0.8s ease-out forwards',
				'stagger-fade': 'staggerFade 0.6s ease-out forwards',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// Base accordion animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				
				// Micro-animations
				'hoverScale': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' }
				},
				'hoverLift': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-4px)' }
				},
				'glowPulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(59, 130, 246, 0.4)' }
				},
				'magneticPull': {
					'0%': { transform: 'translate(0, 0)' },
					'100%': { transform: 'translate(2px, -2px)' }
				},
				'tilt3D': {
					'0%': { transform: 'rotateX(0) rotateY(0)' },
					'100%': { transform: 'rotateX(5deg) rotateY(5deg)' }
				},
				
				// Card animations
				'cardEntrance': {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'cardFlip': {
					'0%': { transform: 'rotateY(0)' },
					'50%': { transform: 'rotateY(90deg)' },
					'100%': { transform: 'rotateY(0)' }
				},
				'cardGlow': {
					'0%, 100%': { boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)' },
					'50%': { boxShadow: '0 8px 40px rgba(147, 51, 234, 0.4), 0 0 60px rgba(59, 130, 246, 0.3)' }
				},
				
				// Gradient animations
				'gradientShift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'gradientFlow': {
					'0%': { backgroundPosition: '0% 50%' },
					'33%': { backgroundPosition: '100% 0%' },
					'66%': { backgroundPosition: '0% 100%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'borderGlow': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '200% 50%' }
				},
				
				// Text animations
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'textReveal': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'gradientText': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				
				// Parallax animations
				'parallaxSlow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'parallaxMedium': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-15px) rotate(2deg)' }
				},
				'parallaxFast': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(-2deg)' }
				},
				
				// Floating animations
				'floatGentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'floatDramatic': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(5px) rotate(-1deg)' }
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(20px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(20px) rotate(-360deg)' }
				},
				
				// Loading animations
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'skeletonPulse': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '1' }
				},
				'loadingDots': {
					'0%, 20%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
					'80%, 100%': { transform: 'scale(1)' }
				},
				
				// Scroll animations
				'scrollReveal': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'staggerFade': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
