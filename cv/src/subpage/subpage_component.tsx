import { css, jsx } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
/** @jsx jsx */

interface SubPageComponentProps {
  headline: string;
  quote: string;
  quoteAuthor?: string;
}

export const SubPageComponent: React.FunctionComponent<React.PropsWithChildren<
  SubPageComponentProps
>> = (props: React.PropsWithChildren<SubPageComponentProps>) => {
  const subPageStyle = useSubPageStyle();
  return (
    <div css={subPageStyle}>
      <div className="spacer" />
      <div className="content">
        <div className="header">
          <h1>{props.headline}</h1>
          <p className="quote">{props.quote}</p>
          {props.quoteAuthor && (
            <p className="quote-author">{props.quoteAuthor}</p>
          )}
        </div>
        <div className="body">{props.children}</div>
      </div>
      <div className="spacer" />
    </div>
  );
};

const useSubPageStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: subpage-style;

    display: flex;

    height: 80vh;
    width: 100vw;

    .spacer {
      flex: 12 0 0;
    }

    .content {
      flex: 24 0 0;

      .header {
        text-align: center;

        border-bottom: 1px solid ${theme.mainColors?.darker};

        margin-bottom: 24px;

        h1 {
          font-size: xxx-large;
          color: ${theme.mainColors?.darker ?? "blue"};
        }

        p {
          font-size: x-large;
          color: ${theme.mainColors?.darker ?? "blue"};

          &.quote-author {
            text-align: right;
            font-size: large;
          }
        }
      }
    }
  `;
};
