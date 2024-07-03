import { css } from 'styled-components';
import { color} from '..';

export const floatingEffectHorizontal = css`
  @keyframes floatingAnimationHorizontal {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(-20px);
    }
  }
  animation: floatingAnimationHorizontal 3s ease infinite;
`;

export const floatingUpToDownEffect = css`
  @keyframes floatingUpToDownAnimation {
    0%,
    100% {
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
    50% {
      -webkit-transform: translateY(-1.25em);
      -ms-transform: translateY(-1.25em);
      transform: translateY(-1.25em);
    }
  }
  animation: floatingUpToDownAnimation 3s ease infinite;
`;

export const floatingLeftToRightEffect = css`
  @keyframes floatingLeftToRightAnimation {
    0%,
    100% {
      -webkit-transform: translateX(-1em);
      -ms-transform: translateX(-1em);
      transform: translateX(-1em);
    }
    50% {
      -webkit-transform: translateX(0.625rem);
      -ms-transform: translateX(0.625rem);
      transform: translateX(0.625rem);
    }
  }
  animation: floatingLeftToRightAnimation 3s ease infinite;
`;

export const typingAnimation = (typingColor = color.PRIMARY_BLACK) => css`
  overflow: hidden; /* Hide overflow to create the typing effect */
  animation:
    typing 4s steps(12),
    blink-caret 0.8s infinite; /* Animation properties */
  white-space: nowrap; /* Prevent line breaks */
  border-right: 0.125em solid ${typingColor}; /* Add a caret effect */
  padding-right: 0.1em;
  color: ${typingColor};

  @keyframes typing {
    from {
      width: 0; /* Start with zero width */
    }
    to {
      width: 100%; /* Expand to full width */
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-right-style: hidden; /* Hide caret */
    }
    40% {
      border-right-style: solid; /* Show caret */
    }
  }
`;

