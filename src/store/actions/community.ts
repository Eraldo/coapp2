import {Action} from '@ngrx/store';
import {Duo, PartialDuo} from "../../models/duo";
import {Clan, PartialClan} from "../../models/clan";
import {PartialTribe, Tribe} from "../../models/tribe";

export const LOAD_DUO = '[Community] Load duo';
export const LOAD_DUO_SUCCESS = '[Community] Load duo success';
export const LOAD_DUO_FAIL = '[Community] Load duo fail';

export const LOAD_DUOS = '[Community] Load duos';
export const LOAD_DUOS_SUCCESS = '[Community] Load duos success';
export const LOAD_DUOS_FAIL = '[Community] Load duos fail';

export const ADD_DUO = '[Community] Add duo';
export const ADD_DUO_SUCCESS = '[Community] Add duo success';
export const ADD_DUO_FAIL = '[Community] Add duo fail';

export const UPDATE_DUO = '[Community] Update duo';
export const UPDATE_DUO_SUCCESS = '[Community] Update duo success';
export const UPDATE_DUO_FAIL = '[Community] Update duo fail';

export const DELETE_DUO = '[Community] Delete duo';
export const DELETE_DUO_SUCCESS = '[Community] Delete duo success';
export const DELETE_DUO_FAIL = '[Community] Delete duo fail';

export const JOIN_DUO = '[Community] Join duo';
export const JOIN_DUO_SUCCESS = '[Community] Join duo success';
export const JOIN_DUO_FAIL = '[Community] Join duo fail';

export const QUIT_DUO = '[Community] Quit duo';
export const QUIT_DUO_SUCCESS = '[Community] Quit duo success';
export const QUIT_DUO_FAIL = '[Community] Quit duo fail';


export const LOAD_CLAN = '[Community] Load clan';
export const LOAD_CLAN_SUCCESS = '[Community] Load clan success';
export const LOAD_CLAN_FAIL = '[Community] Load clan fail';

export const LOAD_CLANS = '[Community] Load clans';
export const LOAD_CLANS_SUCCESS = '[Community] Load clans success';
export const LOAD_CLANS_FAIL = '[Community] Load clans fail';

export const ADD_CLAN = '[Community] Add clan';
export const ADD_CLAN_SUCCESS = '[Community] Add clan success';
export const ADD_CLAN_FAIL = '[Community] Add clan fail';

export const UPDATE_CLAN = '[Community] Update clan';
export const UPDATE_CLAN_SUCCESS = '[Community] Update clan success';
export const UPDATE_CLAN_FAIL = '[Community] Update clan fail';

export const DELETE_CLAN = '[Community] Delete clan';
export const DELETE_CLAN_SUCCESS = '[Community] Delete clan success';
export const DELETE_CLAN_FAIL = '[Community] Delete clan fail';

export const JOIN_CLAN = '[Community] Join clan';
export const JOIN_CLAN_SUCCESS = '[Community] Join clan success';
export const JOIN_CLAN_FAIL = '[Community] Join clan fail';

export const QUIT_CLAN = '[Community] Quit clan';
export const QUIT_CLAN_SUCCESS = '[Community] Quit clan success';
export const QUIT_CLAN_FAIL = '[Community] Quit clan fail';


export const LOAD_TRIBE = '[Community] Load tribe';
export const LOAD_TRIBE_SUCCESS = '[Community] Load tribe success';
export const LOAD_TRIBE_FAIL = '[Community] Load tribe fail';

export const LOAD_TRIBES = '[Community] Load tribes';
export const LOAD_TRIBES_SUCCESS = '[Community] Load tribes success';
export const LOAD_TRIBES_FAIL = '[Community] Load tribes fail';

export const ADD_TRIBE = '[Community] Add tribe';
export const ADD_TRIBE_SUCCESS = '[Community] Add tribe success';
export const ADD_TRIBE_FAIL = '[Community] Add tribe fail';

export const UPDATE_TRIBE = '[Community] Update tribe';
export const UPDATE_TRIBE_SUCCESS = '[Community] Update tribe success';
export const UPDATE_TRIBE_FAIL = '[Community] Update tribe fail';

export const DELETE_TRIBE = '[Community] Delete tribe';
export const DELETE_TRIBE_SUCCESS = '[Community] Delete tribe success';
export const DELETE_TRIBE_FAIL = '[Community] Delete tribe fail';

export const JOIN_TRIBE = '[Community] Join tribe';
export const JOIN_TRIBE_SUCCESS = '[Community] Join tribe success';
export const JOIN_TRIBE_FAIL = '[Community] Join tribe fail';

export const QUIT_TRIBE = '[Community] Quit tribe';
export const QUIT_TRIBE_SUCCESS = '[Community] Quit tribe success';
export const QUIT_TRIBE_FAIL = '[Community] Quit tribe fail';


export class LoadDuoAction implements Action {
  readonly type = LOAD_DUO;

  constructor(public payload: string) {
  }
}

