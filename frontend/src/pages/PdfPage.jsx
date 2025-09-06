import { useParams } from "react-router-dom";

function PdfPage() {
  //i fetch the id of the wardrobe i need from the url "/warrobes/:id/pdf"
  // this line only fetches the dinamic part of the url
  const { id } = useParams();

  return <h1>pdf page for wardrobe {id} NOT YET AVAILABLE</h1>;
}

export default PdfPage;
