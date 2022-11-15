
    const loaderStyle = {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "var(--bgPrimary)",
      color: "var(--textPrimary)",
      fontSize: "1.5rem",
      fontWeight: "bold",
      letterSpacing: "0.1rem",
      textTransform: "uppercase",
      textAlign: "center",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1000,
    };

export default function Loader() {
        return <div style={loaderStyle}>Loading...</div>;
    } 