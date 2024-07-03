import { css } from "styled-components";
import { ENUM_LABEL } from "@/types";
import { color } from "@/styles";

interface LabelProps {
  value: string | number;
}

export const labelRenderCss = css<LabelProps>`
  display: flex;
  align-items: center;
  gap: 0.75em;

  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(props) =>
      props?.value === ENUM_LABEL.NEW
        ? color.PRIMARY_YELLOW
        : props?.value === ENUM_LABEL.QUALIFIED
        ? color.ORANGE_LIGHT
        : props?.value === ENUM_LABEL.SOLVE
        ? color.PRIMARY_GREEN
        : props?.value === ENUM_LABEL.UNQUALIFIED
        ? color.PRIMARY_GRAY
        : color.BLACK};
  }

  .name {
    font-weight: 600;
  }
`;
