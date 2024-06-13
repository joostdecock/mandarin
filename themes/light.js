const colors = require('tailwindcss/colors')

module.exports = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',

  'base-100': colors.neutral['50'],
  'base-200': colors.neutral['200'],
  'base-300': colors.neutral['500'],
  'base-content': colors.neutral['700'],

  primary: colors.red['600'],
  'primary-focus': colors.red['700'],
  'primary-content': colors.yellow['200'],

  secondary: colors.sky['500'],
  'secondary-focus': colors.sky['600'],
  'secondary-content': colors.yellow['200'],

  accent: colors.green['400'],
  'accent-focus': colors.pink['300'],
  'accent-content': colors.pink['50'],

  neutral: colors.neutral['900'],
  'neutral-focus': colors.neutral['700'],
  'neutral-content': colors.neutral['50'],

  info: colors.indigo['600'],
  '--btn-info-content': colors.neutral[50],
  success: colors.green['600'],
  '--btn-success-content': colors.neutral[50],
  warning: colors.orange['500'],
  '--btn-warning-content': colors.neutral[50],
  error: colors.red['600'],
  '--btn-error-content': colors.neutral[50],

  '--rounded-box': '0.5rem',
  '--rounded-btn': '0.5rem',
  '--rounded-badge': '1.9rem',
  '--animation-btn': '0.25s',
  '--animation-input': '.4s',
  '--padding-card': '2rem',
  '--btn-text-case': 'uppercase',
  '--navbar-padding': '.5rem',
  '--border-btn': '1px',
  '--focus-ring': '2px',
  '--focus-ring-offset': '2px',
}
