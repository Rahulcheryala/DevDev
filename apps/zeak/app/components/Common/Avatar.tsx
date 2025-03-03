import type { AvatarProps as AvatarBaseProps } from "@zeak/react";
import { Avatar as AvatarBase, cn } from "@zeak/react";
import { forwardRef } from "react";

type AvatarProps = AvatarBaseProps & {
  path?: string | null;
  bucket?: string;
};

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ name, path, bucket = "avatars", ...props }, ref) => {
    // const imagePath = path ? getStoragePath(bucket, path) : undefined;
    const imagePath = path ? path : undefined;

    return (
      <AvatarBase
        src={imagePath || props.src}
        name={name}
        ref={ref}
        {...props}
      />
    );
  },
);
Avatar.displayName = "Avatar";

export default Avatar;
