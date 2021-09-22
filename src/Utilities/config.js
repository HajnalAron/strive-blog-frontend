const isProduction = process.env.REACT_APP_ISPRODUCTION;
const developmentBackend = process.env.REACT_APP_DEV_BACKEND_URL;
const productionBackend = process.env.REACT_APP_PRODUCTION_BACKEND_URL;

export const backendUrl = isProduction ? productionBackend : developmentBackend;
