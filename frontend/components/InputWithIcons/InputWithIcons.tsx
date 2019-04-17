import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface InputWithIconsProps {
  initialValue: string;
  labelText?: string;
  type?: string;
  onConfirm: (value: string) => any;
  onCancel: (value: string) => any;
}

interface InputWithIconsState {
  value: string;
}

const defaultProps = {
  labelText: '',
  type: 'text',
};

type Props = InputWithIconsProps & Readonly<typeof defaultProps>;

const InputWithIconsClass = class InputWithIcons extends React.Component<Props, InputWithIconsState> {
  public static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };

    this.onChange = this.onChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  public onChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ value: event.target.value });
  }

  public onConfirm(): void {
    this.props.onConfirm(this.state.value);
  }

  public onCancel(): void {
    this.props.onCancel(this.state.value);
  }

  public render(): React.ReactNode {
    return (
      <div className="input-with-icons">
        <label className="input-with-icons__label">
          {this.props.labelText}
          <input
            className="input-with-icons__input"
            type={this.props.type}
            value={this.state.value}
            onChange={this.onChange}
          />
          <i className="input-with-icons__icon input-with-icons__icon_confirm" onClick={this.onConfirm}><FontAwesomeIcon icon={faCheck}/></i>
          <i className="input-with-icons__icon input-with-icons__icon_cancel" onClick={this.onCancel}><FontAwesomeIcon icon={faTimes}/></i>
        </label>
      </div>
    );
  }
} as React.ComponentClass<InputWithIconsProps, InputWithIconsState>;

export default InputWithIconsClass;
