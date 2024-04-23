import React from 'react';
import {Breadcrumbs, BreadcrumbsItem as NilBreadcrumbsItem} from "@nilfoundation/ui-kit/dist/ui-kit.js";

export default function HomeBreadcrumbItem(): JSX.Element {

  return (
    <div className='inactiveContainer'>

      <NilBreadcrumbsItem href='/' isActive>
        Home
      </NilBreadcrumbsItem>
    </div>

  );
}
