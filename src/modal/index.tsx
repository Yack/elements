import * as React from "react";
import styled from "styled-components";
import { X } from "react-feather";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  visibility: visible;
  opacity: 1;
  z-index: 10;
  transition: visibility 0s, opacity 0.1s linear;
`;

const Inner = styled.div<{
  frameless: boolean;
  width: string | number;
  height: string | number;
}>`
  background: white;
  width: ${props => typeof props.width == "string" ? props.width : props.width + "px"} 
  height: ${props => typeof props.height == "string" ? props.height : props.height + "px"}
  border-radius: ${props => props.frameless ? "0px" : "5px"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  position: relative;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

const InnerContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow: scroll;
  position: relative;
`;

const Title = styled.div`
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  position: relative;
  border-bottom: 1px solid #edf0f2;
`;

const Footer = styled.div`
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  position: relative;
  border-top: 1px solid #edf0f2;
`;

const FooterPadding = styled.div`
  padding: 20px;
  flex: 1;
`;

const Button = styled.div`
  cursor: pointer;
  padding: 20px;
  opacity: 1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 0.5;
  }
`;

const TitleText = styled.div`
  flex: 1;
  padding: 20px;
  color: #202529;
  font-size: 28px;
  font-weight: 300;
`;

interface IModalProps {
  children?: any;
  title: string;
  width: string | number;
  height: string | number;
  onClose: any;
  footer?: any;
  header?: boolean;
  frameless?: boolean;
}

export const Modal: React.FunctionComponent<IModalProps> = (props: IModalProps) => {
  const [header, setHeader] = React.useState(true);
  const [frameless, setFrameless] = React.useState(false);

  React.useEffect(() => {
    if (typeof(props.header) == "boolean") setHeader(props.header);
    if (typeof(props.frameless) == "boolean") setFrameless(!!props.frameless);
  }, []);

  return (
    <Container>
      <Inner
        width={props.width}
        height={props.height}
        frameless={frameless}>
        {(!frameless && header) &&
          <Title>
            <TitleText>{props.title}</TitleText>
            <Button>
              <X
                color="#524150"
                size="30"
                thickness="1.5"
                onClick={props.onClose}
              />
            </Button>
          </Title>
        }

        <InnerContainer>
          {props.children}
        </InnerContainer>

        {props.footer &&
          <Footer>
            <FooterPadding>
              {props.footer}
            </FooterPadding>
          </Footer>
        }
      </Inner>
    </Container>
  );
};
