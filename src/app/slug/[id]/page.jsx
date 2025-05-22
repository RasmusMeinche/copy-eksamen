import { getLocalData } from "@/lib/local";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = params;
  const allEvents = await getLocalData();
  const event = allEvents.find((e) => e.id === id);

  if (!event) notFound();

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 z-50 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-4">Rediger Event</Dialog.Title>

          <div className="space-y-2 text-black">
            <p><strong>Titel:</strong> {event.title}</p>
            <p><strong>Kurator:</strong> {event.curator}</p>
            <p><strong>Dato:</strong> {event.date}</p>
            <p><strong>Beskrivelse:</strong> {event.description}</p>
          </div>

          <Dialog.Close asChild>
            <Link
              href="/"
              className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white rounded"
            >
              X
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}