'use client';

import * as Popover from '@radix-ui/react-popover';
import Kuratoredit from './Kuratoredit';

export default function SimplePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button> <Kuratoredit/> </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white text-black p-4 rounded shadow z-50">
          <p>Hello popover</p>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}