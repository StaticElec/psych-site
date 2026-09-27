"use client";

import { type CSSProperties, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type MoreServicesProps = {
  services: readonly { name: string; description: string }[];
  expandLabel: string;
  collapseLabel: string;
};

export function MoreServices({ services, expandLabel, collapseLabel }: MoreServicesProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const updateHeight = () => setContentHeight(content.scrollHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);
    return () => observer.disconnect();
  }, [services]);

  return (
    <Collapsible className="more-services" open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button className="more-services-trigger" variant="link"><span className="button-label">{open ? collapseLabel : expandLabel}</span></Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className="more-services-content"
        forceMount
        aria-hidden={!open}
        style={{ "--more-services-height": `${contentHeight}px` } as CSSProperties}
      >
        <div className="more-services-content-inner" ref={contentRef}>
          {services.map(({ name, description }) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
