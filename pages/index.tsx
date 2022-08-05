import type { InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";
import { getData } from "../lib/data";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  return {
    props: {
      utterances: await getData(),
    },
  };
};

const Home: NextPage<Props> = ({ utterances }) => {
  const [cursor, setCursor] = useState(0);

  const utt = utterances[cursor];

  const handleDelta = (delta: number) => {
    return () => {
      setCursor((cursor) =>
        Math.min(Math.max(cursor + delta, 0), utterances.length - 1)
      );
    };
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(Number(e.target.value) - 1);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header />

      <main className="flex-grow overflow-y-scroll">
        <div className="container mx-auto my-3 px-2">
          <div className="flex items-center my-3">
            <button className="btn btn-primary mr-3" onClick={handleDelta(-1)}>
              &laquo;
            </button>
            <input
              type="range"
              min="1"
              max={utterances.length}
              value={cursor}
              onChange={handleRangeChange}
              className="range range-primary"
            />
            <button className="btn btn-primary ml-3" onClick={handleDelta(1)}>
              &raquo;
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="mb-2 badge font-bold">{utt.id}</div>
              <p
                className="text-2xl leading-10"
                dangerouslySetInnerHTML={{ __html: utt.html }}
              />{" "}
              <p className="text-sm text-gray-500">{utt.reading}</p>
            </div>
          </div>

          <div className="my-5">
            <p className="italic text-right text-gray-500 underline">
              <a href="https://github.com/mmorise/ita-corpus">ITAコーパス</a>
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div className="btn-group grid grid-cols-2 gap-1">
          <button
            className="btn btn-primary rounded-none"
            onClick={handleDelta(-1)}
          >
            &laquo; Prev
          </button>
          <button
            className="btn btn-primary rounded-none"
            onClick={handleDelta(1)}
          >
            Next &raquo;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
