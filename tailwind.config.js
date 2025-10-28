/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-bullets': '#121212',
            maxWidth: "100%",
            color: '#121212',
            lineHeight: '1.5',
            pre: {
              whiteSpace: "pre-wrap",
              marginTop: "0.5rem",
              marginBottom: "1.25rem",
              fontSize: "15px",
            },

          }
        },
        dark: {
          css: {
            '--tw-prose-invert-bullets': 'var(--color-custom-brown-text)',
            color: 'var(--color-custom-brown-text)',
            // 'h1, h2, h3, h4, h5, h6': {
            //   color: 'var(--color-custom-brown-text)',
            // },
            h1: {
              color: 'var(--color-custom-brown-text)',
            },
            h2: {
              color: 'var(--color-custom-brown-text)',
            },
          }
        },
        invert: {
          css: {
            '--tw-prose-invert-bullets': 'var(--color-custom-brown-text)',
            '--tw-prose-links': 'var(--color-custom-brown-text)',
            '--tw-prose-bold': 'var(--color-custom-brown-text)',
            color: 'var(--color-custom-brown-text)',
            // 'h1, h2, h3, h4, h5, h6': {
            //   color: 'var(--color-custom-brown-text)',
            // },
            h1: {
              color: 'var(--color-custom-brown-text)',
            },
            h2: {
              color: 'var(--color-custom-brown-text)',
            },
          }
        }
      }
    }
  }
}