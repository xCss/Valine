module.exports = {
    dest: 'Valine',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Valine',
            description: '一款快速、简洁且高效的无后端评论系统。'
        },
        '/en/': {
            lang: 'en-US',
            title: 'Valine',
            description: 'A fast, simple & powerful comment system.'
        },
    },
    themeConfig: {
        repo: 'xCss/Valine',
        editLinks: true,
        docsDir: 'docs',
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: [{
                        text: '指南',
                        link: '/guide/',
                    },
                    // {
                    //     text: '配置',
                    //     link: '/config/'
                    // },
                    // {
                    //     text: '默认主题',
                    //     link: '/default-theme-config/'
                    // }
                ],
                sidebar: {
                    '/guide/': genSidebarConfig('指南')
                }
            },
            '/en/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: [{
                        text: 'Guide',
                        link: '/en/guide/',
                    },
                    // {
                    //     text: 'Config Reference',
                    //     link: '/en/config/'
                    // },
                    // {
                    //     text: 'Default Theme Config',
                    //     link: '/en/default-theme-config/'
                    // }
                ],
                sidebar: {
                    '/guide/': genSidebarConfig('Guide')
                }
            },
        }
    }
}

function genSidebarConfig(title) {
    return [{
        title,
        collapsable: false,
        children: [
            '',
            'getting-started',
            'basic-config',
            'assets',
            'markdown',
            'using-vue',
            'custom-themes',
            'i18n',
            'deploy'
        ]
    }]
}