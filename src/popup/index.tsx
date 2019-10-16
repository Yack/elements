import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: max-content;
  height: max-content;
`;

// prettier-ignore
const Content = styled.div<{ width: number }>`
  display: flex;
  position: absolute;
  z-index: 1000;
  background: white;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #f7f7f7;
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.05);
  width: ${props => props.width}px;
  height: max-content;

  &.left-top { top: 0px; left: 0px; transform: translateY(-100%);  }
  &.right-top { top: 0px; right: 0px; transform: translateY(-100%); }
  &.left-bottom { bottom: 0px; left: 0px; transform: translateY(100%); }
  &.right-bottom { bottom: 0px; right : 0px; transform: translateY(100%); }
`;

const ContentActiveArea = styled.div`
  flex: 1;
`;

interface IPopupProps {
  visible: boolean;
  handleDismiss: any;
  containerClassName: string;
  children: any;
  direction: string;
  width: number;
  hidePopup: any;
  content: any;
}

interface IPopupState {
  visible: boolean;
}

export class Popup extends React.Component<IPopupProps, IPopupState> {
  public static getDerivedStateFromProps(props: IPopupProps, state: IPopupState) {
    return { visible: props.visible };
  }

  public wrapperRef: any;
  public rootRef: any;

  constructor(props: IPopupProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };

    this.wrapperRef = React.createRef();
    this.rootRef = React.createRef();
    
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }

  public hidePopup() {
    this.props.handleDismiss();
  }

  public handleClickOutside(event: any) {
    if (!this.wrapperRef) return;
    if (!this.wrapperRef.contains) return;
    if (this.wrapperRef.contains(event.target)) return;
    if (!this.wrapperRef.contains(event.target)) this.hidePopup();
  }

  public handleKeyPress(e: any) {
    // Escape
    if (e.keyCode == 27) this.hidePopup();

    // Enter
    if (e.keyCode == 13) this.hidePopup();
  }

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("keyup", this.handleKeyPress);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    document.removeEventListener("keyup", this.handleKeyPress);
  }

  public render() {
    // If both the props & state are true
    // Initially the state will be populated by the prop = true + true
    // const show = this.state.visible != undefined ? this.props.manual : this.state.show
    // We DUPLICATE the dimnesions of our Popup parent
    const rectangle = this.rootRef.getBoundingClientRect ? this.rootRef.getBoundingClientRect() : null;
    const top = rectangle ? rectangle.top : 0;
    const left = rectangle ? rectangle.left : 0;
    const width = rectangle ? rectangle.width : 0;
    const height = rectangle ? rectangle.height : 0;
    const className = this.props.containerClassName ? this.props.containerClassName : "";

    // prettier-ignore
    return (
      <Container
        className={className}
        ref={(ref) => this.rootRef = ref}>
        {this.props.children}
        {this.props.visible &&
          <div style={{ top, left, width, height, position: "absolute" }}>
            <Content
              ref={(ref) => this.wrapperRef = ref}
              width={this.props.width}
              className={this.props.direction}>
              <ContentActiveArea>
                {this.props.content}
              </ContentActiveArea>
            </Content>
          </div>
        }
      </Container>
    );
  }
}