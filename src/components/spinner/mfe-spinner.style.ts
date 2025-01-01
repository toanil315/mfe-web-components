import { css } from "lit";

export const MfeSpinnerStyle = css`
  :host {
    cursor: wait;
    display: inline-flex;
    align-items: center;
  }

  .spinner {
    animation: spin 1s linear infinite;
  }

  :host([overlay]) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(39 49 66 / 70%);
    z-index: 10;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;
