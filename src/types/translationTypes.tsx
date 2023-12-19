type props = {
  [key: string]: string;
  pl: string;
  en: string;
  fr: string;
  de: string;
  es: string;
};

export type translationProps = {
  yourCatalog: props;
  catalog: props;
  yourTeamPanel: props;
  players: props;
  opponents: props;
  buyAccess: props;
  Account: props;
  calendar: props;
};
