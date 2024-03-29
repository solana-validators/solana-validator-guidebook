// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Solana Validator Guidebook",
  tagline: "Run a Solana validator today",
  url: "https://www.solana-validator-guidebook.com/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "solana-validators", // Usually your GitHub org/user name.
  projectName: "solana-validator-guidebook", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/tigarcia/solana-validator-guidbook",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-YLB87LRB58",
        anonymizeIP: true,
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Solana Validator Guidebook",
        items: [
          {
            type: "doc",
            docId: "solana-introduction/what-is-a-validator",
            position: "left",
            label: "Get Started",
          },
          {
            href: "https://github.com/solana-validators/solana-validator-guidebook",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Solana Validator Guidebook",
                to: "/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.com/invite/solana",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/solanafndn",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/solana-validators/solana-validator-guidebook",
              },
              {
                label: "Solana Docs",
                href: "https://docs.solana.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Solana Foundation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