export class LoadDuoSuccessAction implements Action {
  readonly type = LOAD_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class LoadDuoFailAction implements Action {
  readonly type = LOAD_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadDuosAction implements Action {
  readonly type = LOAD_DUOS;
}

export class LoadDuosSuccessAction implements Action {
  readonly type = LOAD_DUOS_SUCCESS;

  constructor(public payload: Duo[]) {
  }
}

export class LoadDuosFailAction implements Action {
  readonly type = LOAD_DUOS_FAIL;

  constructor(public payload: string) {
  }
}


export class AddDuoAction implements Action {
  readonly type = ADD_DUO;

  constructor(public payload: PartialDuo) {
  }
}

export class AddDuoSuccessAction implements Action {
  readonly type = ADD_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class AddDuoFailAction implements Action {
  readonly type = ADD_DUO_FAIL;

  constructor(public payload: string) {
  }
}

export interface UpdateDuoActionPayload {
  id: string,
  changes: PartialDuo
}

export class UpdateDuoAction implements Action {
  readonly type = UPDATE_DUO;

  constructor(public payload: UpdateDuoActionPayload) {
  }
}

export class UpdateDuoSuccessAction implements Action {
  readonly type = UPDATE_DUO_SUCCESS;

  constructor(public payload: Duo) {
  }
}

export class UpdateDuoFailAction implements Action {
  readonly type = UPDATE_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteDuoAction implements Action {
  readonly type = DELETE_DUO;

  constructor(public payload: string) {
  }
}

export class DeleteDuoSuccessAction implements Action {
  readonly type = DELETE_DUO_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteDuoFailAction implements Action {
  readonly type = DELETE_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class JoinDuoAction implements Action {
  readonly type = JOIN_DUO;

  constructor(public payload: string) {
  }
}

export class JoinDuoSuccessAction implements Action {
  readonly type = JOIN_DUO_SUCCESS;

  constructor(public payload: {userId: string, duoId: string}) {
  }
}

export class JoinDuoFailAction implements Action {
  readonly type = JOIN_DUO_FAIL;

  constructor(public payload: string) {
  }
}


export class QuitDuoAction implements Action {
  readonly type = QUIT_DUO;
}

export class QuitDuoSuccessAction implements Action {
  readonly type = QUIT_DUO_SUCCESS;

  constructor(public payload: {userId: string, duoId: string}) {
  }
}

export class QuitDuoFailAction implements Action {
  readonly type = QUIT_DUO_FAIL;

  constructor(public payload: string) {
  }
}




export class LoadClanAction implements Action {
  readonly type = LOAD_CLAN;

  constructor(public payload: string) {
  }
}

export class LoadClanSuccessAction implements Action {
  readonly type = LOAD_CLAN_SUCCESS;

  constructor(public payload: Clan) {
  }
}

export class LoadClanFailAction implements Action {
  readonly type = LOAD_CLAN_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadClansAction implements Action {
  readonly type = LOAD_CLANS;
}

export class LoadClansSuccessAction implements Action {
  readonly type = LOAD_CLANS_SUCCESS;

  constructor(public payload: Clan[]) {
  }
}

export class LoadClansFailAction implements Action {
  readonly type = LOAD_CLANS_FAIL;

  constructor(public payload: string) {
  }
}


export class AddClanAction implements Action {
  readonly type = ADD_CLAN;

  constructor(public payload: PartialClan) {
  }
}

export class AddClanSuccessAction implements Action {
  readonly type = ADD_CLAN_SUCCESS;

  constructor(public payload: Clan) {
  }
}

export class AddClanFailAction implements Action {
  readonly type = ADD_CLAN_FAIL;

  constructor(public payload: string) {
  }
}

export interface UpdateClanActionPayload {
  id: string,
  changes: PartialClan
}

export class UpdateClanAction implements Action {
  readonly type = UPDATE_CLAN;

  constructor(public payload: UpdateClanActionPayload) {
  }
}

export class UpdateClanSuccessAction implements Action {
  readonly type = UPDATE_CLAN_SUCCESS;

  constructor(public payload: Clan) {
  }
}

export class UpdateClanFailAction implements Action {
  readonly type = UPDATE_CLAN_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteClanAction implements Action {
  readonly type = DELETE_CLAN;

  constructor(public payload: string) {
  }
}

export class DeleteClanSuccessAction implements Action {
  readonly type = DELETE_CLAN_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteClanFailAction implements Action {
  readonly type = DELETE_CLAN_FAIL;

  constructor(public payload: string) {
  }
}


export class JoinClanAction implements Action {
  readonly type = JOIN_CLAN;

  constructor(public payload: string) {
  }
}

export class JoinClanSuccessAction implements Action {
  readonly type = JOIN_CLAN_SUCCESS;

  constructor(public payload: {userId: string, clanId: string}) {
  }
}

export class JoinClanFailAction implements Action {
  readonly type = JOIN_CLAN_FAIL;

  constructor(public payload: string) {
  }
}


export class QuitClanAction implements Action {
  readonly type = QUIT_CLAN;
}

export class QuitClanSuccessAction implements Action {
  readonly type = QUIT_CLAN_SUCCESS;

  constructor(public payload: {userId: string, clanId: string}) {
  }
}

export class QuitClanFailAction implements Action {
  readonly type = QUIT_CLAN_FAIL;

  constructor(public payload: string) {
  }
}




export class LoadTribeAction implements Action {
  readonly type = LOAD_TRIBE;

  constructor(public payload: string) {
  }
}

export class LoadTribeSuccessAction implements Action {
  readonly type = LOAD_TRIBE_SUCCESS;

  constructor(public payload: Tribe) {
  }
}

export class LoadTribeFailAction implements Action {
  readonly type = LOAD_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}


export class LoadTribesAction implements Action {
  readonly type = LOAD_TRIBES;
}

export class LoadTribesSuccessAction implements Action {
  readonly type = LOAD_TRIBES_SUCCESS;

  constructor(public payload: Tribe[]) {
  }
}

export class LoadTribesFailAction implements Action {
  readonly type = LOAD_TRIBES_FAIL;

  constructor(public payload: string) {
  }
}


export class AddTribeAction implements Action {
  readonly type = ADD_TRIBE;

  constructor(public payload: PartialTribe) {
  }
}

export class AddTribeSuccessAction implements Action {
  readonly type = ADD_TRIBE_SUCCESS;

  constructor(public payload: Tribe) {
  }
}

export class AddTribeFailAction implements Action {
  readonly type = ADD_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}

export interface UpdateTribeActionPayload {
  id: string,
  changes: PartialTribe
}

export class UpdateTribeAction implements Action {
  readonly type = UPDATE_TRIBE;

  constructor(public payload: UpdateTribeActionPayload) {
  }
}

export class UpdateTribeSuccessAction implements Action {
  readonly type = UPDATE_TRIBE_SUCCESS;

  constructor(public payload: Tribe) {
  }
}

export class UpdateTribeFailAction implements Action {
  readonly type = UPDATE_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}


export class DeleteTribeAction implements Action {
  readonly type = DELETE_TRIBE;

  constructor(public payload: string) {
  }
}

export class DeleteTribeSuccessAction implements Action {
  readonly type = DELETE_TRIBE_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeleteTribeFailAction implements Action {
  readonly type = DELETE_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}


export class JoinTribeAction implements Action {
  readonly type = JOIN_TRIBE;

  constructor(public payload: string) {
  }
}

export class JoinTribeSuccessAction implements Action {
  readonly type = JOIN_TRIBE_SUCCESS;

  constructor(public payload: {userId: string, tribeId: string}) {
  }
}

export class JoinTribeFailAction implements Action {
  readonly type = JOIN_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}


export class QuitTribeAction implements Action {
  readonly type = QUIT_TRIBE;
}

export class QuitTribeSuccessAction implements Action {
  readonly type = QUIT_TRIBE_SUCCESS;

  constructor(public payload: {userId: string, tribeId: string}) {
  }
}

export class QuitTribeFailAction implements Action {
  readonly type = QUIT_TRIBE_FAIL;

  constructor(public payload: string) {
  }
}


export type Actions =
  LoadDuoAction |
  LoadDuoSuccessAction |
  LoadDuoFailAction |

  LoadDuosAction |
  LoadDuosSuccessAction |
  LoadDuosFailAction |

  AddDuoAction |
  AddDuoSuccessAction |
  AddDuoFailAction |

  UpdateDuoAction |
  UpdateDuoSuccessAction |
  UpdateDuoFailAction |

  DeleteDuoAction |
  DeleteDuoSuccessAction |
  DeleteDuoFailAction |

  JoinDuoAction |
  JoinDuoSuccessAction |
  JoinDuoFailAction |

  QuitDuoAction |
  QuitDuoSuccessAction |
  QuitDuoFailAction |


  LoadClanAction |
  LoadClanSuccessAction |
  LoadClanFailAction |

  LoadClansAction |
  LoadClansSuccessAction |
  LoadClansFailAction |

  AddClanAction |
  AddClanSuccessAction |
  AddClanFailAction |

  UpdateClanAction |
  UpdateClanSuccessAction |
  UpdateClanFailAction |

  DeleteClanAction |
  DeleteClanSuccessAction |
  DeleteClanFailAction |

  JoinClanAction |
  JoinClanSuccessAction |
  JoinClanFailAction |

  QuitClanAction |
  QuitClanSuccessAction |
  QuitClanFailAction |


  LoadTribeAction |
  LoadTribeSuccessAction |
  LoadTribeFailAction |

  LoadTribesAction |
  LoadTribesSuccessAction |
  LoadTribesFailAction |

  AddTribeAction |
  AddTribeSuccessAction |
  AddTribeFailAction |

  UpdateTribeAction |
  UpdateTribeSuccessAction |
  UpdateTribeFailAction |

  DeleteTribeAction |
  DeleteTribeSuccessAction |
  DeleteTribeFailAction |

  JoinTribeAction |
  JoinTribeSuccessAction |
  JoinTribeFailAction |

  QuitTribeAction |
  QuitTribeSuccessAction |
  QuitTribeFailAction;


