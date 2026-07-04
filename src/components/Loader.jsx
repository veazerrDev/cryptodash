import { BeatLoader } from "react-spinners"
const override = {
  display: "flex",
  margin: "0 auto",
  justifyContent: "center", 
  alignItems: "center",   
};

const Loader = ({ color = "#155DFC", size = "15px"}) => {
  return (
    <div>
      <BeatLoader color={color} cssOverride={override} size={size} data-testid="loader"/>
    </div>
  )
}

export default Loader