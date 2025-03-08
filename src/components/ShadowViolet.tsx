import React, { useEffect, useState } from "react";

interface ShadowVioletProps {
  left?: string;
  top?: string;
  right?: string;
  leftSm?: string;
  topSm?: string;
  rightSm?: string;
  leftMd?: string;
  topMd?: string;
  rightMd?: string;
  leftLg?: string;
  topLg?: string;
  rightLg?: string;
}

const ShadowViolet: React.FC<ShadowVioletProps> = (props) => {
  const {
    left,
    top,
    right,
    leftSm,
    topSm,
    rightSm,
    leftMd,
    topMd,
    rightMd,
    leftLg,
    topLg,
    rightLg,
  } = props;

  const [style, setStyle] = useState<React.CSSProperties>({
    position: "absolute",
    left: left,
    top: top,
    right: right,
    width: "300px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, #46F3FF 0%, rgba(40, 13, 97, 1) 10%, rgba(4, 13, 97, 0.6) 45%, rgba(40, 13, 97, 0.3) 70%, rgba(40, 13, 97, 0.1) 100%)",
    filter: "blur(100px)",
    zIndex: 0,
  });

  const updateStyle = () => {
    if (window.innerWidth >= 1024) {
      setStyle((prevStyle) => ({
        ...prevStyle,
        left: leftLg || left,
        top: topLg || top,
        right: rightLg || right,
      }));
    } else if (window.innerWidth >= 768) {
      setStyle((prevStyle) => ({
        ...prevStyle,
        left: leftMd || left,
        top: topMd || top,
        right: rightMd || right,
      }));
    } else if (window.innerWidth >= 640) {
      setStyle((prevStyle) => ({
        ...prevStyle,
        left: leftSm || left,
        top: topSm || top,
        right: rightSm || right,
      }));
    } else {
      setStyle((prevStyle) => ({
        ...prevStyle,
        left: left,
        top: top,
        right: right,
      }));
    }
  };

  useEffect(() => {
    updateStyle();
    window.addEventListener("resize", updateStyle);
    return () => window.removeEventListener("resize", updateStyle);
  }, [left, top, right, leftSm, topSm, rightSm, leftMd, topMd, rightMd, leftLg, topLg, rightLg]);

  return <div style={style}></div>;
};

export default ShadowViolet;
