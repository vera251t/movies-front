import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ButtonsEditDelete from '../ButtonsEditDelete';
import { deleteDirectorThunk } from '../../store/slices/directors.slice'
import formatDate from '../../utils/formatDate';

const DirectorCard = ({ director, selectDirector, showOptions=true }) => {

    const { id, image, firstName, lastName, nationality } = director;

    const birthday = formatDate(director.birthday)

    const dispatch = useDispatch();

    return (
        <Col>
            <Card style={{ height: "100%", border: "2px", borderRadius: "7px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)" }}>
                <Card.Img variant="top" src={image} style={{ height: 300, objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{firstName} {lastName}</Card.Title>
                    <div className="flex-fill">
                        <div><b>Birthday:</b> {birthday}</div>
                        <div><b>Nationality:</b> {nationality}</div>
                    </div>
                    {showOptions && (
                        <ButtonsEditDelete 
                            onDelete={() => dispatch(deleteDirectorThunk(id))}
                            onUpdate={() => selectDirector(director)}
                        />
                    )}
                </Card.Body>
            </Card>
        </Col>
      
    );
};

export default DirectorCard;