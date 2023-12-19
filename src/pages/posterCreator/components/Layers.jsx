import React from "react";
import { layersName } from "../layersName";
import { useAddFabricObject } from "./hooks/useAddFabricObject";

export default function Layers({ fabricRef }) {
  const { handleAddObject } = useAddFabricObject(fabricRef);
  return (
    <div className="layers">
      {layersName.map((layer, i) => (
        <div key={i} className="layer-container">
          <div className="add-name-container">{layer.name}</div>
          <div className="add-layer-btn-container">
            <button onClick={(e) => handleAddObject(e, layer)} className="btn rounded">
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
