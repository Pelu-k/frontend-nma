import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row, Table } from 'react-bootstrap'
import Loading from '../../../Utils/Loading/Loading'
import DashboardProfessional from '../DashboardProfessional'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { MdModeEditOutline } from 'react-icons/md'

const ActivityAdvisory = () => {
  const [state, setState] = useState(false)

  const changeState = () => {
    setState(false);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  useEffect(() => {
    changeState()
  }, [])

  return (
    <div className='mt-5'>
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col sm={9}>
            <h2 className='text-center mb-5'>Actividades</h2>
            {
              state ? (
                <Loading />
              ) : (
                <div>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Nombre Asesoria 1</Accordion.Header>
                      <Accordion.Body>
                        <div className='d-grid justify-content-md-end'>
                          <Button variant='outline-primary' className='mx-auto mb-2'><AiOutlinePlus/> Agregar</Button>
                        </div>
                        <Table >
                          <tbody>
                            <tr>
                              <td>Nombre 1</td>
                              <td>Tipo 1</td>
                              <td>Cliente</td>
                              <td className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                <Button variant='outline-warning' className='me-1'><MdModeEditOutline/> Editar</Button>
                                <Button variant='outline-danger'><BsTrashFill/> Cancelar</Button>
                              </td>
                            </tr>
                            <tr>
                              <td>Nombre 2</td>
                              <td>Tipo 2</td>
                              <td>Cliente</td>
                              <td className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                  <Button variant='outline-warning' className='me-1'><MdModeEditOutline/> Editar</Button>
                                  <Button variant='outline-danger'><BsTrashFill/> Cancelar</Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Nombre Asesoria 2</Accordion.Header>
                      <Accordion.Body>
                        <div className='d-grid justify-content-md-end'>
                          <Button variant='outline-primary' className='mx-auto mb-2'>Agregar <AiOutlinePlus/></Button>
                        </div>
                        <Table >
                          <tbody>
                            <tr>
                              <td>Nombre 1</td>
                              <td>Tipo</td>
                              <td>Cliente</td>
                              <td className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                <Button variant='outline-warning' className='me-1'><MdModeEditOutline/> Editar</Button>
                                <Button variant='outline-danger'><BsTrashFill/> Cancelar</Button>
                              </td>
                            </tr>
                            <tr>
                              <td>Nombre 2</td>
                              <td>Tipo</td>
                              <td>Cliente</td>
                              <td className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                  <Button variant='outline-warning' className='me-1'><MdModeEditOutline/> Editar</Button>
                                  <Button variant='outline-danger'><BsTrashFill/> Cancelar</Button>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ActivityAdvisory