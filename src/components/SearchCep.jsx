import styled from "styled-components"
import { IoIosSearch } from "react-icons/io"
import { useState } from 'react'
import api from "../services/api"
import { toast } from 'react-toastify'

const Search = styled.div`
    background-color: #474747;
    padding: 14px 18px;
    border-radius: .6rem;
    display: flex;
    justify-content: center;

`

const Input = styled.input`
    background-color: #474747;
    color: white;
    width: 250px;
    outline: none;
    border: 0;
    font-size: 17px;

    &::placeholder{
        color: white;
        font-size: 15px;
    }
`

const Button = styled.button`
    border: 0;
    background-color: #474747;
    color: white;
    font-size: 25px;
    cursor: pointer;
    transition: transform 0.5s;
    
    &:hover{
        transform: scale(1.2);
    }
`

const Main = styled.div.withConfig({
    shouldForwardProp: (prop) => !['isVisible'].includes(prop),
})`
    background-color: white;
    margin: 20px;
    padding: 2rem 7rem;
    border-radius: .7rem;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    transform: ${(props) => (props.isVisible ? "scale(1)" : "scale(0.5)")};
    opacity: ${(props) => (props.isVisible ? 1 : 0)};
    transition: transform 0.5s ease, opacity 0.5s ease;
`

const Span = styled.span.withConfig({
    shouldForwardProp: (prop) => !['large', 'bold'].includes(prop), 
  })`
    font-size: ${(props) => (props.large ? "2rem" : "22px")};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
  `

const SearchCep = () => {
    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})

    const handleSearch = async () => {
        if (input === '') {
          toast.error("Preencha com algum CEP!", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: 3000,
          });
          return;
        }
        try {
          const res = await api.get(`${input}/json`);
          setCep(res.data);
          setInput("");
          toast.success("CEP encontrado com sucesso!", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: 3000,
          });
        } catch  {
          toast.error("Ops! Erro ao buscar CEP!", {
            position: "top-right",
            theme: "colored",
            hideProgressBar: true,
            pauseOnHover: false,
            autoClose: 3000,
          });
          setInput("");
        }
      };

  return (
    <>
        <Search>
            <Input type="text" placeholder="Digite o CEP" value={input} onChange={(e) => setInput(e.target.value)} required/>
            <Button onClick={handleSearch}> <IoIosSearch /> </Button>
        </Search>


        <Main isVisible={Object.keys(cep).length > 0}>

            <Span large bold>CEP: {cep.cep}</Span>
            <Span>{cep.logradouro}</Span>
            <Span>Complemento: {cep.complemento}</Span>
            <Span>{cep.bairro}</Span>
            <Span>{cep.estado} - {cep.uf}</Span>

      </Main>
        
    </>
  )
}

export default SearchCep