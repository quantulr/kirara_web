import CreatePost from "@/components/CreatePost.tsx";

const Home = () => {
  return (
    <div className={"grid grid-cols-3 gap-1 md:grid-cols-9"}>
      {[...Array(100).keys()].map((_, index) => (
        <div
          key={index}
          className={
            "flex aspect-square items-center justify-center bg-gray-200 text-2xl"
          }
        >
          {index + 1}
        </div>
      ))}
      <CreatePost />
    </div>
  );
};

export default Home;
