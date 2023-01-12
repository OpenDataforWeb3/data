import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router';

const title = 'FDD Data Hub';

const config : DocsThemeConfig = {
  logo: (
    <>
      <img src="FDD_logo_white.svg" width={24} height={24} />
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>{title}</span>
    </>
  ),
  search: {
    placeholder: "Search...",
  },
  project: {
    link: "https://github.com/Fraud-Detection-and-Defense/",
  },
  chat: {
    link: "https://discord.gg/gitcoin",
  },
  docsRepositoryBase: "https://github.com/Fraud-Detection-and-Defense/datahub/tree/main",
  footer: {
    text: "Gitcoin",
  },
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: `%s – ${title}`
      }
    }
    return {
      titleTemplate: `${title}`
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="The Data hub for FDD" />
    </>
  ),
};

export default config
