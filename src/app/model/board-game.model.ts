export interface All {
  player: string;
}

export interface Active {
  player: string;
}

export interface Players {
  total: number;
  all: All[];
  active: Active[];
}

export interface Galahad {
  loyalty: string;
  canVote: string[];
  canVoteOnFlush: string[];
}

export interface Nimue {
  loyalty: string;
  canSee: string;
  canVote: string[];
  canVoteOnFlush: string[];
}

export interface Oberon {
  loyalty: string;
  canVote: string[];
  canVoteOnFlush: string[];
  murderedBy: string;
  specialRole: string;
}

export interface Titanya {
  loyalty: string;
  canVote: string[];
  canVoteOnFlush: string[];
}

export interface Characters {
  Galahad: Galahad;
  Nimue: Nimue;
  Oberon: Oberon;
  Titanya: Titanya;
}

export interface Suggester {
  player: string;
}

export interface Archive {
  playersAcceptedQuest: string[];
  playersNotAcceptedQuest?: any;
  suggester: Suggester;
  suggestedPlayers: string[];
  isSuggestionAccepted: boolean;
  isSuggestionOver: boolean;
  switch: boolean;
  numberOfReversal: number;
  numberOfSuccesses: number;
  numberOfFailures: number;
  numberOfBeasts: number;
  finalResult: number;
  questId: number;
  excaliburPicker: string;
  excaliburChoose: string;
  LadySuggester: string;
  LadyChosenPlayer: string;
  LadySuggesterPublishToTheWorld: string;
}

export interface Secrets {
  character: string;
}

export interface Murder {
  target?: any;
  by: string;
  byCharacter: string;
  StateAfterSuccess: number;
}

export interface Sir {
}

export interface Result {
  ppp?: number;
  numofplayers?: number;
  successes?: number;
  failures?: number;
}


export interface BoardGameModel {
  players: Players;
  current: number;
  active_players_num: number;
  characters: Characters;
  size: number;
  state: number;
  archive: Archive[];
  secrets: Secrets;
  suggester: string;
  murder: Murder;
  sir: Sir;
  optionalVotes: string[];
  suggesterVeto: string;
  suggestedPlayers: string[];
  PlayersVotedForCurrQuest: string[];
  PlayersVotedYesForSuggestion: string[];
  results: { [key: string]: Result };
  excalibur: boolean;
  suggestedExcalibur: string;
}


