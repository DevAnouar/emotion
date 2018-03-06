const path = require('path')
const packages = require('./docs-yaml')().filter(
  ({ title }) => title === 'Packages'
)[0].items

module.exports = {
  siteMetadata: {
    siteUrl: 'https://emotion.sh',
    title: `emotion`
  },
  plugins: packages
    .map(pkg => path.resolve(`${__dirname}/../${pkg}/README.md`))
    .map(file => ({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: file
      }
    }))
    .concat([
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: `${__dirname}/../../docs`
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/../../emotion.png`
        }
      },
      `gatsby-transformer-remark`,
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      'gatsby-plugin-catch-links',
      'gatsby-plugin-sitemap',
      'gatsby-plugin-netlify'
    ])
}
