import logo from "./assets/Logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";

const note = {
  date: new Date(2024, 1, 2),
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti amet voluptates doloremque sint voluptatum, aut omnis quia porro ullam eveniet architecto in repellendus necessitatibus dicta rerum velit commodi mollitia quos.",
};

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        
        <NewNoteCard />

        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
        <NoteCard note={note} />
      </div>
    </div>
  );
}
