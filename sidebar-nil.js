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
        },
        {
            type: 'category',
            label: 'Reference',
            collapsed: true,
            collapsible: true,
            items: [
                {
                    type: 'category',
                    label: 'JSON-RPC API',
                    collapsed: true,
                    collapsible: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Accounts',
                            id: 'reference/json-rpc/accounts'
                        },
                        {
                            type: 'doc',
                            label: 'Blocks',
                            id: 'reference/json-rpc/blocks'
                        },
                        {
                            type: 'doc',
                            label: 'Messages',
                            id: 'reference/json-rpc/messages'
                        },
                        {
                            type: 'doc',
                            label: 'Receipts',
                            id: 'reference/json-rpc/receipts'
                        },
                        {
                            type: 'doc',
                            label: 'Transactions',
                            id: 'reference/json-rpc/transactions'
                        }
                    ]
                }
            ]
        }

    ]


}