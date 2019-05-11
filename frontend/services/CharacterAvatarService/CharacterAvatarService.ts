import defaultAvatar from './resources/images/DefaultAvatar.jpg';
import * as cloudinary from 'cloudinary-core';

const cl = new cloudinary.Cloudinary({ cloud_name: 'ants', secure: true });

export const DEFAULT_AVATAR = defaultAvatar;

interface AvatarTransformOptions {
  width: number;
  height: number;
  gravity: string;
  crop: string;
  quality: string;
}

const defaultOptions = { gravity: 'center', crop: 'fill', quality: 'auto:good' };
const charactersListAvatarOptions = { height: 220, width: 220 }; // TODO optimize
const characterProfileAvatarOptions = { height: 350, width: 350 };

export function getCharacterProfileAvatarUrl(avatarId: string | null | undefined): string {
  return getTransformedAvatarUrl(avatarId, { ...defaultOptions, ...characterProfileAvatarOptions });
}

export function getCharactersListAvatarUrl(avatarId: string | null | undefined): string {
  return getTransformedAvatarUrl(avatarId, { ...defaultOptions, ...charactersListAvatarOptions });
}

function getTransformedAvatarUrl(avatarId: string | null | undefined, options: AvatarTransformOptions): string {
  if (!avatarId) {
    return defaultAvatar;
  }

  return cl.url(avatarId, options);
}
