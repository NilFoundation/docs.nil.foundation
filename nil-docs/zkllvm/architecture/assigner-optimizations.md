# Customizing Assigner optimizations

This document describes the optimizations that can be applied by the `assigner` component of zkLLVM.

Apart from the basic functionality, there is a lot of things `assigner` can do to improve the performance of the resulting circuit. For example, it can apply different optimizations to the circuit, like:

- Adjust the order of the components
- Adjust the size of the components in the assigment table
- Group together the components with common constraints (makes sense for PLONKish arithmetizations)

Optimizations in the `assigner` might not be very effective for small circuits, but it can give a significant performance boost for the large ones, such as complex zk-Bridges, zk-VMs or zk-EVMs. More about how to implement assigner the optimizations and how to customize its behaviour to your needs can be found [optimizations](./assigner-optimizations) section.
