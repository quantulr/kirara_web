import "video.js/dist/video-js.css";
import VideoJs from "@/components/VideoJs.tsx";

const Test = () => {
  return (
    <div className={"h=full w-full p-6"}>
      <VideoJs
        options={{
          autoplay: true,
          controls: true,
          aspectRatio: "16:9",
          muted: true,
          sources: [
            {
              src: "/api/v/s/2023/07/03/44caf0d5db1548078c2cc7b53d1d1b4d.mp4",
              type: "video/mp4",
            },
          ],
        }}
        onReady={(p) => {
          p.currentTime(800);
        }}
      />
    </div>
  );
};

export default Test;
