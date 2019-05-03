import BaseAPIService from './BaseAPIService';

const AVATARS_API_LOCATION = '/api/avatars';

interface AvatarData {
  id: string;
}

export class AvatarService extends BaseAPIService {
  public uploadAvatar(image: File): Promise<AvatarData> {
    const formData = new FormData();
    formData.append('avatar', image);

    const options = {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    };

    return this.makeRequest<AvatarData>(AVATARS_API_LOCATION, options);
  }
}

export default new AvatarService();
