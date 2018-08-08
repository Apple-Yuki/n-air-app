import { Component, Prop } from 'vue-property-decorator';
import { IFormInput, TObsType, Input } from './Input';

@Component
class NumberInput extends Input<IFormInput<number>> {

  static obsType: TObsType[];

  @Prop()
  value: IFormInput<number>;
  testingAnchor = `Form/Number/${this.value.name}`;

  $refs: {
    input: HTMLInputElement
  };

  updateValue(value: string) {
    let formattedValue = value;
    if (isNaN(Number(formattedValue))) formattedValue = '0';
    if (formattedValue !== value) {
      this.$refs.input.value = formattedValue;
    }
    // Emit the number value through the input event
    this.emitInput({ ...this.value, value: Number(formattedValue) });
  }

}

NumberInput.obsType = ['OBS_PROPERTY_DOUBLE', 'OBS_PROPERTY_FLOAT'];

export default NumberInput;
