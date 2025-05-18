'use client';

import * as Popover from '@radix-ui/react-popover';
import Kuratoredit from './Kuratoredit';

export default function SimplePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Kuratoredit/>
      </Popover.Trigger>
      <Popover.Portal>
     <Popover.Content
  side="bottom"
  sideOffset={10}
  className="bg-white text-black p-4 rounded shadow-md border border-black z-[9999]"
>
  <p>Hello popover</p>
  <Popover.Arrow className="fill-white" />
</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}