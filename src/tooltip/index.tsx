import * as React from "react";
import styled from "styled-components";
import { COLORS } from "../colors";

const Icon = styled.div<{ jumbo?: boolean }>`
  margin: ${props => {
    if (props.jumbo) return "0px 0px 0px 30px";
    return "0px 0px 0px 15px";
  }};
`;

const Container = styled.div<{ jumbo?: boolean }>`
  width: max-content;
  position: relative;
  max-width: ${props => {
    if (props.jumbo) return "300px";
    return "150px";
  }};
`;

const Inner = styled.button<{
  outline?: boolean,
  jumbo?: boolean,
  theme: string,
  disabled?: boolean,
}>`
  box-sizing: border-box;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-size: cover;
  position: relative;
  transition: background-color 0.15s, color 0.15s, border 0.15s;
  cursor: pointer;
  height: ${props  => {
    if (props.jumbo) return "80px";
    return "40px";
  }};
  border-radius: ${props => {
    if (props.jumbo) return "10px";
    return "6px";
  }};
  border-width: 2px;
  border-style: solid;
  background-color: ${props => COLORS[props.theme].BASE.BACKGROUND_COLOR};
  color: ${props => COLORS[props.theme].BASE.COLOR};
  border-color: ${props => COLORS[props.theme].BASE.BORDER_COLOR};

  &:hover {
    background-color: ${props => COLORS[props.theme].HOVER.BACKGROUND_COLOR};
    color: ${props => COLORS[props.theme].HOVER.COLOR};
    border-color: ${props => COLORS[props.theme].HOVER.BORDER_COLOR};
  }

  &.active {
    background-color: ${props => COLORS[props.theme].ACTIVE.BACKGROUND_COLOR} !important;
    color: ${props => COLORS[props.theme].ACTIVE.COLOR} !important;
    border-color: ${props => COLORS[props.theme].ACTIVE.BORDER_COLOR} !important;
  }
`;

const Text = styled.span<{
  icon?: any,
  theme: string,
  jumbo?: boolean,
}>`
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont,
  "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans",
  "Droid Sans", "Helvetica Neue", sans-serif;
  padding: ${props => {
    if (!props.jumbo && props.icon) return "0px 15px 0px 7px";
    if (props.jumbo && props.icon) return "0px 30px 0px 15px";
    if (props.jumbo && !props.icon) return "0px 30px 0px 30px";
    return "0px 15px 0px 15px";
  }};
  font-weight: ${props => {
    if (props.jumbo) return "500";
    return "500";
  }};
  font-size: ${props => {
    if (props.jumbo) return "24px";
    return "12px";
  }};
`;

interface ITooltipProps {
  /**
   * Type of button for form
   *
   * @default null
   */
  disabled?: boolean;

  /**
   * Icon to display next to text,
   *
   * @default null
   */
  icon?: any;

  /**
   * Value to display, either empty (" ") or string value
   *
   * @default " "
   */
  text: string;

  /**
   * Colour theme for button
   *
   * @default " " (blue)
   */
  theme?: string;

  /**
   * Possible values are true/false
   *
   * @default false
   */
  outline?: boolean;

  /**
   * Possible values are true/false
   *
   * @default false
   */
  jumbo?: boolean;

  /** Called when an empty cell is clicked. */
  onClick?: any;
}

/**
 * Button component.
 */
export const Tooltip: React.FunctionComponent<ITooltipProps> = (props: ITooltipProps) => {
  const [down, setDown] = React.useState(false);
  const theme: string = props.theme ? props.theme : "default";
  const disabled: boolean = props.disabled || false;

  return (
    <Container
      jumbo={props.jumbo}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}>
      <Inner
        disabled={disabled}
        outline={props.outline}
        jumbo={props.jumbo}
        theme={theme}
        className={down ? "active" : ""}>
        {props.icon && (
          <Icon jumbo={props.jumbo}>
            {props.icon}
          </Icon>
        )}
        <Text
          icon={props.icon}
          theme={theme}
          jumbo={props.jumbo}
          onClick={props.onClick}>
          {props.text}
        </Text>
      </Inner>
    </Container>
  );
};