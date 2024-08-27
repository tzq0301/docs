import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Docs</span>,
  project: {
    link: 'https://github.com/tzq0301/docs',
  },
  // docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  head: (
    <link rel="icon" type="image/x-icon" href="https://tzq0301.github.io/icon/TZQ-icon.ico"></link>
  ),
  footer: {
    text: 'Docs about coding',
  },
}

export default config
