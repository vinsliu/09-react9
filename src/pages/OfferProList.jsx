import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import OfferList from "../components/OfferList.jsx";

const OfferProList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://offers-api.digistos.com/api/offers/pro",
          {
            headers: {
              Accept: "application/json",
              // Add Authorization token
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw { status: response.status, message: data.message };
        }

        setOffers(data);
      } catch (err) {
        if (err.status === 401) {
          setError("Vous n'êtes pas autorisé à accéder aux offres (401).");
        } else {
          setError("Une erreur est survenue lors du chargement des offres.");
        }
        console.error(err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }
  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );
  }

  return <OfferList offers={offers} />;
};

export default OfferProList;
