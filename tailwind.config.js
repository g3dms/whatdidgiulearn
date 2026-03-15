/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,md,html}",
    "./_layouts/**/*.{njk,html}",
    "./_includes/**/*.{njk,html}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}