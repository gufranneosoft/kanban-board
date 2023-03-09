import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function TostPrimary() {
  return (
    <ToastContainer>
      {["Primary"].map((variant, idx) => (
        <Toast
          key={idx}
          className="d-inline-block m-1"
          bg={variant?.toLowerCase()}
          show={true}
          delay={3000}
          autohide
          animation={true}
        >
          <Toast.Body
            className={variant === "Dark" && "text-white"}
          ></Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default TostPrimary;
