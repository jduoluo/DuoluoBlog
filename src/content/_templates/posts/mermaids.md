---
title: Mermaid Example
published: 2011-11-02
pinned: false
description: A simple example of a Markdown blog post with Mermaid.
tags: [Markdown, Mermaid]
category: Examples
draft: false
---


# Complete Guide to Markdown with Mermaid Diagrams

This article demonstrates how to create various complex diagrams using Mermaid in Markdown documents, including flowcharts, sequence diagrams, Gantt charts, class diagrams, and state diagrams.


## Flowchart Example

Flowcharts are excellent for representing processes or algorithm steps.

```mermaid
graph TD
    A[Start] --> B{Condition Check}
    B -->|Yes| C[Process Step 1]
    B -->|No| D[Process Step 2]
    C --> E[Subprocess]
    D --> E
    subgraph E [Subprocess Details]
        E1[Substep 1] --> E2[Substep 2]
        E2 --> E3[Substep 3]
    end
    E --> F{Another Decision}
    F -->|Option 1| G[Result 1]
    F -->|Option 2| H[Result 2]
    F -->|Option 3| I[Result 3]
    G --> J[End]
    H --> J
    I --> J
```
