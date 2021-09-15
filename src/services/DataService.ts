import { CreatedSpaceModel, Space } from '../model/Model';
import { S3, config } from 'aws-sdk';

import { config as localConfig } from './config';

config.update({
  region: localConfig.REGION,
});

export class DataService {
  public async getSpaces(): Promise<Space[]> {
    const requestUrl = localConfig.api.spacesUrl;
    const response = await fetch(requestUrl, {
      method: 'GET',
    });

    const responseJSON = await response.json();

    return responseJSON;
  }

  public async reserveSpace(spaceId: string): Promise<string | undefined> {
    if (spaceId === '123456') {
      return '69420';
    } else {
      return undefined;
    }
  }

  public async createSpace(newSpace: CreatedSpaceModel) {
    if (newSpace.photo) {
      const photoUrl = await this.uploadPublicFile(
        newSpace.photo,
        localConfig.SPACES_PHOTOS_BUCKET
      );
      newSpace.photoUrl = photoUrl;
      newSpace.photo = undefined;
    }
    const requestUrl = localConfig.api.spacesUrl;
    const requestOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(newSpace),
    };
    const result = await fetch(requestUrl, requestOptions);
    const resultJSON = await result.json();
    return JSON.stringify(resultJSON.id);
  }
  private formatFileName(fileName: string): string {
    const date: number = Date.now();
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = fileName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFileName = `${date}-${randomString}-${cleanFileName}`;
    return newFileName.substring(0, 60);
  }

  private async uploadPublicFile(file: File, bucket: string) {
    let fileName = file.name;
    fileName = this.formatFileName(fileName);
    const uploadResult = await new S3({
      region: localConfig.REGION,
    })
      .upload({
        Bucket: bucket,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
      })
      .promise();
    return uploadResult.Location;
  }
}
