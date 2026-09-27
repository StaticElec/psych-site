"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type MoreServicesProps = {
  services: readonly { name: string; description: string }[];
  expandLabel: string;
  collapseLabel: string;
};

export function MoreServices({ services, expandLabel, collapseLabel }: MoreServicesProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="more-services" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button className="more-services-trigger" variant="link"><span className="button-label">{open ? collapseLabel : expandLabel}</span></Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className="more-services-content"
        forceMount
        aria-hidden={!open}
      >
        <div className="more-services-animation">
          <div className="more-services-content-inner">
            {services.map(({ name, description }) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
