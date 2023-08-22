/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          main: 'rgb(var(--color-primary-main) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        neutral: {
          dark: 'rgb(var(--color-neutral-dark) / <alpha-value>)',
          main: 'rgb(var(--color-neutral-main) / <alpha-value>)',
          mediumMain: 'rgb(var(--color-neutral-mediumMain) / <alpha-value>)',
          medium: 'rgb(var(--color-neutral-medium) / <alpha-value>)',
          light: 'rgb(var(--color-neutral-light) / <alpha-value>)',
        },
        bkg: {
          default: 'rgb(var(--color-bkg-default) / <alpha-value>)',
          alt: 'rgb(var(--color-bkg-alt) / <alpha-value>)',
        },
      }
    }
  },
  plugins: [],
}

