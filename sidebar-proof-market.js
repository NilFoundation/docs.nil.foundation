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
                            label: 'Managing requests',
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
                    collapsible: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Running a producer process',
                            id: 'proof-producers/tutorials/running-producer-process'
                        },
                        {
                            type: 'doc',
                            label: 'Registering as a new producer',
                            id: 'proof-producers/tutorials/registering-new-producer'
                        },
                        {
                            type: 'doc',
                            label: 'Managing statements',
                            id: 'proof-producers/tutorials/managing-statements'
                        },
                        {
                            type: 'doc',
                            label: 'Managing proposals',
                            id: 'proof-producers/tutorials/managing-proposals'
                        },
                        {
                            type: 'doc',
                            label: 'Managing incentives',
                            id: 'proof-producers/tutorials/managing-incentives'
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
            type: 'doc',
            label: 'Contact us',
            id: 'misc/contact'
        },

    ],
};