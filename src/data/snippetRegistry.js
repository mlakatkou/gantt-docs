const snippetsContext = require.context('../../docs/snippets-registry', false, /\.json$/);

const registry = snippetsContext.keys().reduce((acc, path) => {
    const item = snippetsContext(path);
    acc[item.key] = item;
    return acc;
}, {});

export function getSnippetExample(key) {
    return registry[key];
}

export default registry;
