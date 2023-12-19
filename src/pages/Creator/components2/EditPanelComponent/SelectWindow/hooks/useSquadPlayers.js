import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../../../hooks/useAuthContext";
import { useCollection } from "../../../../../../hooks/useCollection";
import useTeamLicenseCollection from "../../../../../../hooks/useTeamLicenseCollection";

const useSquadPlayers = () => {
  const { user } = useAuthContext();
  const [Players, setPlayers] = useState(null);
  const { documents: TeamPlayers } = useCollection("Players", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: LicensedPlayers } = useTeamLicenseCollection("Players");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedReserve, setSelectedReserve] = useState([]);

  useEffect(() => {
    if (TeamPlayers?.length > 0) {
      setPlayers([...TeamPlayers]);
    }
    if (LicensedPlayers?.length > 0) {
      setPlayers([...LicensedPlayers]);
    }
  }, [TeamPlayers, LicensedPlayers]);

  const handlePlayerChecked = (player) => {
    const { firstName, secondName, number, age } = player;

    const isSelected = selectedPlayers.some(
      (selectedPlayer) =>
        selectedPlayer.firstName === firstName &&
        selectedPlayer.secondName === secondName &&
        selectedPlayer.number === number
    );

    if (isSelected) {
      setSelectedPlayers((prevSelectedPlayers) =>
        prevSelectedPlayers.filter(
          (selectedPlayer) =>
            selectedPlayer.firstName !== firstName ||
            selectedPlayer.secondName !== secondName ||
            selectedPlayer.number !== number
        )
      );
    } else {
      if (selectedPlayers.length !== 11) {
        setSelectedPlayers((prevSelectedPlayers) => [
          ...prevSelectedPlayers,
          { firstName, secondName, number, age },
        ]);
      } else {
      }
    }
  };
  const handleReserveChecked = (reserve) => {
    const { firstName, secondName, number, age } = reserve;

    const isSelected = selectedReserve.some(
      (selectedReserve) =>
        selectedReserve.firstName === firstName &&
        selectedReserve.secondName === secondName &&
        selectedReserve.number === number
    );

    if (isSelected) {
      setSelectedReserve((prevselectedReserves) =>
        prevselectedReserves.filter(
          (selectedReserve) =>
            selectedReserve.firstName !== firstName ||
            selectedReserve.secondName !== secondName ||
            selectedReserve.number !== number
        )
      );
    } else {
      if (selectedReserve.length !== 9) {
        setSelectedReserve((prevselectedReserves) => [
          ...prevselectedReserves,
          { firstName, secondName, number, age },
        ]);
      } else {
      }
    }
  };

  return {
    Players,
    selectedPlayers,
    handlePlayerChecked,
    handleReserveChecked,
    selectedReserve,
  };
};

export default useSquadPlayers;
