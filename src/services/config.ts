export const spacesApi =
  'https://d7i4lplnxi.execute-api.us-west-1.amazonaws.com/prod/';

export const config = {
  REGION: 'us-west-1',
  USER_POOL_ID: 'us-west-1_ZGKww06ux',
  APP_CLIENT_ID: '17arebcp7ndrpv5bteptn0rapo',
  IDENTITY_POOL_ID: 'us-west-1:722f226d-7c31-4649-b527-6cbad1997fca',
  SPACES_PHOTOS_BUCKET: 'spaces-photos-06416ce334f1',
  api: {
    baseUrl: spacesApi,
    spacesUrl: `${spacesApi}spaces`,
  },
};
