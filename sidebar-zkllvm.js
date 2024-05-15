export default {
    zkllvm: [
        {
            type: 'link',
            label: 'GitHub',
            href: 'https://github.com/NilFoundation/zkLLVM',
        },
        {
            type: 'category',
            label: 'Overview',
            collapsible: true,
            collapsed: false,
            items: [

                {
                    type: 'doc',
                    label: 'What is zkLLVM',
                    id: 'overview/what-is-zkllvm'
                },
                {
                    type: 'doc',
                    label: 'Key components and tools',
                    id: 'overview/key-components-tools'
                },
            ]
        },
        {
            type: 'category',
            label: 'Getting started',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    label: 'Installation and configuration',
                    id: 'getting-started/installation'
                },
                {
                    type: 'doc',
                    label: 'Writing a simple circuit',
                    id: 'getting-started/writing-a-simple-circuit'
                },
                {
                    type: 'doc',
                    label: 'Preparing input files',
                    id: 'getting-started/preparing-input-files'
                },
                {
                    type: 'category',
                    label: 'Compiling a circuit',
                    collapsible: true,
                    collapsed: false,
                    link: {
                        type: 'doc',
                        id: 'getting-started/compiling-a-circuit',
                    },
                    items: [
                        {
                            type: 'doc',
                            label: 'Compiling C++ code',
                            id: 'getting-started/compiling-cpp-code'
                        },
                        {
                            type: 'doc',
                            label: 'Compiling Rust code',
                            id: 'getting-started/compiling-rust-code'
                        }
                    ]
                },
                {
                    type: 'doc',
                    label: 'Verifying and proving a circuit',
                    id: 'getting-started/verifying-a-circuit'
                },
                {
                    type: 'doc',
                    label: 'Using built-in types and functions',
                    id: 'getting-started/built-ins'
                }
            ]
        },
        {
            type: 'category',
            label: 'Best practices and limitations',
            collapsible: true,
            collapsed: true,
            items: [
                {

                    type: 'doc',
                    label: 'Refactoring if/else statements',
                    id: 'best-practices-limitations/avoiding-if-else-statements'
                },
                {
                    type: 'doc',
                    label: 'Using statically allocated structures',
                    id: 'best-practices-limitations/using-stat-structures'
                },
                {
                    type: 'doc',
                    label: 'Avoiding dynamic loops',
                    id: 'best-practices-limitations/dynamic-loops'
                },
                {
                    type: 'doc',
                    label: 'Passing arguments by value',
                    id: 'best-practices-limitations/passing-args-by-value'
                },
                {
                    type: 'doc',
                    label: 'Avoiding system interfaces',
                    id: 'best-practices-limitations/system-interfaces'
                },
                {
                    type: 'doc',
                    label: 'Unrolling loops',
                    id: 'best-practices-limitations/unrolling-loops'
                },
            ]
        },
        {
            type: 'category',
            label: 'Use cases',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'Primer',
                    id: 'use-cases/primer'
                },
                {
                    type: 'category',
                    label: 'Construct a zkBridge',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            type: 'doc',
                            label: 'Write a circuit with hashes',
                            id: 'use-cases/zk-bridge/hashes'
                        },
                        {
                            type: 'doc',
                            label: 'Verify EdDSA signatures',
                            id: 'use-cases/zk-bridge/eddsa'
                        },
                        {
                            type: 'doc',
                            label: 'Create a Merkle tree commitment scheme',
                            id: 'use-cases/zk-bridge/merkle-tree'
                        },
                        {
                            type: 'doc',
                            label: 'Write an algorithm for state-proof verification',
                            id: 'use-cases/zk-bridge/zkbridge'
                        },
                    ]
                },

            ]
        },
        {
            type: 'category',
            label: 'Misc',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'Code of conduct',
                    id: 'misc/code-of-conduct'
                },
            ]
        },
    ],
};