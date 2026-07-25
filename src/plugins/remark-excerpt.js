/* Use the post's first paragraph as the excerpt */
export function remarkExcerpt() {
    return (tree, { data }) => {
        let excerpt = "";
        for (const node of tree.children) {
            if (node.type !== "paragraph") {
                continue;
            }
            excerpt = paragraphToExcerpt(node);
            break;
        }
        data.astro.frontmatter.excerpt = excerpt;
    };
}

function paragraphToExcerpt(node) {
    if (!node) return "";
    if (node.type === "text" || node.type === "inlineCode") {
        return node.value ?? "";
    }
    if (node.type === "break") {
        return "\n";
    }
    if (!Array.isArray(node.children)) {
        return "";
    }
    return node.children.map(paragraphToExcerpt).join("");
}
