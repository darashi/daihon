interface Props {
  uttId: string;
}

export const LinkToCorpus: React.FC<Props> = ({ uttId }) => {
  if (uttId.startsWith("EMOTION100_") || uttId.startsWith("RECITATION324_")) {
    return <a href="https://github.com/mmorise/ita-corpus">ITAコーパス</a>;
  } else if (uttId.startsWith("ROHAN4600_")) {
    return <a href="https://github.com/mmorise/rohan4600">ROHAN4600</a>;
  }
  return null;
};
