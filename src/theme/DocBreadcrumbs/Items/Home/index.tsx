import React from 'react';
import {Breadcrumbs, BreadcrumbsItem as NilBreadcrumbsItem} from "@nilfoundation/ui-kit/dist/ui-kit.js";

export default function HomeBreadcrumbItem(): JSX.Element {

  return (
    <NilBreadcrumbsItem href='/' isActive={true}>
      Home
    </NilBreadcrumbsItem>
  );
}
