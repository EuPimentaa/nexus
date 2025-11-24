/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom colors inspired by the dark/neon theme of Ordem Paranormal
                background: '#09090b', // Zinc 950
                surface: '#18181b',    // Zinc 900
                primary: '#7c3aed',    // Violet 600 (Occultist-ish)
                secondary: '#dc2626',  // Red 600 (Combatant-ish)
                accent: '#f59e0b',     // Amber 500 (Specialist-ish)
                text: '#f4f4f5',       // Zinc 100
                muted: '#71717a',      // Zinc 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
