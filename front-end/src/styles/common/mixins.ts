import { css } from 'styled-components';
import { color, fontSize, fontWeight } from '..';

export const displayFlex = css`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

export const flex = (justifyContent = 'center', alignItems = 'center', direction = 'row') => css`
  ${displayFlex};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-direction: ${direction};
`;

export const styledColName = css`
  font-size: ${fontSize.XS};
  font-weight: ${fontWeight.SEMI_BOLD};
  color: ${color.BLACK};
`;

export const flexSpaceBetween = css`
  ${displayFlex};
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;
