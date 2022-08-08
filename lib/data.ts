import path from "path";
import { promises as fs } from "fs";

export type Utterance = {
  id: string;
  number: number;
  text: string;
  reading: string;
  html: string;
};

function toRubyHtml(str: string): string {
  return str.replaceAll(
    /([\u4E00-\u9FFF々ヶ0-9]+)\(([ぁ-んー]+)\)/g,
    "<ruby>$1<rp>(</rp><rt>$2</rt><rp>)</rp></ruby>"
  );
}

async function load(filePath: string): Promise<Utterance[]> {
  const fileContents = await fs.readFile(filePath, "utf8");
  const lines = fileContents.split("\n");

  const data: Utterance[] = [];
  for (let line of lines) {
    const m = line.match(/((^[^_]+)_([^:]+)):([^,]+),(.+)$/);
    if (m) {
      data.push({
        number: Number(m[3]),
        id: m[1],
        text: m[4],
        reading: m[5],
        html: toRubyHtml(m[4]),
      });
    }
  }
  return data;
}

export const getData: () => Promise<Utterance[]> = async () => {
  const files = [
    "ita-corpus/emotion_transcript_ruby_utf8.txt",
    "ita-corpus/recitation_transcript_ruby_utf8.txt",
    "rohan4600/Rohan4600_transcript_utf8.txt",
  ];

  let data: Utterance[] = [];
  for (let fn of files) {
    const filePath = path.join(process.cwd(), "data", fn);
    data = data.concat(await load(filePath));
  }

  return data;
};
