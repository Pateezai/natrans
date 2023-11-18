import React from 'react'
import { Spinner, useDisclosure } from '@chakra-ui/react'

const LoadingModals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (

    <>
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-900/30">
        
            <div className="flex items-center justify-center w-full h-full">

                <Spinner 
                thickness='4px'
                speed='0.65s'
                size='xl'
                emptyColor='gray.400'
                color='blue.500'
                />
            </div>

        </div>
    </>
  )
}

export default LoadingModals