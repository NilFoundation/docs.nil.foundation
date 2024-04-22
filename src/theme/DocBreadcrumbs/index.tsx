import React, {type ReactNode} from 'react';
import {
  useSidebarBreadcrumbs,
  useHomePageRoute,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import {Breadcrumbs as NilBreadcrumbs, BreadcrumbsItem as NilBreadcrumbsItem} from "@nilfoundation/ui-kit/dist/ui-kit.js";
import styles from './styles.module.css';

export default function DocBreadcrumbs(): JSX.Element | null {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();

  if (!breadcrumbs) {
    return null;
  }

  return (
    <NilBreadcrumbs
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}>
      {homePageRoute && <HomeBreadcrumbItem />}
      {breadcrumbs.map((item, idx) => {
        const isLast = idx == breadcrumbs.length - 1;
        const href = item.type === 'category' && item.linkUnlisted
        ? undefined
        : item.href;
        const isDisabled = href === undefined;
        const name = isDisabled ? '' : styles.breadcrumbWithLink;
        let isActive: boolean;
        
        if (!isLast && !isDisabled) {
          isActive = true;
        } else if (isLast) {
          isActive = false;
        } else {
          isActive = undefined;
        }
        return (
          <div className={name}>          
            <NilBreadcrumbsItem isActive={isActive} href={href} disabled={isDisabled}>
              {item.label}
            </NilBreadcrumbsItem>
          </div>

        );
      })}
    </NilBreadcrumbs>
  );
}
