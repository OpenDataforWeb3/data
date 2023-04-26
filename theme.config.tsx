import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router';

const title = 'ODC Data Hub';

const config : DocsThemeConfig = {
  logo: (
    <>
      <img src="/favicon.svg" width={24} height={24} />
      <span style={{ marginLeft: ".4em", fontWeight: 800 }}>{title}</span>
    </>
  ),
  search: {
    placeholder: "Search...",
  },
  project: {
    link: "https://github.com/OpenDataforWeb3/data"
  },
  chat: {
    link: "https://discord.gg/4d6CTuaD",
  },
  docsRepositoryBase: "https://github.com/OpenDataforWeb3/data/tree/main",
  footer: {
    text: "OpenData Community",
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
      <meta property="og:description" content="The Data hub for ODC" />
    </>
  ),
};

export default config
