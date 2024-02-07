import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function NewNoteCard() {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");

  function handleStartEdit() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value == "") {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    toast.success('Nota adicionada com sucesso!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col text-left rounded-md bg-slate-500 p-5 space-y-3 outline-none align-top focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-400 hover:scale-[1.02] focus:scale-[1.03] transition ease-in">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="leading-6 text-sm text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="fixed flex flex-col left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 outline-none rounded-sm">
          <Dialog.Close className="absolute top-0 right-0 p-1.5">
            <X className="w-5 h-5 text-slate-500 hover:text-slate-100 transition-all ease-in hover:rotate-90 hover:scale-125" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="leading-6 text-sm text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline hover:underline-offset-2">
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    onClick={handleStartEdit}
                    className="font-medium text-lime-400 hover:underline hover:underline-offset-2"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent outline-none resize-none flex-1"
                  onChange={handleContentChange}
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 focus:bg-lime-500 focus:underline focus:underline-offset-2 transition ease-in"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
