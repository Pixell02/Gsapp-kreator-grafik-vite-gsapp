import { useState } from 'react';

// Styling
import * as Icon from 'react-bootstrap-icons';
import '../../../components/main-content-elements/Block.css';
import Options from '../../../components/main-content-elements/Options';

export default function SponsorBlock({ sponsors }) {
  const [showHide, setShowHide] = useState(false);

  return (
    <div className="catalog-container">
      {sponsors.map(sponsor => (
        <div className="item-window">
          <div className="name-content">
            <span
              key={sponsor.id}
              className="name-content">
              {sponsor.firstSponsorName + ' ' + sponsor.secondSponsorName}
            </span>
            <div className="option-container">
              <button
                onClick={() => {
                  if (showHide === true) {
                    setShowHide(false);
                  } else {
                    setShowHide(true);
                  }
                }}>
                <Icon.ThreeDotsVertical style={{ margin: '5px 0 0 0' }} />
              </button>

              <Options showHide={showHide} />
            </div>
          </div>
          <div className="image-content">
            <img
              src={sponsor.logo}
              alt={sponsor.firstSponsorName + ' ' + sponsor.secondSponsorName}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
