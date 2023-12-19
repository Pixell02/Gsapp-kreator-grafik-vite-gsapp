import React, { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import TrainingPlan from '../components/TrainingPlan';
import { RadioProvider } from '../context/radioContext';
import { TeamProvider } from '../context/teamContext';
import useCoords from '../hooks/useCoords';
import MultiElementButtons from './EditPanelComponent/MultiElementButtons';
import SelectWindow from './EditPanelComponent/SelectWindow/SelectWindow';
import SingleElements from './EditPanelComponent/SingleElements';
import { CalendarContextProvider } from '../context/CalendarContext';

export default function EditPanel({ fabricRef, themeOptions, additionalLayer }) {
  const { user } = useAuthContext();

  const { documents: Players } = useCollection('Players', ['uid', '==', user.uid]);
  const { coords } = useCoords();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    id: null,
    open: false,
  });

  return (
    <CalendarContextProvider>
      <RadioProvider>
        <TeamProvider>
          {coords && fabricRef.current && (
            <>
              <div className={isModalOpen.open === true ? 'show' : 'hide'}>
                <SelectWindow
                  coords={coords}
                  fabricRef={fabricRef}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedMatch={setSelectedMatch}
                  selectedMatch={selectedMatch}
                />
              </div>
              <div className={isModalOpen.open === false ? 'show' : 'hide'}>
                <SingleElements
                  coords={coords}
                  fabricRef={fabricRef}
                  themeOptions={themeOptions}
                  additionalLayer={additionalLayer}
                  Players={Players}
                  setIsModalOpen={setIsModalOpen}
                />
                {coords?.dayOne && (
                  <TrainingPlan
                    fabricRef={fabricRef}
                    coords={coords}
                  />
                )}
                {coords?.numberOfMatches && (
                  <MultiElementButtons
                    coords={coords}
                    setSelectedMatch={setSelectedMatch}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
              </div>
            </>
          )}
        </TeamProvider>
      </RadioProvider>
    </CalendarContextProvider>
  );
}
