// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Solana Validator Guidebook",
  tagline: "Run a Solana validator today",
  url: "https://solana-validator-guidbook.vercel.app/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "tigarcia", // Usually your GitHub org/user name.
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
      "@docusaurus/preset-classic",
      {
        gtag: {
          trackingID: "G-03S61JX24N",
          anonymizeIP: true,
        },
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
            href: "https://github.com/tigarcia/solana-validator-guidbook",
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
                href: "https://github.com/tigarcia/solana-validator-guidbook",
              },
              {
                label: "Solana Docs",
                href: "https://docs.solana.com/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
