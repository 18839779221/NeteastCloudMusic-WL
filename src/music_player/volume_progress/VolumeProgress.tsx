import { useEffect, useRef } from "react";
import "./VolumeProgress.css";

interface Props {
  visible: boolean;
  close: () => void;
  progress: number; // 0-1之间
  onProgressChanged: (progress: number) => void;
}

export function VolumeProgress(props: Props) {
  useEffect(() => {
    // 点击空白区域关闭
    const dismissOnClickOutSide = (event: Event) => {
      const targetNode = event?.target;
      if (targetNode instanceof HTMLElement) {
        const playListModalNode = document.querySelector(
          ".volume-progress-container"
        );
        if (
          targetNode !== playListModalNode &&
          !playListModalNode?.contains(targetNode)
        ) {
          props.close();
          event.preventDefault();
        }
      }
    };

    document.addEventListener("click", dismissOnClickOutSide, true);

    return () => {
      document.removeEventListener("click", dismissOnClickOutSide);
    };
  }, []);

  const updateVolumeProgress = (event: React.MouseEvent) => {
    if (event.target instanceof Element) {
      const progress = 1 - (event.nativeEvent.offsetY / event.target.clientHeight);
      props.onProgressChanged(progress);
    }
  };

  return (
    <div className="volume-progress-container">
      <div
        className="volume-progress-total"
        onClick={updateVolumeProgress}
      ></div>
      <div
        className="volume-progress-current"
        style={{ height: `${props.progress * 100}px` }}
      ></div>
      <span
        className="volume-progress-indicator"
        style={{ bottom: `calc(${props.progress * 100}px - 4px)` }}
      ></span>
    </div>
  );
}
