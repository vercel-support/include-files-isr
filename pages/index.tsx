import { readFileSync } from 'fs';
import { readdir } from 'fs/promises';
import type { NextPage } from 'next';
import path from 'path';
import styles from '../styles/Home.module.css';

function Home({ title, now }: { title: string; now: string }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h2>Page generated at {now}</h2>
    </div>
  );
}

export async function getStaticProps() {
  const basePath = process.cwd();
  const dir = path.join(basePath, './public/assets/');
  const files = await readdir(dir);
  const fileContents = files.map((filePah) =>
    readFileSync(path.join(dir, filePah), { encoding: 'utf8' }),
  );

  const titles = fileContents[0].trim().split('\n');

  const now = new Date().toLocaleTimeString();

  return {
    props: {
      title: titles[0],
      now,
    },
    revalidate: 60,
  };
}

export default Home;
