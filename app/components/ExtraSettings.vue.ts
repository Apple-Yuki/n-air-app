import Vue from 'vue';
import electron from 'electron';
import { Component } from 'vue-property-decorator';
import { Inject } from 'util/injector';
import BoolInput from 'components/shared/forms/BoolInput.vue';
import { CustomizationService } from 'services/customization';
import { IFormInput } from 'components/shared/forms/Input';
import { OnboardingService } from 'services/onboarding';
import { WindowsService } from 'services/windows';
import { UserService } from 'services/user';
import { StreamingService } from 'services/streaming';
import { AppService } from 'services/app';
import { $t } from 'services/i18n';

@Component({
  components: { BoolInput }
})
export default class ExtraSettings extends Vue {
  @Inject() customizationService: CustomizationService;
  @Inject() onboardingService: OnboardingService;
  @Inject() windowsService: WindowsService;
  @Inject() userService: UserService;
  @Inject() streamingService: StreamingService;
  @Inject() appService: AppService;

  cacheUploading = false;

  showCacheDir() {
    electron.remote.shell.showItemInFolder(
      electron.remote.app.getPath('userData')
    );
  }

  deleteCacheDir() {
    if (
      confirm(
        $t('settings.clearCacheConfirm')
      )
    ) {
      this.appService.relaunch({ clearCacheDir: true });
    }
  }
}
