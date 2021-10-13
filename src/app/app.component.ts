import { AfterViewInit, Component, OnInit } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { ApiService } from './services/service';

import Swal from 'sweetalert2';
import { UserService } from './services/user.service';

interface GeoObjectConstructor {
  feature: ymaps.IGeoObjectFeature;
  options: ymaps.IGeoObjectOptions;
}
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  foods: Food[] = [
    { value: '1', viewValue: 'Иванов' },
    { value: '2', viewValue: 'Петров' },
    { value: '3', viewValue: 'Сидоров' },
  ];
  isShowLocation: boolean = false;
  isMobile: boolean = false;
  login: string = '';
  switch() {
    this.isShowLocation = !this.isShowLocation;
  }
  constructor(
    private _appServiceTable: ApiService,
    private userService: UserService
  ) {}
  dynamicSort(property: any) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: { [x: string]: number }, b: { [x: string]: number }) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  spinnerShow = false;
  UsersPoints: any = [];
  height = window.innerHeight;
  ngOnInit() {
    try {
      this.isMobile =
        localStorage.getItem('isMobile') == 'null'
          ? false
          : localStorage.getItem('isMobile') == 'true'
          ? true
          : false;
    } catch (e) {}
  }
  isClusterLoaded = false;
  ngAfterViewInit() {
    setTimeout(() => {
      this._appServiceTable.getFilials().subscribe(
        (res: any) => {
          try {
            if (res.code == '-2') {
              Swal.fire({
                icon: 'error',
                text: res.message,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
              }).then(() => {});
            }

            if (res.code == '0') {
              let data = res.filials;
              let UsersPoints = data;
              this.isShowLocation = false;
              //setTimeout(() => {
              for (let i = 0; i < UsersPoints.length - 100; i++) {
                try {
                  if (
                    parseFloat(UsersPoints[i].coordLat) >= 0 &&
                    parseFloat(UsersPoints[i].coordLat) < 90 &&
                    parseFloat(UsersPoints[i].coordLong) >= 0 &&
                    parseFloat(UsersPoints[i].coordLat) < 180
                  )
                    this.geoObjects[i] = new ymaps.Placemark(
                      [
                        parseFloat(UsersPoints[i].coordLat),
                        parseFloat(UsersPoints[i].coordLong),
                      ],
                      this.getPointData(i, ''),
                      this.getPointOptions() as any
                    );
                } catch (e) {}
              }
              //this.map.container.fitToViewport();
              if (this.isClusterLoaded && this.isInit) {
                this.clusterer.add(this.geoObjects);
                this.map.geoObjects.add(this.clusterer as any);
              }
              //}, 5000);
              this.spinnerShow = false;
              //this.height = window.innerHeight;
            }

            if (res.code == '-1') {
              Swal.fire({
                icon: 'error',
                text: res.message,
              });
            }
          } catch (e) {
            Swal.fire({
              icon: 'error',
              text: e,
            }).then(() => {});
          }
        },

        (err: any) => {
          Swal.fire({
            icon: 'error',
            text: 'Произошла техническая ошибка. Попробуйте позднее.',
          }).then(() => {});
          console.log('1' + err);
        }
      );
    }, 2000);
  }
  geoObject: GeoObjectConstructor = {
    feature: {
      geometry: {
        // The "Polyline" geometry type.
        type: 'LineString',
        // Specifying the coordinates of the vertices of the polyline.
        coordinates: [
          // [55.8, 37.5],
          // [55.7, 37.4]
        ],
      },
      properties: {
        // The contents of the hint.
        hintContent: "I'm a geo object",
        // The contents of the balloon.
        balloonContent: 'You can drag me',
      },
    },
    options: {
      /**
       * Setting the geo object options.
       *  Enabling drag-n-drop for the polyline.
       */
      //draggable: true,
      // The line color.
      strokeColor: '#FFFF00',
      // Line width.
      strokeWidth: 5,
    },
  };

  //cluster

  clustererOptions: ymaps.IClustererOptions = {
    /**
     * Only cluster styles can be specified via the clusterer;
     * for placemark styles, each placemark must be set separately.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
     */
    preset: 'islands#invertedDarkGreenClusterIcons',
    /**
     * Setting to "true" if we want to cluster only points with the same coordinates.
     */
    groupByCoordinates: false,
    /**
     * Setting cluster options in the clusterer with the "cluster" prefix.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
     */
    clusterDisableClickZoom: true,
    clusterHideIconOnBalloonOpen: false,
    geoObjectHideIconOnBalloonOpen: false,
  };

  points = [
    [55.831903, 37.411961],
    [55.763338, 37.565466],
    [55.763338, 37.565466],
    [55.744522, 37.616378],
    [55.780898, 37.642889],
    [55.793559, 37.435983],
    [55.800584, 37.675638],
    [55.716733, 37.589988],
    [55.775724, 37.56084],
    [55.822144, 37.433781],
    [55.87417, 37.669838],
    [55.71677, 37.482338],
    [55.78085, 37.75021],
    [55.810906, 37.654142],
    [55.865386, 37.713329],
    [55.847121, 37.525797],
    [55.778655, 37.710743],
    [55.623415, 37.717934],
    [55.863193, 37.737],
    [55.86677, 37.760113],
    [55.698261, 37.730838],
    [55.6338, 37.564769],
    [55.639996, 37.5394],
    [55.69023, 37.405853],
    [55.77597, 37.5129],
    [55.775777, 37.44218],
    [55.811814, 37.440448],
    [55.751841, 37.404853],
    [55.627303, 37.728976],
    [55.816515, 37.597163],
    [55.664352, 37.689397],
    [55.679195, 37.600961],
    [55.673873, 37.658425],
    [55.681006, 37.605126],
    [55.876327, 37.431744],
    [55.843363, 37.778445],
    [55.875445, 37.549348],
    [55.662903, 37.702087],
    [55.746099, 37.434113],
    [55.83866, 37.712326],
    [55.774838, 37.415725],
    [55.871539, 37.630223],
    [55.657037, 37.571271],
    [55.691046, 37.711026],
    [55.803972, 37.65961],
    [55.616448, 37.452759],
    [55.781329, 37.442781],
    [55.844708, 37.74887],
    [55.723123, 37.406067],
    [55.858585, 37.48498],
  ];

  geoObjects: ymaps.Placemark[] = [];
  map: ymaps.Map;
  isInit: boolean = false;

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
    this.map.controls.remove('geolocationControl');
    this.map.controls.remove('searchControl');
    this.isInit = true;
    /**
     * Data is passed to the placemark constructor as the second parameter, and options are third.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
     */
    // for (let i = 0; i < this.points.length; i++) {
    //   this.geoObjects[i] = new ymaps.Placemark(
    //     this.points[i],
    //     this.getPointData(i, ''),
    //     this.getPointOptions() as any
    //   );
    // }
  }
  clusterer: any = [];
  onClustererReady(event: YaReadyEvent<ymaps.Clusterer>): void {
    this.isClusterLoaded = true;
    const clusterer = event.target;
    this.clusterer = event.target;
    /**
     * You can change clusterer options after creation.
     */
    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true,
    });
    this.clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true,
    });

    /**
     * You can add a JavaScript array of placemarks (not a geo collection)
     * or a single placemark to the clusterer.
     * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(this.geoObjects);
    if (this.isInit) {
      this.map.geoObjects.add(clusterer as any);

      /**
       * Positioning the map so that all objects become visible.
       */

      this.map.setBounds(clusterer.getBounds()!, {
        checkZoomRange: true,
      });
    }
  }

  /**
   * The function returns an object containing the placemark data.
   * The clusterCaption data field will appear in the list of geo objects in the cluster balloon.
   * The balloonContentBody field is the data source for the balloon content.
   * Both fields support HTML markup.
   * For a list of data fields that are used by the standard content layouts for
   * geo objects' placemark icons and balloons, see the documentation.
   * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
   */
  getPointData(index: number, ceo: string) {
    return {
      balloonContentHeader:
        '<font size=3><b><a target="_blank" href="https://yandex.com">Your link can be here</a></b></font>',
      balloonContentBody:
        '<p>Your name: <input name="login"></p><p>The phone in the format 2xxx-xxx:  <input></p><p><input type="submit" value="Send"></p>',
      balloonContentFooter: `<font size=1>Information provided by: placemark </font> balloon <strong> ${ceo}</strong>`,
      clusterCaption: `placemark <strong>${index}</strong>`,
    };
  }

  /**
   * The function returns an object containing the placemark options.
   * All options that are supported by the geo objects can be found in the documentation.
   * @see https://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
   */
  getPointOptions() {
    return {
      preset: 'islands#darkGreenIcon',
    };
  }
}
