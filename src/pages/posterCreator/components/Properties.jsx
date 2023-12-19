import { ImageFiltersProvider } from "../Context/ImageFiltersContext";
import ImageFilterProperties from "./components2/ImageFilterProperties";
import ImageProperties from "./components2/ImageProperties";
import PlayerImageProperties from "./components2/PlayerImageProperties";
import PlayerNameProperties from "./components2/PlayerNameProperties";
import TextBoxUniversalProperties from "./components2/TextBoxUniversalProperties";
import TextProperties from "./components2/TextProperties";
import TextUniversalProperties from "./components2/TextUniversalProperties";
import TextboxProperties from "./components2/TextboxProperties";

export default function Properties({ fabricRef }) {
  return (
    <div className="overflow-scroll d-flex h-100">
      <ImageFiltersProvider>
        <ImageProperties fabricRef={fabricRef} />
        <ImageFilterProperties fabricRef={fabricRef} />
        <TextboxProperties fabricRef={fabricRef} />
        <TextBoxUniversalProperties fabricRef={fabricRef} />
        <TextProperties fabricRef={fabricRef} />
        <PlayerNameProperties fabricRef={fabricRef} />
        <TextUniversalProperties fabricRef={fabricRef} />
        <PlayerImageProperties fabricRef={fabricRef} />
      </ImageFiltersProvider>
    </div>
  );
}
