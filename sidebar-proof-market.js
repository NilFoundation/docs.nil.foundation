export default {
    proofmarket: [
        {
            type: 'doc',
            label: '=nil; Proof Market',
            id: 'intro'
        },
        {
            type: 'doc',
            label: 'Glossary',
            id: 'glossary'
        },
        {
            type: 'category',
            label: 'Application developers',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    label: 'Introduction',
                    id: 'application-developers/intro'
                },
                {
                    type: 'category',
                    label: 'Tutorials',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Writing a new circuit',
                            id: 'application-developers/tutorials/writing-new-circuit'
                        },
                        {
                            type: 'doc',
                            label: 'Verifying a proof',
                            id: 'application-developers/tutorials/verifying-a-circuit'
                        },
                        {
                            type: 'doc',
                            label: 'Signing up',
                            id: 'application-developers/tutorials/signing-up'
                        },
                        {
                            type: 'doc',
                            label: 'Managing statements',
                            id: 'application-developers/tutorials/managing-statements'
                        },
                        {
                            type: 'doc',
                            label: 'Managing request',
                            id: 'application-developers/tutorials/managing-requests'
                        },
                        {
                            type: 'doc',
                            label: 'Managing payments',
                            id: 'application-developers/tutorials/managing-payments'
                        }
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: 'Proof producers',
            collapsed: false,
            collapsible: true,
            items: [
                {
                    type: 'doc',
                    label: 'Introduction',
                    id: 'proof-producers/intro'
                },
                {
                    type: 'category',
                    label: 'Tutorials',
                    collapsed: true,
                    collapsible: false,
                    items: [
                        {
                            type: 'doc',
                            label: 'Running a producer process',
                            id: 'proof-producers/tutorials/running-producer-process'
                        }
                    ]
                }
            ]
        },
        {
            type: 'doc',
            label: 'API reference',
            id: 'api-reference'
        },
        {
            type: 'category',
            label: 'Proof Market overview',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    label: 'Market economics',
                    id: 'market/economics'
                },
                {
                    type: 'doc',
                    label: 'Market mechanics',
                    id: 'market/mechanics'
                },
                {
                    type: 'doc',
                    label: 'Web interface',
                    id: 'market/web-interface'
                },
            ]
        },
        {
            type: 'category',
            label: 'Proof producers',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    label: 'Getting started',
                    id: 'toolchain/sign-up',
                },
                {
                    type: 'doc',
                    label: 'Toolchain installation',
                    id: 'toolchain/installation',
                },
                {
                    type: 'doc',
                    label: 'Proof producers guide',
                    id: 'producers/proof-producer',
                },
            ],
        },
        {
            type: 'category',
            label: 'Application examples',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'Interacting with Proof Market toolchain',
                    id: 'examples/toolchain'
                },
                {
                    type: 'category',
                    label: 'Mina zk app + Proof Market',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Introduction',
                            id: 'examples/mina-example/intro'
                        },
                        {
                            type: 'doc',
                            label: 'Setup',
                            id: 'examples/mina-example/part-1-setup'
                        },
                        {
                            type: 'doc',
                            label: 'Deploying a zk app',
                            id: 'examples/mina-example/part-2-deploy-zkapp'
                        },
                        {
                            type: 'doc',
                            label: 'Requesting a proof',
                            id: 'examples/mina-example/part-3-proof-request'
                        },
                        {
                            type: 'doc',
                            label: 'Proof validation',
                            id: 'examples/mina-example/part-4-validate-proof'
                        },
                    ],
                }
            ]
        },
        {
            type: 'category',
            label: 'Toolchain reference',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'Toolchain installation',
                    id: 'toolchain/installation'
                },
                {
                    type: 'category',
                    label: 'CLI reference',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Account utilities',
                            id: 'toolchain/cli-reference/user'
                        },
                        {
                            type: 'doc',
                            label: 'Statement utilities',
                            id: 'toolchain/cli-reference/statement'
                        },
                        {
                            type: 'doc',
                            label: 'Proposal utilities',
                            id: 'toolchain/cli-reference/proposal'
                        },
                        {
                            type: 'doc',
                            label: 'Request utilities',
                            id: 'toolchain/cli-reference/request'
                        },
                        {
                            type: 'doc',
                            label: 'Proof utilities',
                            id: 'toolchain/cli-reference/proof'
                        },
                    ],
                }
            ]
        },
        {
            type: 'doc',
            label: 'Contact us',
            id: 'misc/contact'
        },

    ],
};