import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface IAvatar {
  src: string | StaticImport;
  alt?: string;
  style?: React.CSSProperties;
}

/**
 * @name Avatar
 * @author 이동현
 * @desc 프로필 이미지 컴포넌트
 */
const Avatar = ({ src, alt = "", style, ...props }: IAvatar) => {
  return (
    <div className="avatar">
      {/* <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        style={style}
        {...props}
      /> */}
      <img src={src} alt="profile" width={40} height={40} style={style} {...props}/>
    </div>
  );
};

export default Avatar;
