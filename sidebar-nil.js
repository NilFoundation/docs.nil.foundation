export default {
    nil: [
        {
            type: 'category',
            label: 'Introduction',
            collapsed: false,
            collapsible: true,
            items: [
                {
                    type: 'doc',
                    label: 'Overview',
                    id: 'intro',
                },
                {
                    type: 'doc',
                    label: 'Thesis',
                    id: 'thesis'
                },
                {
                    type: 'doc',
                    label: 'Principles',
                    id: 'principles'
                }
            ]
        },
        {
            type: 'category',
            label: 'Core concepts',
            collapsed: false,
            collapsible: true,
            items: [
                {
                    type: 'doc',
                    label: 'Accounts',
                    id: 'core-concepts/accounts',
                },
                {
                    type: 'doc',
                    label: 'Transaction lifecycle',
                    id: 'core-concepts/transaction-lifecycle',
                },
                {
                    type: 'doc',
                    label: 'Shards and parallelized execution',
                    id: 'core-concepts/shards-parallel-execution',
                },
                {
                    type: 'doc',
                    label: 'Contract co-location',
                    id: 'core-concepts/contract-co-location',
                },
            ]
        },
        {
            type: 'category',
            label: 'Specification',
            collapsed: true,
            collapsible: true,
            items: [
                {
                    type: 'doc',
                    label: 'Finality',
                    id: 'specification/finality',
                },
                {
                    type: 'doc',
                    label: 'Data availability',
                    id: 'specification/data-availability',
                },
                {
                    type: 'doc',
                    label: 'Sequencing',
                    id: 'specification/sequencing',
                },
            ]
        }

    ]
}