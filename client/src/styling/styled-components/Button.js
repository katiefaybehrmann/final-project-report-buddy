import styled from "styled-components";
//import '.../index.css'

const COLORS = {
  primary: {
    "--main": "#DEB55B",
    "--accent": "black",
  },
  secondary: {
    "--main": "#EDF2F7",
    "--accent": "#1A202C",
  },
  third:{
    "--main": "rgba(24, 24, 24, 0)",
    "--accent": "#FFF",
    "--opacity": "0.800000011920929;",
  },
};

function StyledButton({ variant = "fill", color = "primary", ...props }) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component style={COLORS[color]} {...props} />;
}

const ButtonBase = styled.button`
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 8px 16px;
  text-decoration: none;
  margin: 6px;
  font-family: Karla Bold;
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main);
  color: var(--accent);

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main);
  border: 2px solid var(--main);

  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default StyledButton;
