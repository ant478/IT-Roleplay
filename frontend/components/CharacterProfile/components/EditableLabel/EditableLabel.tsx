import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';

interface EditableLabelProps {
  initialValue: string;
  isEditable: boolean;
  onConfirm: (value: string) => any;
}

interface EditableLabelState {
  isEditing: boolean;
  value: string;
}

export default class EditableLabel extends React.Component<EditableLabelProps, EditableLabelState> {
  private input = React.createRef<HTMLInputElement>();

  constructor(props: EditableLabelProps) {
    super(props);

    this.state = {
      isEditing: false,
      value: props.initialValue,
    };
  }

  public componentWillReceiveProps(nextProps: EditableLabelProps): void {
    const isInitialValueChanged = nextProps.initialValue !== this.state.value;

    if (isInitialValueChanged) {
      this.setState({
        value: nextProps.initialValue,
        isEditing: false,
      });
    }
  }

  public shouldComponentUpdate(nextProps: EditableLabelProps, nextState: EditableLabelState): boolean {
    const isEditableChanged = nextProps.isEditable !== this.props.isEditable;
    const isEditingChanged = nextState.isEditing !== this.state.isEditing;
    const isValueChanged = nextState.value !== this.state.value;

    return isEditableChanged || isEditingChanged || isValueChanged;
  }

  public componentDidMount(): void {
    document.addEventListener('click', this.handleClick, true);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('click', this.handleClick, true);
  }

  public handleClick = (event: MouseEvent): void => {
    if (!this.state.isEditing) {
      return;
    }

    const isClickOutsideInput = !ReactDOM.findDOMNode(this)!.contains(event.target as Element);

    if (isClickOutsideInput) {
      this.onCancel();
    }
  }

  public onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ value: event.target.value });
  }

  public onEdit = (): void => {
    this.setState({ isEditing: true }, () => this.input.current!.focus());
  }

  public onConfirm = (): void => {
    const trimmedValue = this.state.value.trim();

    this.props.onConfirm(trimmedValue);
    this.setState({
      isEditing: false,
      value: trimmedValue,
    });
  }

  public onCancel = (): void => {
    this.setState({ value: this.props.initialValue, isEditing: false });
  }

  public onKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.onConfirm();
    }
  }

  public renderIcons(): React.ReactNode[] {
    if (!this.props.isEditable) {
      return [];
    }

    const icons: React.ReactNode[] = [];

    if (this.state.isEditing) {
      icons.push(
        <i key="confirm" className="editable-label__icon editable-label__icon_confirm" onClick={this.onConfirm}><FontAwesomeIcon icon={faCheck}/></i>,
      );
    } else {
      icons.push(
        <i key="edit" className="editable-label__icon editable-label__icon_edit" onClick={this.onEdit}><FontAwesomeIcon icon={faEdit}/></i>,
      );
    }

    return icons;
  }

  public renderInput(): React.ReactNode {
    return (
      <input
        ref={this.input}
        spellCheck={false}
        className="editable-label__input"
        value={this.state.value}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
      />
    );
  }

  public renderValue(): React.ReactNode {
    return (
      <span className="editable-label__value">{this.state.value}</span>
    );
  }

  public render(): React.ReactNode {
    const classes = classNames('editable-label', {
      'editable-label_editable': this.props.isEditable,
      'editable-label_editing': this.state.isEditing,
    });

    return (
      <div className={classes}>
        {this.state.isEditing ? this.renderInput() : this.renderValue()}
        {this.renderIcons()}
      </div>
    );
  }
}
