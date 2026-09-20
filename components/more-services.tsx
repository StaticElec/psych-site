"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type MoreServicesProps = { services: string[][] };

export function MoreServices({ services }: MoreServicesProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible className="more-services" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button className="more-services-trigger" variant="link">{open ? "See Less" : "See More"}</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="more-services-content">
        {services.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}
      </CollapsibleContent>
    </Collapsible>
  );
}
