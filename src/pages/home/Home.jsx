import Filter from "./filter/Filter";
import Body from "./body/body";

function Home() {
  return (
    <div className="flex gap-2">
      <div className="max-[570px]:hidden">
        <Filter />
      </div>
      <Body />
    </div>
  );
}

export default Home;
