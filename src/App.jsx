import SearchCep from './components/SearchCep'
import styled, { createGlobalStyle } from 'styled-components'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  const GlobalStyle = createGlobalStyle`
    body{
      font-family: Helvetica, sans-serif;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      background: linear-gradient(0deg, #c5c5c5 0%, #7c7c7c 100%);
    }
    *, *::before, *::after {
    box-sizing: border-box;
  }
  `

  const EfeitoDigitar = styled.h1`
    font-size: 50px;
    font-family: 'Courier New', Courier, monospace;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid black; 
    width: 15ch; 
    animation: typing 3s steps(14) forwards, blink 0.5s     step-end infinite;

    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 14ch;
      }
    }

    @keyframes blink {
      50% {
        border-right-color: transparent;
      }
  }
  `

 const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
 `

const App = () => {

  return (
    <>
    <GlobalStyle />
    
      <Container>
        <EfeitoDigitar>Consultar CEP</EfeitoDigitar>
      <SearchCep />
    </Container>
    
    <ToastContainer />
    </>
  )
}

export default App
