import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { DataService } from 'src/app/services/data.service';
import { LocateUsReqService } from '../locate-us/locate-us.service';
import { AppConstants } from 'src/app/app.constant';
import { LocalStorageService } from 'src/app/services/local-storage-service.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { PluginService } from 'src/app/services/plugin-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
declare var showToastMessage: any;
declare var google: any;

@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.scss'],
})
export class LocateUsComponent implements OnInit {
  bankLocationDetailList: any;
  findBranchATMForm: FormGroup;
  showContent: boolean = false;
  filterActive: boolean = false;
  stateList = [];
  cityList = [];
  branchList = [];
  markers = [];
  selectedState: any;
  selectedCity: any;
  selectedBranch: any;
  atmBranchList = [];
  autoCompleteList = [];
  infoWindows = [];
  map: any;
  directionsDisplay;
  directionService;
  infoWindow;
  bounds;
  atmDetList = [];
  branchDetList = [];
  searchtype = 'State';
  selectedAtmBranchObj: any;
  isUserLocationAvail: boolean = false;
  searchBranch: boolean = true;
  nearMeShow = false;
  locateToggleSection : boolean = true ;
  serachedLocation:any= "";

  searchDatatypeName;
  searchIDName;
  commonPageComponent = {
    'headerType': 'notLoginPrelogin',
    'sidebarNAv': false,
    'footer': 'innerFooter',
    'currentpageRoute': '/locateus'
  }
  searchList = [
    { name: 'branch', displayName: 'Branch', selected: true, value: 'BRANCH' },
    { name: 'atm', displayName: 'ATM', selected: false, value: 'ATM' },
    {
      name: 'zonalOffices',
      displayName: 'Zonal Offices',
      selected: false,
      value: 'ZONAL',
    },
    {
      name: 'headOffices',
      displayName: 'Head Offices',
      selected: false,
      value: 'HO',
    },
  ];

  searchType = [
    { name: 'state', displayName: 'State', selected: true , idName:'State/City'},
    { name: 'city', displayName: 'City', selected: false , idName:'State/City'},
    { name: 'branchCode', displayName: 'Branch Code', selected: false , idName:'Branch Code'},
    { name: 'ifsc', displayName: 'IFSC', selected: false , idName:'IFSC'},
  ];

  headerdata = {
    headerType: 'preloginHeader',
    titleName: 'none',
    footertype: 'none',
  };
  keyword = 'address1';
  @ViewChild('location') location;
  @ViewChild('map') mapViewChild;

  public formErrorsBranchATM = {
    selectedType: '',
    location: '',
  };

  public formErrorsStateCityBranch = {
    state: '',
    city: '',
    branch: '',
  };

  public formErrorsBranchCode = {
    branchCode: '',
  };

  constructor(
    private formValidation: FormValidationService,
    private dataService: DataService,
    private locateUsService: LocateUsReqService,
    private constant: AppConstants,
    private storage: LocalStorageService,
    private http: HttpRestApiService,
    private translate: TranslatePipe,
    private ngZone: NgZone,
    private commonMethod: CommonMethods,
    public plugin: PluginService,
    private _location: Location,
    private router: Router,
    private loader: pageLoaderService,
  ) {}

  ngOnInit(): void {
    // this.dataService.changeMessage(this.headerdata);
    // history.pushState({}, this.dataService.previousPageUrl, this._location.prepareExternalUrl(this.dataService.previousPageUrl));
    // history.pushState({}, 'self', this._location.prepareExternalUrl(this.router.url));

    // this.dataService.removePreLoginFooterCss();
    this.ngZone.run(() => {
      if(this.dataService.bezellessIphone) {
        $("#mainDiv").removeClass("pre-login");
      }
    });

    this.dataService.changeMessage(this.commonPageComponent);
    this.buildForm();

    if(this.constant.getIsCordova() != 'web'){
      this.nearMeShow = true;
      this.getDefaultBankData();
    }
    else{
      this.getMobileLocation();
    }

  }

