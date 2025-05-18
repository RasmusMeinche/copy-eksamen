'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Kuratoredit from './Kuratoredit';

export default function SimpleDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Kuratoredit />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 rounded-lg shadow-lg z-50 max-w-md w-full"
        >
          <Dialog.Title className="text-lg font-semibold mb-4">Hej!</Dialog.Title>
          <p>Dette er en dialogboks midt på skærmen.</p>
          
          <Dialog.Close asChild>
            <button className="mt-4 px-4 py-2 bg-[#800000] text-white rounded hover:bg-[#a00000] transition">
              Luk
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}