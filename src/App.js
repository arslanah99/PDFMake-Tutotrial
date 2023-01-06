import logo from './logo.svg';
import './App.css';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {useEffect, useState} from 'react'
pdfMake.vfs = pdfFonts.pdfMake.vfs


function App() {
  const docDefinition = {
    content: [
      {text: `This is a header ${Math.random()*100}`, style: 'header'},
      'No styling here, this is a standard paragraph',
      {text: 'Another text', style: 'anotherStyle'},
      {text: 'Multiple styles applied', style: ['header', 'anotherStyle']},
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
    },
  };
  const [url, setUrl] = useState(null)

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url)
    })
    pdfGenerator.download()
  }

  return (
    <div className="App">
      <button onClick={createPdf}>Generate PDF</button>
      {url && (
        <div>
          {url}
        </div>
      )}
    </div>
  );
}

export default App;
