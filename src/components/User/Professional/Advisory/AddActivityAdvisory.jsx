import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import DashboardProfessional from '../DashboardProfessional'

const AddActivityAdvisory = () => {
  const { id } = useParams()

  return (
    <div className='mt-5'>
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Agregar actividad</h2>
            {
              id
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddActivityAdvisory