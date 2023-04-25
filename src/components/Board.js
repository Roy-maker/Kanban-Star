import React, { useEffect, useState } from 'react'
import Workflow from './Workflow.js'
import "./Board.css"

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { BiSearchAlt } from "react-icons/bi";
import { Container } from 'react-bootstrap';

export const Board = ({ api }) => {

    //Variable para obtener los datos del workspace en un hook
    const [dataWorkspace, setDataWorkspace] = useState({ data: [] });

    useEffect(() => {

        //Valores necesarios para la peticion get de workspace
        const values = {
            domain: localStorage.getItem('domain'),
            apikey: localStorage.getItem('apikey'),
            boardid: "19"
        }

        //Funcion para realizar la peticion y almacenarlo en el hook dataBoard
        const getWorkSpace = async () => {

            const response = await fetch(`http://localhost:3001/board/`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(values)
            })
            const data = await response.json()
            setDataWorkspace(data)
        }

        //llamada a la funcion
        getWorkSpace()
    }, [])

    return (
        <>
            <ListGroup>
                <ListGroup.Item className='title'>
                    <h4>Tablero 1</h4>
                    <InputGroup className="mb-6">
                        <Button variant="dark" className="search">
                            <BiSearchAlt size={25} color={'white'} />
                        </Button>
                        <Form.Control
                            className="search"
                            aria-label="Example text with button addon"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </ListGroup.Item>

            </ListGroup>
            <Container fluid>
                {
                    dataWorkspace.data.map(data => (
                        <div className="border border-secondary rounded my-3 p-2 bg-white text-secondary">
                            <h4 className='text-center' key={data.id}>{data.name}</h4>
                            {
                                data.columns.map(columns => (
                                    columns.kids.length > 0 ? (
                                        <div>
                                            <h3 className="text-sm-start bg-success text-light rounded-top m-0 mt-2 ps-3 p-2" >{columns.name}</h3>
                                            {
                                                columns.kids.map(kids => (
                                                    <Workflow title={kids.name} col={kids}></Workflow>
                                                ))
                                            }
                                        </div>
                                        
                                    ) : (<Workflow title={columns.name} col={columns}></Workflow>)
                                ))
                            }
                        </div>

                    ))
                }
            </Container>
        </>
    )
}