import PDFDocument from 'pdfkit';

export async function convertImageToPdf(imageBuffer) {
    return new Promise((resolve, reject) => {
        const pdfDoc = new PDFDocument();
        pdfDoc.image(imageBuffer, 0, 0, { width: 600 });
        // pdfDoc.image(imageBuffer, 0, 0, { width: 400 });
        const buffers = [];
        pdfDoc.on('data', buffer => buffers.push(buffer));
        pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
        pdfDoc.end();
    });
}
