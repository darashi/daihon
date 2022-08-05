import { useEffect } from "react";

import type { InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";
import { getData } from "../lib/data";
import { LinkToCorpus } from "../components/LinkToCorpus";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  return {
    props: {
      utterances: await getData(),
    },
  };
};

const LOCAL_STORAGE_KEY = "daihon-cursor";

const Home: NextPage<Props> = ({ utterances }) => {
  const [cursor, setCursor] = useState(0);

  const utt = utterances[cursor];

  useEffect(() => {
    const storedCursor = Number(localStorage.getItem(LOCAL_STORAGE_KEY));
    const nextCursor = Math.min(
      Math.max(storedCursor, 0),
      utterances.length - 1
    );
    setCursor(nextCursor);
  }, [utterances, setCursor]);

  const handleDelta = (delta: number) => {
    return () => {
      setCursor((cursor) => {
        const nextCursor = Math.min(
          Math.max(cursor + delta, 0),
          utterances.length - 1
        );

        localStorage.setItem(LOCAL_STORAGE_KEY, nextCursor.toString());

        return nextCursor;
      });
    };
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextCursor = Number(e.target.value) - 1;

    localStorage.setItem(LOCAL_STORAGE_KEY, nextCursor.toString());

    setCursor(nextCursor);
  };

  const handleMenuSelection = (selected: string) => {
    setCursor(utterances.findIndex((utt) => utt.id.startsWith(selected)));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Header onMenuSelection={handleMenuSelection} />

      <main className="flex-grow overflow-y-auto">
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
              <LinkToCorpus uttId={utt.id} />
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
