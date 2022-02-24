import React from 'react'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Button, Form } from 'react-bootstrap'

export default function LoginForm() {
    return (

        <div className='background-overlay d-flex justify-content-center align-items-center'>
            <Form className='rounded p-4 p-sm-4'>
                <h1 className='font-weight-bold text-center pb-4'>
                    Login 
                </h1>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button type="submit" className='btn-lg btn-dark btn-span'>
                    Login
                </Button>
            </Form>
        </div>


    );
}