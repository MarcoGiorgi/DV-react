export const Types = {
  HUNGER_TOGGLE_MARKETS_AND_ECONOMIC: 'HUNGER/TOGGLE_MARKETS_AND_ECO',
  HUNGER_TOGGLE_MARKET_LAYER: 'HUNGER/TOGGLE_MARKETS',
  HUNGER_TOGGLE_REMOTE_SENSING: 'HUNGER/TOGGLE_REMOTE_SENSING',
  HUNGER_TOGGLE_RAINFALL: 'HUNGER/TOGGLE_RAINFALL',
  HUNGER_TOGGLE_VEGETATION_INDEX: 'HUNGER/TOGGLE_VEGETATION_INDEX',
  HUNGER_TOGGLE_POPULATION_DENSITY: 'HUNGER/TOGGLE_POPULATION_DENSITY',
  HUNGER_TOGGLE_ADMIN1: 'HUNGER/TOGGLE_ADMIN1',
  HUNGER_TOGGLE_ADMIN2: 'HUNGER/TOGGLE_ADMIN2',
  HUNGER_TOGGLE_FOOD_SECURITY: 'HUNGER/TOGGLE_FOOD_SECURITY',
  HUNGER_TOGGLE_IPC: 'HUNGER/TOGGLE_IPC',
  HUNGER_TOGGLE_LOGISTICS: 'HUNGER/TOGGLE_LOGISTICS',
  HUNGER_TOGGLE_ROAD: 'HUNGER/TOGGLE_ROAD'
};

export const Actions = {
  toggleMarketEconomic: () => ({
    type: Types.HUNGER_TOGGLE_MARKETS_AND_ECONOMIC
  }),
  toggleMarketLayer: () => ({
    type: Types.HUNGER_TOGGLE_MARKET_LAYER
  }),
  toggleRemoteSensing: () => ({
    type: Types.HUNGER_TOGGLE_REMOTE_SENSING
  }),
  toggleRainfall: () => ({
    type: Types.HUNGER_TOGGLE_RAINFALL
  }),
  toggleVegetationIndex: () => ({
    type: Types.HUNGER_TOGGLE_VEGETATION_INDEX
  }),
  togglePopulationDensity: () => ({
    type: Types.HUNGER_TOGGLE_POPULATION_DENSITY
  }),
  toggleAdmin1: () => ({
    type: Types.HUNGER_TOGGLE_ADMIN1
  }),
  toggleAdmin2: () => ({
    type: Types.HUNGER_TOGGLE_ADMIN2
  }),
  toggleFoodSecurity: () => ({
    type: Types.HUNGER_TOGGLE_FOOD_SECURITY
  }),
  toggleIPC: () => ({
    type: Types.HUNGER_TOGGLE_IPC
  }),
  toggleLogistics: () => ({
    type: Types.HUNGER_TOGGLE_LOGISTICS
  }),
  toggleRoadNetworks: () => ({
    type: Types.HUNGER_TOGGLE_ROAD
  })
};
