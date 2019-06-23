import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Inject } from 'util/injector';
import { NicoliveProgramService, NicoliveProgramServiceFailure } from 'services/nicolive-program/nicolive-program';
import { clipboard } from 'electron';

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

@Component({})
export default class TopNav extends Vue {
  @Inject()
  nicoliveProgramService: NicoliveProgramService;

  get hasProgram(): boolean {
    return this.nicoliveProgramService.hasProgram;
  }

  isFetching: boolean = false;
  async fetchProgram(): Promise<void> {
    if (this.isFetching) throw new Error('fetchProgram is running');
    try {
      this.isFetching = true;
      await this.nicoliveProgramService.fetchProgram();
    } catch (caught) {
      if (caught instanceof NicoliveProgramServiceFailure) {
        await NicoliveProgramService.openErrorDialogFromFailure(caught);
      } else {
        throw caught;
      }
    } finally {
      this.isFetching = false;
    }
  }

  isEditing: boolean = false;
  async editProgram() {
    if (this.isEditing) throw new Error('editProgram is running');
    try {
      this.isEditing = true;
      return await this.nicoliveProgramService.editProgram();
    } catch (e) {
      // TODO
      console.warn(e);
    } finally {
      this.isEditing = false;
    }
  }

  copyProgramURL(event: HTMLElementEvent<HTMLInputElement>) {
    if (this.isFetching) throw new Error('fetchProgram is running');
    clipboard.writeText(`https://live.nicovideo.jp/watch/${this.nicoliveProgramService.state.programID}`);

    const icons = event.target.parentNode.querySelectorAll('i[class^="icon-"]')
    icons.forEach((element : Element) => {
      element.classList.toggle('is-invisible')
    })
    
    setTimeout(() => {
      icons.forEach((element : Element) => {
        element.classList.toggle('is-invisible')
      })
    }, 1000)
  }
}
