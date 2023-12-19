import { useContext, useState } from "react";
import { createContext } from "react";
import useSquadPlayers from "../components2/EditPanelComponent/SelectWindow/hooks/useSquadPlayers";
import { useEffect } from "react";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [selectedTeam, setSelectTeam] = useState(null);
  const [reservePlayers, setReservePlayers] = useState(null);
  const [filteredPlayers, setFilteredPlayers] = useState(null);
  const { Players, selectedPlayers, handlePlayerChecked, handleReserveChecked, selectedReserve } = useSquadPlayers();

  useEffect(() => {
    const filteredPlayers = Players?.filter(
      (player) =>
        !selectedPlayers.some(
          (selectedPlayer) =>
            selectedPlayer.firstName === player.firstName &&
            selectedPlayer.secondName === player.secondName &&
            selectedPlayer.number === player.number
        )
    );
    setReservePlayers(filteredPlayers);
  }, [Players, selectedPlayers]);

  return (
    <TeamContext.Provider
      value={{
        selectedTeam,
        setSelectTeam,
        selectedPlayers,
        reservePlayers,
        filteredPlayers,
        setFilteredPlayers,
        Players,
        handlePlayerChecked,
        handleReserveChecked,
        selectedReserve,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw Error("TeamContext out of");
  }

  return context;
};
