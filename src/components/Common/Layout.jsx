import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Head/>
      <div className="flex flex-col min-h-screen pb-14 md:pb-0">
        <Navbar />
        <BottomNavigation />
        {children}
      </div>
    </>
  )
}