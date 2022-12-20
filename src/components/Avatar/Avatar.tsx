import { Avatar as UserAvatar } from '@chakra-ui/react';
import React from 'react';

type AvatarProps = {
  name?: string;
  src?: string;
};

const Avatar = ({ name, src }: AvatarProps) => {
  return <UserAvatar name={name} src={src} bg="teal.400" />;
};

export default Avatar;
