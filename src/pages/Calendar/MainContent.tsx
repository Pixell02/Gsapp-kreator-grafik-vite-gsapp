import { useState } from "react";
import ReturnButton from "../../components/ReturnButton";
import ItemContainer from "../../components/main-content-elements/ItemContainer";
import translation from "../../components/leftBar.json";
import { useLanguageContext } from "../../context/LanguageContext";
import { translationProps } from "../../types/translationTypes";
import Title from "../../components/main-content-elements/Title";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Range<T> = [T, T];
type ValuePiece = Date | null;
type Value = ValuePiece | Range<ValuePiece>;

const MainContent = () => {
  const { language } = useLanguageContext();
  const [date, setDate] = useState<Value>(new Date());
  const translate: translationProps = translation;
  const onChange = (value: Value) => {
    setDate(value);
  };

  return (
    <div className="main-content">
      <div className="ml-5">
        <ReturnButton />
        <Title title={translate.calendar[language]} />
        <button className="btn">Zaplanuj</button>
        <ItemContainer>
          <Calendar onChange={onChange} value={date} />
        </ItemContainer>
      </div>
    </div>
  );
};

export default MainContent;
