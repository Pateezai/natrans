import React from 'react'
import {
  Button,
  Modal, useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

const BusDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <>
          {/* <Button onClick={onOpen} className='border-2'>Open Modal</Button> */}
          <Card maxW='2xs' onClick={onOpen}>
            <CardBody >
              <img
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
              />
            </CardBody>
          </Card>

          <Modal isOpen={isOpen} onClose={onClose} size={'4xl'} className="border-2">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Bus Detail</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Carousel infiniteLoop>
                <div>
                    <img src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                <img src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />

                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                <img src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />

                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
                
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    </>
  )
}

export default BusDetail