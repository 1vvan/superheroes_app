import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./AddForm.scss";

const AddForm = () => {
  const [heroImage, setHeroImage] = useState("");
  const [superheroes, setSuperheroes] = useState([]);
  const [superhero, setSuperhero] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: ["", "", "", ""],
    catch_phrase: "",
  });
  
  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setHeroImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [name]: value,
    }));
  };

  const handleSuperpowersChange = (index, value) => {
    setSuperhero((prevSuperhero) => {
      const superpowers = [...prevSuperhero.superpowers];
      superpowers[index] = value;
      return {
        ...prevSuperhero,
        superpowers,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSuperhero = {
      ...superhero,
      images: superhero.images ? [heroImage, ...superhero.images] : [heroImage],
    };


    try {
      const response = await fetch("http://localhost:3001/api/superheroes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSuperhero),
      });

      if (response.ok) {
        // Супергерой успешно добавлен
        alert("Superhero added successfully");
        setSuperhero({
          nickname: "",
          real_name: "",
          origin_description: "",
          superpowers: ["", "", "", ""],
          catch_phrase: "",
          images: [],
        });
        window.location.reload();
      } else {
        alert("Failed to add superhero");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };


  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/superheroes/"
      );
      setSuperheroes(response.data);
    } catch (error) {
      alert("Superhero loading error");
      console.error("Error fetching superheroes:", error);
    }
  };

  const deleteSuperhero = async (superheroId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/superheroes/${superheroId}`
      );
      fetchSuperheroes();
    } catch (error) {
      alert("The error of removal of the superhero");
      console.error("Error deleting superhero:", error);
    }
  };

  return (
    <>
      <div className="add-from">
        <div className="add-from__container _container">
          <h2>Add Superhero</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-2" controlId="nickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                value={superhero.nickname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="real_name">
              <Form.Label>Real Name</Form.Label>
              <Form.Control
                type="text"
                name="real_name"
                value={superhero.real_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="origin_description">
              <Form.Label>Origin Description</Form.Label>
              <Form.Control
                as="textarea"
                name="origin_description"
                value={superhero.origin_description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="superpowers">
              <Form.Label>Superpowers</Form.Label>
              {superhero.superpowers.map((superpower, index) => (
                <Form.Control
                  className="mt-1"
                  type="text"
                  key={index}
                  value={superpower}
                  onChange={(e) =>
                    handleSuperpowersChange(index, e.target.value)
                  }
                  required
                />
              ))}
            </Form.Group>
            <Form.Group className="mt-2" controlId="catch_phrase">
              <Form.Label>Catch Phrase</Form.Label>
              <Form.Control
                type="text"
                name="catch_phrase"
                value={superhero.catch_phrase}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={convertToBase64}
              />
            </Form.Group>

            <Button className="mt-2" variant="primary" type="submit">
              Add Superhero
            </Button>
          </Form>
          <ListGroup className="mt-3 mb-3 heroes-list">
            <h2>Superhero List</h2>
            {superheroes.map((superhero) => (
              <ListGroupItem key={superhero._id} className="heroes-list__item">
                <span>{superhero.nickname}</span>
                <Button
                  variant="danger"
                  onClick={() => deleteSuperhero(superhero._id)}
                >
                  Delete
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  );
};

export default AddForm;
