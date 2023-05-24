import { css } from "styled-components";

export const Tablet = (props) => {
  return css`
    @media only screen and (min-width: 768px) {
      ${props}
    }
  `;
};
export const Desktop = (props) => {
  return css`
    @media only screen and (min-width: 1024px) {
      ${props}
    }
  `;
};
