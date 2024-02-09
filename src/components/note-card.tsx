import * as Dialog from "@radix-ui/react-dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  };
  onDeleteNoted: (id: string) => void;
}

export function NoteCard({ note, onDeleteNoted }: NoteCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  function handleDeleteNote() {
    onDeleteNoted(note.id);
    setShowDialog(false);
    toast.success("Nota apagada!");
  }
  return (
    <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 space-y-3 overflow-hidden relative outline-none text-left flex flex-col align-top focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-600 hover:scale-[1.03] focus:scale-[1.03] hover:-translate-y-1 focus:-translate-y-1 transition ease-in ">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, {
            locale: ptBR,
            addSuffix: true,
          })}
        </span>
        <p className="leading-6 text-sm text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed flex flex-col inset-0 md:inset-auto md:left-1/2 md:top-1/2 overflow-hidden md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 outline-none md:rounded-sm">
          <Dialog.Close className="absolute top-0 right-0 p-1.5">
            <X className="w-5 h-5 text-slate-500 hover:text-slate-100 transition-all ease-in hover:rotate-90 hover:scale-125" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="leading-6 text-sm text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            onClick={handleDeleteNote}
          >
            Deseja{" "}
            <span className="text-red-400 group-hover:underline group-hover:underline-offset-2">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
