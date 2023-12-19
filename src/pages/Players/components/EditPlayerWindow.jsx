import { useState, useEffect } from "react";
import "../../YourTeamPanel/components/addTeamWindow.css";
import ReactDOM from "react-dom";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useTeams } from "../hooks/useTeams";
import { useLanguageContext } from "../../../context/LanguageContext";
import translate from "../locales/translate.json";
import PlayerImagePreview from "./PlayerImagePreview";
import useStorage from "../../../hooks/useStorage";

function EditPlayerWindow({ data, onClose, Teams }) {
  const { language } = useLanguageContext();
  const [player, setPlayer] = useState({ ...data });
  const { teamOptions, handleTeamChange, selectedTeam } = useTeams(Teams, player.team);
  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      team: selectedTeam,
    }));
  }, [selectedTeam]);
  const { handleAddImage } = useStorage();
  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      team: selectedTeam,
    }));
  }, [selectedTeam]);
  const handleValueChange = (e) => {
    const { value, className } = e.target;
    setPlayer({ ...player, [className]: value.trim() });
  };

  const handleSubmit = async () => {
    if (player.firstName === "" || player.secondName === "") {
      alert(translate.emptyField[language]);
    } else if (!player.team) {
      alert(translate.noTeam[language]);
    } else {
      const uploadImages = async () => {
        const images = await Promise.all(
          player.img.map(async (item) => {
            console.log(item.src);
            if (item.src === null || item.src === "") return { type: item.type, src: "" };
            else if (typeof item.src === "string") return { type: item.type, src: item.src };
            else if (typeof item.src === "object") {
              const downloadURL = await handleAddImage(
                item.src,
                `${player.uid}/zawodnik/${player.firstName}_${player.secondName}_${item.type}`
              );

              return {
                type: item.type,
                src: downloadURL,
              };
            }
          })
        );
        return images;
      };
      const images = await uploadImages();
      const ref = doc(db, "Players", player.id);
      updateDoc(ref, {
        ...player,
        img: images,
      });
      onClose(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="active-modal m-edit">
      <div className="add-window">
        <label>{translate.firstName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.firstName} className="firstName" />
        <label>{translate.lastName[language]}</label>
        <input type="text" onChange={handleValueChange} value={player.secondName} className="secondName" />
        <label>{translate.birthYear[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.age} className="age" />
        <label>{translate.number[language]}</label>
        <input type="number" onChange={handleValueChange} value={player.number} className="number" />
        <label>{translate.team[language]}</label>
        <select
          name="country"
          className="form-control"
          value={selectedTeam}
          defaultValue={selectedTeam}
          onChange={(e) => handleTeamChange(e.target.value)}
        >
          <option value=""></option>
          {teamOptions?.map((team, i) => (
            <option key={i} value={team.value}>
              {team.label}
            </option>
          ))}
        </select>
        <PlayerImagePreview player={data} setPlayer={setPlayer} />
        <div className="buttons-container">
          <button
            onClick={() => {
              onClose();
            }}
            className="btn primary-btn"
          >
            {translate.cancel[language]}
          </button>
          <button onClick={handleSubmit} className="btn primary-btn">
            {translate.save[language]}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default EditPlayerWindow;
