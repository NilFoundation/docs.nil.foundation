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
            label: 'Starting first project',
            collapsible: true,
            collapsed: false,
            items: [
                {
                    type: 'doc',
                    label: 'Installation',
                    id: 'getting-started/installation'
                },
            ]
        },
        {
            type: 'category',
            label: 'Circuit development',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'Full circuit generation pipeline',
                    id: 'circuit-development/circuit-generation',
                },
                {
                    type: 'doc',
                    label: 'Circuit-friendy compiler extensions',
                    id: 'circuit-development/compiler-extensions',
                },
                {
                    type: 'doc',
                    label: 'Limitations',
                    id: 'circuit-development/limitations',
                },
                {
                    type: 'doc',
                    label: 'Input format for circuits',
                    id: 'circuit-development/input',
                },
                {
                    type: 'doc',
                    label: 'Proof generation',
                    id: 'circuit-development/proof-generation',
                },
                {
                    type: 'doc',
                    label: 'Proof verification',
                    id: 'circuit-development/proof-verifier',
                },
                {
                    type: 'doc',
                    label: 'Tools',
                    id: 'circuit-development/tools',
                },
                {
                    type: 'doc',
                    label: 'Effective circuit development',
                    id: 'circuit-development/optimizations',
                },
                {
                    type: 'doc',
                    label: 'Standard library',
                    id: 'circuit-development/standalone-clang',
                },
            ],
        },
        {
            type: 'category',
            label: 'Tutorial',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'First circuit with hashes',
                    id: 'tutorials/hashes'
                },
                {
                    type: 'doc',
                    label: 'EsDSA signature verifications',
                    id: 'tutorials/eddsa'
                },
                {
                    type: 'doc',
                    label: 'Merkle tree commitment schemes',
                    id: 'tutorials/merkle-tree'
                },
                {
                    type: 'doc',
                    label: 'Constructing a zkBridge',
                    id: 'tutorials/zkbridge'
                },
            ]
        },
        {
            type: 'category',
            label: 'Architecture design example',
            collapsible: true,
            collapsed: true,
            items: [
                {
                    type: 'doc',
                    label: 'zkApplication circuit development',
                    id: 'tutorials/hashes'
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
                    label: 'Contributing',
                    id: 'misc/contributing'
                },
                {
                    type: 'doc',
                    label: 'Code of conduct',
                    id: 'misc/code-of-conduct'
                },
                {
                    type: 'doc',
                    label: 'Contact',
                    id: 'misc/contact'
                },
            ]
        },
    ],
};