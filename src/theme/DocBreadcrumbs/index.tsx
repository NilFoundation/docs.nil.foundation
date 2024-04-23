import React, {type ReactNode} from 'react';
import {
  useSidebarBreadcrumbs,
  useHomePageRoute,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import {Breadcrumbs as NilBreadcrumbs, BreadcrumbsItem as NilBreadcrumbsItem} from "@nilfoundation/ui-kit/dist/ui-kit.js";

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

        if (!isLast && !isDisabled) {
          return (
       
              <NilBreadcrumbsItem href={href}>
                {item.label}
              </NilBreadcrumbsItem>

          );

        } else if (!isLast && isDisabled) {
          return (
       
              <NilBreadcrumbsItem href={href} disabled>
                {item.label}
              </NilBreadcrumbsItem>

          );
        } else {
          return (
        
              <NilBreadcrumbsItem href={href} isActive>
                {item.label}
              </NilBreadcrumbsItem>

          );
        }
      })}
    </NilBreadcrumbs>
  );
}
