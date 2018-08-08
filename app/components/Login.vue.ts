import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { UserService } from 'services/user';
import { OnboardingService } from 'services/onboarding';
import { Inject } from 'util/injector';
import { $t } from 'services/i18n';
import electron from 'electron';

@Component({})
export default class Login extends Vue {
  @Inject() userService: UserService;
  @Inject() onboardingService: OnboardingService;

  get loggedIn() {
    return this.userService.isLoggedIn();
  }

  get username() {
    return this.userService.username;
  }
  get userIcon() {
    return this.userService.userIcon;
  }
  get userId() {
    return this.userService.platformId;
  }
  get userPageURL() {
    return this.userService.platformUserPageURL;
  }

  logout() {
    if (confirm($t('common.logoutConfirmMessage'))) {
      this.userService.logOut();
    }
  }

  login() {
    this.onboardingService.start({ isLogin: true });
  }

  openUserpage() {
    electron.remote.shell.openExternal(this.userPageURL);
  }
}
