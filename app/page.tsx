export default async function Home() {
  const fff = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), 2000);
    });
  };
  await fff();

  return <h1 className="m-2 text-4xl font-bold text-cyan-500 underline">With Tailwind CSS</h1>;
}
