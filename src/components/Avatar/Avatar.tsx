import { Avatar as UserAvatar } from '@chakra-ui/react';
import React from 'react';

type AvatarProps = {
  name?: string;
  src?: string;
  size?: string;
};

const Avatar = ({ name, src, size = 'md' }: AvatarProps) => {
  return <UserAvatar name={name} src={src} size={size} bg="teal.400" />;
};

export default Avatar;
