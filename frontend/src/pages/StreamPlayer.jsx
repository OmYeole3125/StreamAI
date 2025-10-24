import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function StreamPlayer({ streamKey = "test" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const hlsUrl = `/hls/${streamKey}.m3u8`;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", () => video.play());
    }
  }, [streamKey]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">StreamAI - Player</h2>
      <video
        ref={videoRef}
        controls
        autoPlay
        playsInline
        style={{ maxWidth: "100%", width: "720px", height: "auto" }}
      />
    </div>
  );
}
