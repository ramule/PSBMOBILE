import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { pageLoaderService } from '../../../services/pageloader.service';
import { HttpRestApiService } from '../../../services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { AppConstants } from 'src/app/app.constant';
import { TranslateService } from 'src/app/services/translate.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-language-change',
  templateUrl: './language-change.component.html',
  styleUrls: ['./language-change.component.scss']
})
export class LanguageChangeComponent implements OnInit {
  languageList=[];
  finalLangList= []
  LanguageForm: FormGroup;
  languageCode: string = "en";
  public innerWidth: any;
  pagesetting:any;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/contactus'
  }


  languageJSONList =[];
  constructor(private form: FormBuilder,
    private _location : Location,
    private router: Router,
    private constant: AppConstants,
    public dataService: DataService,
    public loader: pageLoaderService,
    private http: HttpRestApiService,
    private translate: TranslateService,
    private storage: LocalStorageService,
    private location: Location,
    private ngZone: NgZone
    ) { }



  ngOnInit(): void {
    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });
    this.initialize();
    history.pushState({}, this.dataService.previousPageUrl, this.location.prepareExternalUrl(this.dataService.previousPageUrl));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));


  }
  currentlang = 'English'
  buildForm() {
    this.LanguageForm = new FormGroup({
      language: new FormControl(''),
    });
  }

  applyLanguage() {
    if (this.LanguageForm.valid) {
      this.changeLanguage();
    }
  }

  changeLanguage() {
    let lang = this.LanguageForm.get('language').value;
    if(lang){
      this.dataService.updateLanguageCode = lang;
      this.storage.setLocalStorage(this.constant.storage_language, lang);
      this.translate.use(lang);
      if(this.dataService.routefrom == "dashboard"){
          this.router.navigateByUrl('/dashboard');
      }else{
        this._location.back();
      }
      // this.router.navigateByUrl(this.pagesetting.currentpageRoute)
    }else{
      // showToastMessage('Under development', 'error');
    }
  }



  initialize() {
    this.buildForm();
    console.log('this.dataService.updateLanguageCode' + this.dataService.updateLanguageCode)
    this.dataService.changeMessage(this.commonPageComponent);

    console.log(this.storage.getLocalStorage(this.constant.storage_languageList));
    let languageList = JSON.parse(this.storage.getLocalStorage(this.constant.storage_languageList));
    console.log(languageList);

    console.log(this.storage.getLocalStorage(this.constant.storage_languageJson));
    let languageJSONList = Object.keys(JSON.parse(this.storage.getLocalStorage(this.constant.storage_languageJson)));

    languageJSONList.forEach(language => {
      this.languageList.push(languageList.find(lang => lang.langCode === language));
    });
    console.log(this.languageJSONList)

    for(var i= 0; i < this.languageList.length; i++ ){
        if(this.languageList[i]?.langCode == this.dataService.updateLanguageCode ){
          if(this.languageList[i].lanugae !=null){
        this.finalLangList.push(
          {
            'name':this.languageList[i]?.lanugae.match(/\(([^)]+)\)/)[1],
            'lanugae': this.languageList[i]?.lanugae.split('(')[0],
            'langCode' :this.languageList[i]?.langCode,
            'checked' :true
            }
          )
          }
        }else{
          if(this.languageList[i].lanugae !=null){
            this.finalLangList.push(
              {
                'name':this.languageList[i]?.lanugae.match(/\(([^)]+)\)/)[1],
                'lanugae': this.languageList[i]?.lanugae.split('(')[0],
                'langCode' :this.languageList[i]?.langCode,
                'checked' :false
                }
              )
          }

        }

    }


    console.log('finalLangList:' + JSON.stringify(this.finalLangList))
    if (this.storage.hasKeyLocalStorage(this.constant.storage_language)) {
      this.languageCode = this.storage.getLocalStorage(this.constant.storage_language);
      this.LanguageForm.patchValue({language:this.languageCode});
    }else{
      this.languageCode = 'en';
      this.LanguageForm.patchValue({language:'en'});
      this.translate.use('en');
    }

    console.log('this.languageList', JSON.stringify(this.languageList));


  }
  closeLanguage(){
    if(this.constant.getPlatform() == "web"){
      this.dataService.routeWithNgZone(this.dataService.previousPageUrl);
    }
    else{
      this._location.back();
    }
    // this._location.back();
    // this.router.navigateByUrl(this.pagesetting.currentpageRoute)

  }

}
