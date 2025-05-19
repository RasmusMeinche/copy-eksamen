import * as Dialog from '@radix-ui/react-dialog';
import Kuratoredit from '../../Kuratoredit';
import { getLocalData } from '@/lib/local';

export default async function SimpleDialog( ) {
  const data = await getLocalData();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Kuratoredit />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 rounded-lg shadow-lg z-50 max-w-7xl w-full"
        >
          <Dialog.Title className="text-lg font-semibold mb-4 flex justify-center">Rediger Event</Dialog.Title>

          {data.map((item, index) => (
            <p key={index}>{item.title}</p>
          ))}

          <Dialog.Close asChild>
            <button className=" fixed top-[5px] right-[20px] mt-4 px-4 py-2 bg-[#800000] text-white rounded hover:bg-[#a00000] transition">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}