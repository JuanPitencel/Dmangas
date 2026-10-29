import React, { useEffect, useState, useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import parse from 'html-react-parser';
import './ChapterViewer.css';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

const ChapterViewer = ({ specificChapter }) => {
    const [error, setError] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [pdfPages, setPdfPages] = useState([]); // New variable to store the PDF pages

    useEffect(() => {
        if (specificChapter && specificChapter.urlDocument) {
            const firstDocument = specificChapter.urlDocument[0];
            if (isBase64Pdf(firstDocument)) {
                setPdfDocument(firstDocument);
            } else if (specificChapter.urlDocument.some(isBase64Image)) {
                setPdfDocument(null);
            } else if (!specificChapter.htmlContent) {
                console.error('No valid base64 PDF or Image found in the document');
            }
        }
    }, [specificChapter]);

    useEffect(() => {
        const renderPDF = async (pdfData) => {
            try {
                const loadingTask = pdfjsLib.getDocument({ data: pdfData });
                const pdf = await loadingTask.promise;
                
                const pages = [];
                for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                    const page = await pdf.getPage(pageNumber);
                    const viewport = page.getViewport({ scale: 1.5 });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };

                    await page.render(renderContext).promise;
                    pages.push(canvas.toDataURL()); // Store the canvas image in an array
                }

                setPdfPages(pages); // Set the pages so they get rendered
                console.log('PDF rendered successfully');
            } catch (error) {
                console.error('Error rendering PDF document:', error);
                setError('Error rendering PDF document');
            }
        };

        if (pdfDocument) {
            const decodedPdfDocument = pdfDocument.replace('data:application/pdf;base64,', '');
            const pdfData = Uint8Array.from(atob(decodedPdfDocument), c => c.charCodeAt(0));
            renderPDF(pdfData);
        }
    }, [pdfDocument]);

    const isBase64Pdf = (base64) => {
        return /^data:application\/pdf;base64,/.test(base64);
    };

    const isBase64Image = (base64) => {
        return /^data:image\/(jpeg|png);base64,/.test(base64);
    };

    const renderContent = () => {
        if (error) {
            return <div>{error}</div>;
        }

        if (specificChapter && specificChapter.htmlContent) {
            return <div className="html-content">{parse(specificChapter.htmlContent)}</div>;
        }

        if (pdfPages.length > 0) {
            // Render all the PDF pages
            return (
                <div className="pdf-pages-container">
                    {pdfPages.map((page, index) => (
                        <img key={index} src={page} alt={`PDF Page ${index + 1}`} />
                    ))}
                </div>
            );
        }

        if (specificChapter && specificChapter.urlDocument && isBase64Image(specificChapter.urlDocument[0])) {
            console.log('URL Documents:', specificChapter.urlDocument);

            return (
                <div className="image-gallery-container">
                    {specificChapter.urlDocument.map((base64String, index) => (
                        <div key={index} className="image-wrapper">
                            <img src={base64String} alt={`Image ${index}`} />
                        </div>
                    ))}
                </div>
            );
        }

        return <div>No valid content available</div>;
    };

    return (
        <div className="chapter-viewer-container">
            <div className="content-wrapper">
                {renderContent()}
            </div>
        </div>
    );
};

export default ChapterViewer;