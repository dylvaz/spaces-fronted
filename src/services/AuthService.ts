import { CognitoUser } from '@aws-amplify/auth';
import Amplify, { Auth } from 'aws-amplify';
import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk';

import { User, UserAttribute } from '../model/Model';
import { config } from '../services/config';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    identityPoolId: config.IDENTITY_POOL_ID,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

class AuthService {
  public async login(
    username: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const user = (await Auth.signIn(username, password)) as CognitoUser;
      return {
        cognitoUser: user,
        username: user.getUsername(),
      };
    } catch (err) {
      return undefined;
    }
  }

  public async getUserAttributes(user: User): Promise<UserAttribute[]> {
    const result: UserAttribute[] = [];
    const attributes = await Auth.userAttributes(user.cognitoUser);
    result.push(...attributes);
    return result;
  }

  public refreshCredentials(): Promise<void> {
    return new Promise((resolve, reject) => {
      (AWS.config.credentials as Credentials).refresh((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async getAWSTempCreds(user: CognitoUser) {
    const cognitoIdentityPool = `cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}`;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
        IdentityPoolId: config.IDENTITY_POOL_ID,
        Logins: {
          [cognitoIdentityPool]: user
            .getSignInUserSession()!
            .getIdToken()
            .getJwtToken(),
        },
      },
      {
        region: config.REGION,
      }
    );
    await this.refreshCredentials();
  }
}

export default AuthService;
