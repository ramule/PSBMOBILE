import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterHeaderComponent } from '../common-ui/registration-header/registration-header.component'
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { SideNavOmniComponent } from './side-nav-omni/side-nav-omni.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({ 
  declarations: [HeaderComponent, SideNavComponent, FooterComponent, FooterMobileComponent,RegisterHeaderComponent,ThemeSettingsComponent, SideNavOmniComponent, NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports:[HeaderComponent, SideNavComponent, FooterComponent, FooterMobileComponent,RegisterHeaderComponent,ThemeSettingsComponent, SideNavOmniComponent, NotificationComponent]
})
export class CommonModules { }

