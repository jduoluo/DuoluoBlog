import { visit } from "unist-util-visit";

export function remarkHardBreaks() {
    return (tree) => {
        visit(tree, "paragraph", (node) => {
            node.children = node.children.flatMap((child) => {
                if (child.type !== "text" || !child.value.includes("\n")) {
                    return child;
                }

                const parts = child.value.split("\n");
                return parts.flatMap((part, index) => {
                    const nodes = [];
                    if (part) {
                        nodes.push({
                            ...child,
                            value: part,
                        });
                    }
                    if (index < parts.length - 1) {
                        nodes.push({ type: "break" });
                    }
                    return nodes;
                });
            });
        });
    };
}
