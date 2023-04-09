export default async function Page() {
  const waiting = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(true);
      }, 5000);
    });
  };
  await waiting();
  return <h1 className="m-2 text-4xl font-bold text-red-500 text-center">Panel HomePage</h1>;
}
