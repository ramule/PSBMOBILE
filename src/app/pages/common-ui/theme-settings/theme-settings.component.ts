import { Component, OnInit } from '@angular/core';
import { HttpRestApiService } from '../../../../app/services/http-rest-api.service';
import { ThemeSettingsService } from './theme-settings-service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-theme-settings',
  templateUrl: './theme-settings.component.html',
  styleUrls: ['./theme-settings.component.scss']
})
export class ThemeSettingsComponent implements OnInit {
  selectedTheme:string='default';
  selectedSideBarColor:string='blue';
  selectedBg:string='bg1';
  selectedMenuOption:string='vertical';
  commonPageComponent :any;

  constructor(private http:HttpRestApiService,private themeSettingService : ThemeSettingsService,private storage : LocalStorageService,private constant : AppConstants,private dataService:DataService) { }

  ngOnInit(): void {
    // this.pageSettings();
    this.initialization();
  }

  initialization(){
    this.getUpdatedTheme();
    // this.dataService.changeMessage(this.commonPageComponent);
  }

  /**
   * get Selected theme
   * @param value
   */
  themechanger(value){
   this.selectedTheme = value;
  }

  setSideBarColor(color){
    this.selectedSideBarColor = color;
  }

  setBackground(bg){
    this.selectedBg = bg;
  }
/**
 * Update theme for the customer
 */
  updateTheme(){

    let obj = {themeName: this.selectedTheme,themeSideBarColor:this.selectedSideBarColor,themeSideBackground:this.selectedBg,themeMenuOption :this.selectedMenuOption}
    var param = this.themeSettingService.getThemeSettingsParam(obj);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage(this.constant.storage_deviceId), this.constant.serviceName_UPDATECUSTOMERTHEME).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.dataService.themeName = this.selectedTheme;
        this.dataService.setTheme(this.selectedTheme);
        showToastMessage(resp.Result,"success");
      }
      else {
        this.errorCallBack(data.subActionId, resp);
      }
    })
  }
  pageSettings(){
  //   if( window.innerWidth < 767){

  //     this.commonPageComponent = {
  //       'headerType': 'TitleHeader',
  //       'titleName': 'Theme',
  //       'sidebarNAv': 'OmniNAv',
  //       'footer': 'none',

  //     }

  // } else{
  //   this.commonPageComponent = {
  //     'headerType': 'innerHeader',
  //     'sidebarNAv': 'OmniNAv',
  //     'footer': 'innerFooter',

  //   }
  // }
  }
    /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    if (resp.opstatus == "02" || resp.opstatus == "01") {
      showToastMessage(resp.Result,"error");
    }
  }

  /**
   * Get update theme and setting selected values
   */
  getUpdatedTheme(){
    this.dataService.updateThemeObservable.subscribe((themeDtls:any)=>{
      if(Object.keys(themeDtls).length){
        this.selectedTheme = themeDtls.themeName;
        this.selectedMenuOption = themeDtls.menuOption;
        this.selectedBg = themeDtls.sideBarBg;
        this.selectedSideBarColor = themeDtls.sideBarColor;
      }
    });
  }
}
