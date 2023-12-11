"use client"
import { v4 as uuid } from 'uuid';
import Link from 'next/link'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'
import axios from 'axios';
const Result = ({ result, setResult }) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 5)
    const router = useRouter()

    const handleRedirect = () => {
        setTimeout(() => {
            router.push(`result/${small_id}`);
        }, 5000)
    }

    const handleQrCode = async () => {
        try {
            const data = await axios.post('https://dis2023.com/aiphotobooth/upload.php', {
                img: result
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                </head>
            <body>
                <div id="finalImag" class="d-flex justify-content-center"> 
                    <img src=${result} style="width:95%; border-radius :10px; display:block; margin:auto"/> 
                </div>
            </body>
            </html>    
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };
    
    return (
        <div className='center_main py-5 '>
            <h1 className='text-center'>Here is Your Photograph</h1>
            <Container className=''>
                <Row className='justify-content-center align-items-center'>
                    <Col lg={9} md={12} sm={12} xs={12}>
                        <div className="finalImag">
                            <img src={result} alt="" />
                        </div>
                        <div className="d-flex justify-content-between py-4">
                            <div>
                                <button className='btn btn-warning wt-border start-btn' onClick={() => setResult('')}>Re-generate</button>
                            </div>
                            <div>
                                {/* <button onClick={handleRedirect} className='btn wt-border btn-warning start-btn'>download</button> */}
                                <a href={result} download={`${small_id}`} target="_blank" rel="noopener noreferrer" className='btn wt-border btn-warning start-btn'>Save</a>
                            </div>
                            <div>
                                <button onClick={handleQrCode} className='btn wt-border btn-warning start-btn'>Geberate QR</button>
                            </div>
                            <div className='my-2'>
                                <button onClick={handlePrint} className='btn wt-border btn-warning start-btn' >print</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Link href='/' className="back-home">
                <FaHome />
            </Link>
        </div>
    )
}

export default Result