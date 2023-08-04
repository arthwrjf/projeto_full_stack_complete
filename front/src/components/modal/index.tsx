import { ReactNode, useEffect, useRef } from "react"
import styled from "styled-components";

const Container = styled.div`
  top: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background-color: var(--color-gray-900);
    padding: 20px;
    box-shadow: 0  0 25px 0 rgba(0,0,0,.25);
    width: 100vw;
    max-width: 250px;
  }
`

interface ModalProps {
    toggleModal: () => void
    children: ReactNode
    blockClosing?: boolean
}

export const Modal = ({children, toggleModal, blockClosing}: ModalProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(!ref.current){
                return 
            }

            if(!event.target){
                return
            }

            if(!ref.current.contains(event.target as HTMLElement)) {
                toggleModal()
            }
        }
        window.addEventListener("mousedown", handleClick)

        return () => {
            window.removeEventListener("mousedown", handleClick)
        }
    },[toggleModal])

    return (
        <Container>
            <div ref={blockClosing ? null : ref}>
               {children}
            </div>
        </Container>
    )
}