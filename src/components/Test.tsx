import "video.js/dist/video-js.css";
import VideoJs from "@/components/VideoJs.tsx";
import PageScaffold from "@/components/PageScaffold.tsx";

const Test = () => {
  return (
    <PageScaffold>
      <div className={"h=full w-full p-6"}>
        <VideoJs
          options={{
            autoplay: true,
            controls: true,
            aspectRatio: "16:9",
            muted: true,
            sources: [
              {
                src: "/api/v/s/2023/07/03/0dd78ad4e64448218a388544de00616a.mp4",
                type: "video/mp4",
              },
            ],
          }}
          onReady={(p) => {
            p.currentTime(800);
          }}
        />
      </div>
    </PageScaffold>
  );
};

export default Test;
