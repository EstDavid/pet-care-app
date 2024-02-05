// components/IPhoneFrame.tsx
import Image from "next/image";
import styles from "./IPhoneFrame.module.css";
import IPhoneFrameSVG from "@/../public/iPhone-12-pro-max.svg";

const IPhoneFrame = ({ children }) => {
  return (
    <div className={styles.iphoneFrameContainer}>
      <div className={styles.frameWrapper}>
        {/* SVG iPhone frame code goes here */}
        <Image
          src={IPhoneFrameSVG}
          alt="iPhone Frame"
          layout="fill"
          objectFit="contain"
        />
        {/* The main content area inside the phone frame */}
        <div className={styles.screenContent}>{children}</div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
