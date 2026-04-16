
const App = () => {

  // @ts-ignore
  window.electron.getStaticData();

  return (
    <div className="bg-zinc-900 h-screen flex justify-center items-center font-bold">
      <h1 className="text-white text-3xl">Insane<span className="text-blue-500">.</span></h1>
    </div>
  )
}

export default App