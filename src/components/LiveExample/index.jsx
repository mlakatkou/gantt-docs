import React, { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import { getSnippetExample } from '../../data/snippetRegistry';

export default function LiveExample({
    example,
    height = 340,
    title,
    collapsible = false,
    summary = 'Show live example',
    previewSrc,
    previewAlt,
    defaultOpen = false,
    showSnippetLink = false,
    snippetLinkLabel = 'Open in Snippet Tool',
}) {
    const config = getSnippetExample(example);
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isLoaded, setIsLoaded] = useState(false);
    const previewUrl = previewSrc ? useBaseUrl(previewSrc) : null;

    useEffect(() => {
        if (!collapsible || isOpen) {
            setIsLoaded(false);
        }
    }, [collapsible, example, isOpen]);

    if (!config) {
        return (
            <div className={styles.error} role="alert">
                Unknown live example: <code>{example}</code>
            </div>
        );
    }

    const iframeSrc = config.src || `https://dhtmlxcode.com/m/${config.snippetId}`;
    const snippetToolUrl = config.snippetId ? `https://snippet.dhtmlx.com/${config.snippetId}` : null;

    const iframe = (
        <div className={styles.exampleBlock}>
            <div className={styles.wrapper} style={{ height: `${height}px` }}>
                {!isLoaded ? (
                    previewUrl ? (
                        <img
                            className={styles.preview}
                            src={previewUrl}
                            alt={previewAlt || title || config.title || summary}
                        />
                    ) : (
                        <div className={styles.loader} aria-label="Loading live example" />
                    )
                ) : null}
                <iframe
                    className={`${styles.frame} ${!isLoaded ? styles.frameHidden : ''}`}
                    src={iframeSrc}
                    onLoad={() => setIsLoaded(true)}
                    title={title || config.title || `Gantt example ${config.snippetId}`}
                    loading="lazy"
                />
            </div>
            {showSnippetLink && snippetToolUrl ? (
                <div className={styles.actions}>
                    <a
                        className={styles.actionLink}
                        href={snippetToolUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {snippetLinkLabel}
                    </a>
                </div>
            ) : null}
        </div>
    );

    if (!collapsible) {
        return iframe;
    }

    return (
        <details
            className={styles.details}
            open={defaultOpen}
            onToggle={(event) => setIsOpen(event.currentTarget.open)}
        >
            <summary className={styles.summary}>{summary}</summary>
            {isOpen && showSnippetLink && snippetToolUrl ? (
                <a
                    className={styles.summaryAction}
                    href={snippetToolUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    {snippetLinkLabel}
                </a>
            ) : null}
            {isOpen ? iframe : null}
        </details>
    );
}
