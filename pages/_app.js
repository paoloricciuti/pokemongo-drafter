import RoomContextProvider from '../contexts/RoomContext'
import RouterContextProvider from '../contexts/RouterContext'
import SocketContextProvider from '../contexts/SocketContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <title>Pokemon Go Drafter</title>
      <RoomContextProvider>
        <SocketContextProvider>
          <RouterContextProvider>
            <Component {...pageProps} />
          </RouterContextProvider>
        </SocketContextProvider>
      </RoomContextProvider>
    </>
  )
}

export default MyApp
