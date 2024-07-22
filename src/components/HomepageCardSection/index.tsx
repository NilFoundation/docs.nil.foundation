import React, { ReactNode, PropsWithChildren } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export function HomepageCardSection({
    id,
    title,
    children,
    description,
    className,
    hasSubSections = false,
    HeadingTag = 'h3',
}: {
    id?: string;
    title: string;
    children: ReactNode;
    description?: ReactNode;
    hasSubSections?: boolean;
    HeadingTag?: keyof JSX.IntrinsicElements;
    className?: string;
}) {
    return (
        <div
            className={styles.indexHomepageSection}
        >
            {title && <HeadingTag id={id ?? title}>{title}</HeadingTag>}
            {description && <p className="index-section-description">{description}</p>}
            <div className={styles.indexSectionContent}>{children}</div>
        </div>
    );
}

export function Card({
    id,
    icon,
    title,
    description,
    to,
    tag,
    className,
}: PropsWithChildren<{
    id?: string;
    icon?: JSX.Element;
    title: string;
    description?: string;
    to: string;
    tag?: {
        label: string;
        color: string;
        description: string;
    };
    className?: string;
}>) {
    return (
        <Link to={to} className={styles.indexHomepageCard}>
            {icon && <div className={styles.indexIcon}>{icon}</div>}
            <div className={styles.indexCardContent}>
                <div className={styles.indexCardContentTitle} id={id && title}>
                    {title}
                </div>
                {description && <div className={styles.indexCardContentDescription}>{description}</div>}
            </div>
            {tag && (
                <div className="tag absolute right-0 top-0 h-16 w-16">
                    <span
                        className="absolute right-[-28px] top-[-2px] w-[80px] rotate-45 transform bg-gray-600 py-1 text-center font-semibold text-white"
                        style={{ backgroundColor: tag.color }}
                        title={tag.description}
                    >
                        {tag.label}
                    </span>
                </div>
            )}
        </Link>
    );
}