  buildForm() {
    this.findBranchATMForm = new FormGroup({
      searchList: new FormControl(this.searchList[0].name, [Validators.required]),
      searchType: new FormControl(this.searchType[0].name, [Validators.required]),
      searchText: new FormControl('', [Validators.required, Validators.pattern(/(^[a-z0-9A-Z.',\- ]*$)/)]),
    });
    this.findBranchATMForm.valueChanges.subscribe((data) => {
      this.formErrorsBranchATM = this.formValidation.validateForm(
        this.findBranchATMForm,
        this.formErrorsBranchATM,
        true
      );
    });

    // this.findBranchATMForm.patchValue({
    //   searchList : this.searchList[0].name,
    //   searchType : this.searchType[0].name,
    // })

    if(this.searchList.length > 0){
      this.searchDatatypeName = this.searchList[0].name;
    }

    if(this.searchType.length > 0){
      this.searchIDName = this.searchType[0].idName;
    }

  }

  showHideSearch() {
    this.showContent = !this.showContent;
  }

  validateForm() {
    if (this.findBranchATMForm.invalid) {
      this.findBranchATMForm.markAllAsTouched();
      return;
    }
  }

  submitLocForm() {
    this.validateForm();
    if (this.findBranchATMForm.valid) {
      var dtlType = this.findBranchATMForm.value.searchType;
      switch (dtlType) {
        case 'branch':
          this.getNearBy(this.constant.val_upi_BRANCH);
          break;
        case 'atm':
          this.getNearBy(this.constant.val_upi_ATM);
          break;
        case 'zonalOffices':
          this.getNearBy(this.constant.val_upi_ZONAL);
          break;
        case 'headOffices':
          this.getNearBy(this.constant.val_upi_HO);
          break;
      }
    }
  }

  getDefaultBankData() {

    this.dataService.getCurrentLatLong().subscribe(
      (data) => {
        console.log(
          'GeoLocation Plugin => getCurrentLatLong Success => ',
          data
        );

        if(data){
          console.log(this.dataService.latitude);
          console.log(this.dataService.longitude);
          let defaultBranchListParams = this.locateUsService.getDefaultBankList();
          this.http
            .callBankingAPIService(
              defaultBranchListParams,
              this.constant.deviceID,
              this.constant.serviceName_LOCATEUS
            )
            .subscribe((data) => {
              var resp = data.responseParameter;
              if (resp.opstatus == '00') {
                this.nearMeShow = true;
                this.bankLocationDetailList = data.set.records;
                this.isUserLocationAvail = true;
                this.setGoogleMap();
              } else {
                this.errorCallBack(data.subActionId, resp);
              }
            });
        }
        else{
          var self = this
          navigator.permissions.query({
            name: 'geolocation'
          }).then(function(result) {
              if (result.state == 'granted') {
                console.log("granted");
              } else if (result.state == 'prompt') {
                  console.log("prompt");
              } else if (result.state == 'denied') {
                  console.log("denied");
                  self.openPopup('permission-denied');
              }
              result.onchange = function() {
                  console.log(result.state);
              }
          });
        }
      },
      (err) => {
        this.openPopup('enable-location-permission');
        console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
      }
    );
  }

  getMobileLocation(){

    this.loader.showLoader();
    this.dataService.getCurrentLatLong().subscribe((data) => {
      if (data) {
        let defaultBranchListParams = this.locateUsService.getDefaultBankList();
          this.http
            .callBankingAPIService(
              defaultBranchListParams,
              this.constant.deviceID,
              this.constant.serviceName_LOCATEUS
            )
            .subscribe((data) => {
              var resp = data.responseParameter;
              if (resp.opstatus == '00') {
                this.nearMeShow = true;
                this.bankLocationDetailList = data.set.records;
                this.isUserLocationAvail = true;
                this.setGoogleMap();
              } else {
                this.errorCallBack(data.subActionId, resp);
              }
            });
      } else {
        this.openPopup('enable-location-permission');
      }
    }, err => {
      this.openPopup('enable-location-permission');
      console.log('GeoLocation Plugin => getCurrentLatLong Error => ', err);
    });
  }

  getNearBy(type) {
    let defaultBranchListParams = this.locateUsService.getNearByParam(type);
    this.http
      .callBankingAPIService(
        defaultBranchListParams,
        this.constant.deviceID,
        this.constant.serviceName_LOCATEUS
      )
      .subscribe((data) => {
        // console.log(data);
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.bankLocationDetailList = data.set.records;
          this.isUserLocationAvail = true;
          this.setGoogleMap();
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  getNearByAtm(type) {
    let defaultBranchListParams = this.locateUsService.getNearByParam(type);
    //TODO: Change this later if country is required after confirmation with the bank.
    this.http
      .callBankingAPIService(
        defaultBranchListParams,
        this.constant.deviceID,
        this.constant.serviceName_LOCATEUS
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          this.bankLocationDetailList = data.set.records;
          this.isUserLocationAvail = true;
          this.setGoogleMap();
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  //function to clear form and hide record
  clear(e) {
    if( e == 'mobile'){
      this.commonMethod.closeAllPopup() ;
    }
    this.findBranchATMForm.reset();
    this.getDefaultBankData();
    this.nearMeShow = true;
  }

  /**
   * Google map initialization
   */
  setGoogleMap() {
    var self = this;
    self.getCurrentLocation();
    self.directionService = new google.maps.DirectionsService();
    self.directionsDisplay = new google.maps.DirectionsRenderer();
    let lat, long;
    if (self.dataService.latitude && self.dataService.longitude) {
      lat = self.dataService.latitude;
      long = self.dataService.longitude;
    } else {
      lat = 22.0;
      long = 78.0;
    }

    const latlng = {
      lat: parseFloat(lat),
      lng: parseFloat(long),
    };

    const geocoder = new google.maps.Geocoder();

    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          console.log("response.results[0]" +response.results[0]);
          // self.map.setZoom(11);
          // const marker = new google.maps.Marker({
          //   position: latlng,
          //   map: self.map,
          // });
          // infowindow.setContent(response.results[0].formatted_address);
          // infowindow.open(self.map, marker);
        } else {
          // window.alert("No results found");
        }
      })
      .catch();
      // (e) => window.alert("Geocoder failed due to: " + e)


    var mapOptions = {
      center: new google.maps.LatLng(lat, long),
      zoom: this.isUserLocationAvail ? 12 : 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    self.directionsDisplay.setMap(self.map);
    if (self.isUserLocationAvail) {
      self.displayMarker();
    }
  }

  // function initMap(): void {
  //   const map = new google.maps.Map(
  //     document.getElementById("map") as HTMLElement,
  //     {
  //       zoom: 8,
  //       center: { lat: 40.731, lng: -73.997 },
  //     }
  //   );
  //   const geocoder = new google.maps.Geocoder();
  //   const infowindow = new google.maps.InfoWindow();

  //   (document.getElementById("submit") as HTMLElement).addEventListener(
  //     "click",
  //     () => {
  //       geocodeLatLng(geocoder, map, infowindow);
  //     }
  //   );
  // }

  // function geocodeLatLng(
  //   geocoder: google.maps.Geocoder,
  //   map: google.maps.Map,
  //   infowindow: google.maps.InfoWindow
  // ) {
  //   const input = (document.getElementById("latlng") as HTMLInputElement).value;
  //   const latlngStr = input.split(",", 2);
  //   const latlng = {
  //     lat: parseFloat(latlngStr[0]),
  //     lng: parseFloat(latlngStr[1]),
  //   };

  // }


  /**
   * To display the marker in the map
   */
  displayMarker(): void {
    this.bounds = new google.maps.LatLngBounds();
    this.clearMarkers();


    var latlng = new google.maps.LatLng(
      this.dataService.currentLat,
      this.dataService.currentLng
    );

    var icon = {
      url: "assets/images/icons/current-location-icon.svg", // url
      scaledSize: new google.maps.Size(27, 27), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
      };

      var marker = new google.maps.Marker({
      map: this.map,
      position: latlng,
      icon: icon,
      title: name,
      });

      this.markers.push(marker);
      this.map.setZoom(12);

      // this.createInfoWindow(marker, latlng);
      this.bounds.extend(latlng);


    for (let i = 0; i < this.bankLocationDetailList.length; i++) {
      let locateUsObj = this.bankLocationDetailList[i];
      var latlng = new google.maps.LatLng(
        locateUsObj.latitude,
        locateUsObj.longitute
      );
      var name = '';
      var marker = new google.maps.Marker({
        map: this.map,
        position: latlng,
        title: name,
      });
      this.markers.push(marker);
      this.map.setZoom(13);

      this.createInfoWindow(marker, locateUsObj);
      this.bounds.extend(latlng);
    }
    if (this.bankLocationDetailList.length > 0) {
      this.map.setCenter(
        new google.maps.LatLng(
          this.bankLocationDetailList[0].latitude,
          this.bankLocationDetailList[0].longitute
        )
      );
    }
  }

  /**
   * Initialization function
   */
  initialize() {
    this.hidePopup();

    this.getStateListForLocation();
    this.getLocationListForAtmAndBranch(this.constant.val_ATM);
  }

  detectLocation() {

    var data1 = {
      latitude:this.dataService.latitude,
      longitude:this.dataService.longitude
    }

    this.openFilter(data1);

    // var self = this;
    // navigator.geolocation.watchPosition(function(position) {

    // },
    // function(error) {
    //   if (error.code == error.PERMISSION_DENIED)
    //     console.log("you denied me :-(");
    // });

    this.getDefaultBankData();

  }

  /**
   * Get current location of user if location is enabled.
   */
  getCurrentLocation() {
    this.dataService.getCurrentLatLong().subscribe((isUserLocationAvail) => {
      this.isUserLocationAvail = isUserLocationAvail;
      if (!isUserLocationAvail) {
      } else {
      }
    });
  }

  /**
   * Show popup window in the map
   * @param marker
   * @param name
   * @param address
   * @param phoneNumber
   * @param email_id
   */
  createInfoWindow(marker, locateUsObj): void {
    google.maps.event.addListener(marker, 'click', () => {
      this.setInfoWindow(marker, locateUsObj);
    });
  }

  selectedLocationWithMarker(obj, index) {
    let marker = this.markers[index];
    this.map.setCenter(
      new google.maps.LatLng(
        this.markers[index].position.lat(),
        this.markers[index].position.lng()
      )
    );
    this.setInfoWindow(marker, obj);
  }

  setInfoWindow(marker, obj) {
    var myObj = this;
    if (this.infoWindow) {
      this.infoWindow.close();
    }

    for (var i = 0; i < myObj.infoWindows.length; i++) {
      myObj.infoWindows[i].close();
    }

    var iwContent =
      '<div id="iw_container">' +
      '<div class="iw_title">' +
      obj.displayName +
      '</div>' +
      '<div class="iw_content">' +
      obj.address1 +
      '<br />' +
      obj.phone_number +
      '<br />' +
      '<br />' +
      obj.email_id +
      '</div></div>';
    // including content to the Info Window.
    this.infoWindow = new google.maps.InfoWindow({
      content: iwContent,
    });

    myObj.infoWindows.push(this.infoWindow);

    // opening the Info Window in the current map and at the current marker location.
    this.infoWindow.open(this.map, marker);
  }

  /**
   * To get direction this function is invoked
   */
  getDirection() {
    if (this.selectedAtmBranchObj && this.atmBranchList.length > 0) {
      this.clearRoutes();
      let latlng = new google.maps.LatLng(
        this.selectedAtmBranchObj.latitude,
        this.selectedAtmBranchObj.longitute
      );
      this.driverDirection(latlng);
      this.hidePopup();
    }
  }
  SearchLocation() {}

  searchDataTypeChange(item) {

    var dtlType = item;
      switch (dtlType) {
        case 'BRANCH':
          case 'ATM':
          this.searchType = [
            { name: 'state', displayName: 'State', selected: true , idName:'State/City'},
            { name: 'city', displayName: 'City', selected: false , idName:'State/City'},
            { name: 'branchCode', displayName: 'Branch Code', selected: false , idName:'Branch Code'},
            { name: 'ifsc', displayName: 'IFSC', selected: false , idName:'IFSC'},
          ];
          break;
        case 'ZONAL':
        case 'HO':
          this.searchType = [
            { name: 'state', displayName: 'State', selected: true , idName:'State/City'},
            { name: 'city', displayName: 'City', selected: false , idName:'State/City'}
          ];
          break;
      }

    this.searchDatatypeName = item;
  }

  searchSubTypeChange(name) {
    this.findBranchATMForm.patchValue({
      searchText:''
    })
    this.searchIDName = name.idName;
    this.searchtype = name.displayName;
  }

  searchApplyClicked(e) {
    if(e == 'mobile'){
      this.commonMethod.closeAllPopup () ;
    }
    this.nearMeShow = false;
    this.serachedLocation = this.findBranchATMForm.value.searchText
    let defaultBranchListParams = this.locateUsService.getListBySearch(
      this.searchDatatypeName,
      this.searchIDName,
      this.findBranchATMForm.value.searchText
    );

    this.http
      .callBankingAPIService(
        defaultBranchListParams,
        this.constant.deviceID,
        this.constant.serviceName_LOCATEUS
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {

          this.bankLocationDetailList = data.set.records;

          if(this.bankLocationDetailList.length == 0){
            // showToastMessage("No Records Found", 'error');
          }

          this.isUserLocationAvail = true;
          this.setGoogleMap();
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  clearRoutes() {
    this.directionsDisplay.setMap(null);
  }

  cancel() {
    this._location.back()
  }

  /**
   * reset Select options to default select
   */
  resetSelect() {
    $('#state').val('');
    $('#city').val('');
    $('#branch').val('');
    this.selectedState = '';
    this.selectedCity = '';
    this.selectedBranch = '';
  }

  /**
   * Get StateList By Country Id
   */
  getStateListForLocation() {
    let cityListParams = this.locateUsService.getStateListReqByCountryID('1'); //TODO: Change this later if country is required after confirmation with the bank.
    this.http
      .callBankingAPIService(
        cityListParams,
        this.constant.deviceID,
        this.constant.serviceName_GETSTATEFORLOCATIONS
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          if (data.hasOwnProperty('set')) {
            this.stateList = data.set.records;
          }
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  /**
   * Set Autocomplete for lication search
   */
  setAutoCompleteByType() {

  }

  /**
   *
   * Function to get atm and branchList based on type
   */
  getLocationListForAtmAndBranch(type: string) {
    let cityListParams = this.locateUsService.getLocateUsParam(type);
    this.http
      .callBankingAPIService(
        cityListParams,
        this.constant.deviceID,
        this.constant.serviceName_LOCATEUS
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        if (resp.opstatus == '00') {
          if (data.hasOwnProperty('set')) {
            if (type == this.constant.val_ATM) {
              this.atmDetList = data.set.records;
            } else {
              this.branchDetList = data.set.records;
            }
          }
          if (this.searchBranch) {
            this.getLocationListForAtmAndBranch(this.constant.val_BRANCH);
            this.searchBranch = false;
          }
        } else {
          this.errorCallBack(data.subActionId, resp);
        }
      });
  }

  /**
   * Get selected branch object
   * @param branchId
   */
  getSelectedBranch(branchCode) {
    if (branchCode != '') {
      this.selectedBranch = this.branchList.find(
        (i) => i.branchCode == branchCode
      );
    }
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
  errorCallBack(subActionId, resp) {
    showToastMessage(resp.Result, 'error');
  }

  /**
   * hide popup
   */
  hidePopup() {
    $('.tab-main .tabcontent .embed-responsive .popup1').hide();
  }

  /**
   *This function is invoked to get direction
   * @param destinationPosition
   */
  driverDirection(destinationPosition): void {
    let mapObj = this.map;
    var self = this;
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
      let currLat = position.coords.latitude;
      let currLng = position.coords.longitude;
      let directionService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
        map: mapObj,
      });
      let sourcePosition = new google.maps.LatLng(currLat, currLng);
      directionService.route(
        {
          origin: sourcePosition,
          destination: destinationPosition,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
          }
        }
      );
    }

    function onError(error) {
      if (error.code == error.PERMISSION_DENIED) {
        self.showCommonToastMsgWithKey('ENABLE_LOCATION_MSG');
      }
    }
  }

  /**
   * setting selected atm or branch
   * @param selectedObj
   */
  getSelectedAtmBranch(selectedObj, index) {
    this.selectedAtmBranchObj = selectedObj;
    this.showPopup();
    this.selectedLocationWithMarker(selectedObj, index);
  }

  /**
   * show popup
   */
  showPopup() {
    $('.tab-main .tabcontent .embed-responsive .popup1').show();
  }

  /**
   * This function is invoked to get location by atm/branch type
   */
  getLocationByType() {
    this.hidePopup();
  }

  /**
   * Setting the markers in the map
   */
  setMarker() {
    if (this.atmBranchList.length > 0) {
      this.selectedAtmBranchObj = this.atmBranchList[0];
      this.showPopup();
      this.displayMarker();
    } else {
      this.deleteMarkers();
      this.clearRoutes();
    }
  }

  /**
   * To show generic toast msg for multilingual
   * @param msgKey
   */
  showCommonToastMsgWithKey(msgKey) {
    showToastMessage(this.translate.transform(msgKey));
  }

  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
    this.map.setZoom(5);
    this.map.setCenter(new google.maps.LatLng('22.0000', '78.0000'));
  }

  //
  isActiveCollapisble(id) {
    return $('#' + id).hasClass('slide-active');
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }



  openFilter(data){
    console.log(data)

    var myPlace = new google.maps.LatLng(data.latitude, data.longitute);
    var bounds = new google.maps.LatLngBounds(myPlace);
    this.map.setZoom(20);
    this.map.fitBounds(bounds);

    this.filterActive = true

  }

  filterClose(){
    this.filterActive = false
  }


  openPopup(popUp){
    this.commonMethod.openPopup('div.popup-bottom.'+popUp);
  }

  closePopup(popUp){
    this.commonMethod.openPopup('div.popup-bottom.'+popUp);
  }

  close(){
    this.commonMethod.closeAllPopup() ;
  }

  enableLocation() {
    this.closePopup('div.popup-bottom.enable-location-permission');

    if (this.constant.getPlatform() != "web") {
      this.plugin.gotoSetting().subscribe((status) => {
      console.log("gotoSetting=====>", status);
      }, (err) => {
      console.log("gotoSetting error", err);
      });
    }
  }

  locateToggle(){
    this.locateToggleSection = !this.locateToggleSection
  }

  openFilterPopup() {
    this.commonMethod.openPopup('div.filter1');
  }

}
