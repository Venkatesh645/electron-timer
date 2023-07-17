import {Container, Row, Col, ProgressBar} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
        <ProgressBar animated now={60} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
