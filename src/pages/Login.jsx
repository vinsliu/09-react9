import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // Don't forget to handle errors, both for yourself (dev) and for the client (via a Bootstrap Alert):
    //   - Show an error if credentials are invalid
    //   - Show a generic error for all other cases
    // On success, redirect to the Pro Offers page
    try {
      const response = await fetch(
        "https://offers-api.digistos.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw { status: response.status, message: data.message };
      }
      setSuccess("Connexion réussi, redirection en cours...");
      setTimeout(() => {
        navigate("/offres/professionnelles");
      }, 2000);
    } catch (e) {
      console.log(`Error: ${e.message} (${e.status})`);
      setError(
        "Une erreur est survenue lors de votre connexion, veuillez ressayer."
      );
    }
    console.log("Login submitted:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="text-center">
              {success}
            </Alert>
          )}
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Se connecter</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Se connecter
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
