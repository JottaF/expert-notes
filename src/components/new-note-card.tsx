import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState("");
  const [isRecordin, setIsRecordin] = useState(false);
  const [open, setOpen] = useState(false);

  function handleStartEdit() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value == "") {
      setShouldShowOnBoarding(true);
    }
    setContent(event.target.value);
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    if (content) {
      toast.success("Nota adicionada com sucesso!");
      onNoteCreated(content);
      setContent("");
      setShouldShowOnBoarding(true);
    }
  }

  function handleStartRecord() {
    const isSpeechRecognitionAPIAvaliable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvaliable) {
      alert("Infelizmente seu navegador não suporta a API de gravação!");
      return;
    }

    setIsRecordin(true);
    setShouldShowOnBoarding(false);

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transition = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setContent(transition);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecord() {
    setIsRecordin(false);

    if (speechRecognition) {
      speechRecognition.stop();
    }
  }

  function changeOpen() {
    setShouldShowOnBoarding(true);
    setContent("");
    setOpen(!open);
    setIsRecordin(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={changeOpen}>
      <Dialog.Trigger className="flex flex-col text-left rounded-md bg-slate-500 p-5 space-y-3 outline-none align-top focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-400 hover:scale-[1.02] focus:scale-[1.03] hover:-translate-y-1 focus:-translate-y-1 transition ease-in">
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

        <Dialog.Content className="fixed flex flex-col inset-0 md:inset-auto md:left-1/2 md:top-1/2 overflow-hidden md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 outline-none md:rounded-sm">
          <Dialog.Close className="absolute top-0 right-0 p-1.5">
            <X className="w-5 h-5 text-slate-500 hover:text-slate-100 transition-all ease-in hover:rotate-90 hover:scale-125" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-200">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="leading-6 text-sm text-slate-400">
                  Comece{" "}
                  <button
                    type="button"
                    onClick={handleStartRecord}
                    className="font-medium text-lime-400 hover:underline hover:underline-offset-2"
                  >
                    gravando uma nota
                  </button>{" "}
                  em áudio ou se preferir{" "}
                  <button
                    type="button"
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
                  value={content}
                />
              )}
            </div>

            {isRecordin ? (
              <button
                type="button"
                className="w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-50 focus:bg-lime-500 focus:underline focus:underline-offset-2 transition ease-in disabled:bg-lime-700"
                onClick={handleStopRecord}
              >
                <span className="animate-pulse">🔴 </span>Gravando! (Clique
                novamente para interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 focus:bg-lime-500 focus:underline focus:underline-offset-2 transition ease-in disabled:bg-lime-700"
                disabled={content === ""}
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
