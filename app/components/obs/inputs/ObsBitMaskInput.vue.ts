import { Component, Prop, Watch } from 'vue-property-decorator';
import { ObsInput, TObsType, IObsBitmaskInput } from './ObsInput';
import { EBit, default as Utils } from '../../../services/utils';

@Component
class ObsBitMaskInput extends ObsInput<IObsBitmaskInput> {
  static obsType: TObsType;

  @Prop()
  value: IObsBitmaskInput;
  testingAnchor = `Form/BitMask/${this.value.name}`;

  flags: EBit[] = [];

  mounted() {
    this.updateFlags();
  }

  @Watch('value')
  updateFlags() {
    this.flags = Utils.numberToBinnaryArray(this.value.value, this.value.size).reverse();
  }

  onChangeHandler(index: number, state: boolean) {
    this.$set(this.flags, index, Number(state));
    const value = Utils.binnaryArrayToNumber(this.flags.reverse());
    this.emitInput({ ...this.value, value });
  }
}

ObsBitMaskInput.obsType = 'OBS_PROPERTY_BITMASK';

export default ObsBitMaskInput;
