import React from 'react';
import { DEFAULT_SLOTS } from '@/lib/imageSlotsData';

interface SlotImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  slotKey: string;
  resolvedUrls?: Record<string, string>;
}

export const SlotImage: React.FC<SlotImageProps> = ({ slotKey, resolvedUrls, src, ...props }) => {
  const url = (resolvedUrls && resolvedUrls[slotKey]) || src || DEFAULT_SLOTS[slotKey] || '';
  return <img src={url} {...props} />;
};

export default SlotImage;
