import { css } from "@emotion/core";
import * as React from "react";
import { usePageBaseTheme } from "../hooks/use_page_base_theme";
import { Callback } from "../manual_typings/generic_types";
import {
  BrandIconComponent,
  BrandIconComponentProps,
} from "../webfont_icon/brand_icon";
import {
  WebfontIconComponentProps,
  WebfontSolidIconComponent,
} from "../webfont_icon/webfont_icon";

export interface ButtonComponentProps {
  label: string;
  isSecondaryButton?: boolean;
  icon?: WebfontIconComponentProps | BrandIconComponentProps;
  onClick: Callback<void>;
}

function isWebfontIcon(
  props: WebfontIconComponentProps | BrandIconComponentProps
): props is WebfontIconComponentProps {
  return (props as WebfontIconComponentProps).webfontIcon !== undefined;
}

export const ButtonComponent: React.FunctionComponent<ButtonComponentProps> = (
  props: ButtonComponentProps
) => {
  const buttonStyle = useButtonComponentStyle();
  const secondaryStyle = useSecondaryButtonComponentStyle();

  const renderIcon = () => {
    if (props.icon) {
      return isWebfontIcon(props.icon) ? (
        <WebfontSolidIconComponent {...props.icon} />
      ) : (
        <BrandIconComponent {...props.icon} />
      );
    }
    return null;
  };

  return (
    <div css={props.isSecondaryButton ? secondaryStyle : buttonStyle} onClick={() => props.onClick?.()}>
      {renderIcon()}
      <span className="label">{props.label}</span>
    </div>
  );
};

const useButtonComponentStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: button;
    cursor: pointer;

    background-color: ${theme.colors.dark};

    padding: 8px;

    .label {
      color: ${theme.grayscale.light};
    }

    .icon {
      color: ${theme.grayscale.light};
    }
  `;
};

const useSecondaryButtonComponentStyle = () => {
  const theme = usePageBaseTheme();
  return css`
    label: button;
    cursor: pointer;

    background-color: ${theme.grayscale.light};

    padding: 8px;

    .label {
      color: ${theme.grayscale.dark};
    }

    .icon {
      color: ${theme.grayscale.dark};
    }
  `;
};
