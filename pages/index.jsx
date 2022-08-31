import { useState } from "react";
import GeneralLayout from "../components/GeneralLayout";
import Loader from "../components/Loader";
import SearchForm from "../components/SearchForm";
import SearchHeader from "../components/SearchHeader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const pageTitle = "Boat Used Part Search";

  return (
    <GeneralLayout title={pageTitle}>
      <div className="text-center grid place-items-center bg-hero p-6 w-full relative">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="max-w-5xl flex flex-col items-center justify-center text-white font-bold text-2xl my-12 z-10">
          <h1>
            Boat Used Part Search (BUPS) is a free search service for US
            boaters. BUPS strives to keep boaters on the water & parts out of
            the landfill by matching buyers with sellers of used, re-built, NOS,
            vintage, NLA & clearance boat parts.
          </h1>
        </div>
      </div>
      <SearchHeader />
      <SearchForm setResultData={setResultData} setIsLoading={setIsLoading} />
      {isLoading && <Loader />}
      {resultData && (
        <div
          className={`px-4 lg:px-8 mx-auto max-w-6xl mt-4 lg:mt-8 text-left`}
        >
          <div
            className="flex flex-col space-y-6 divide-y-2 divide-gray-300"
            dangerouslySetInnerHTML={{ __html: resultData }}
          />
        </div>
      )}
    </GeneralLayout>
  );
};

export default Home;
