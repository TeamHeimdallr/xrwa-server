export const IS_LOCAL = process.env.START_ENV === 'local';
export const IS_DEV = process.env.START_ENV === 'dev';
export const IS_STAGING = process.env.START_ENV === 'staging';
export const IS_PROD = process.env.START_ENV === 'prod';

export const IS_MAINNET = process.env.BLOCKCHAIN_ENV === 'mainnet';

export const ACCOUNT_ZERO = 'rrrrrrrrrrrrrrrrrrrrrhoLvTp';
export const ACCOUNT_ONE = 'rrrrrrrrrrrrrrrrrrrrBZbvji';

// 개발계 환경
export const DEV_ENV = IS_LOCAL || IS_DEV;
// 운영계 환경
export const PROD_ENV = IS_PROD || IS_STAGING;

// API ENDPOINT
export const API_URL = IS_PROD
  ? ''
  : IS_STAGING
  ? ''
  : IS_DEV
  ? ''
  : 'http://localhost:8080';

// FE ENDPOINT
export const BASE_URL = IS_PROD
  ? ''
  : IS_STAGING
  ? ''
  : IS_DEV
  ? ''
  : 'http://localhost:3000';

// ASSET ENDPOINT
export const ASSET_URL = '';
