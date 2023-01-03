import { AfterViewInit, Component } from '@angular/core';
import { geoJson, Map, tileLayer } from 'leaflet';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  dataFromMap: any;

  constructor(
    private _mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    this._mapService.getMapData().subscribe((res: any) => {
      this.dataFromMap = res;
    });
    this.initMap();
  }

  initMap(): void {
    const map = new Map('map').setView([41.5, -103.5], 4);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    geoJson(this.dataFromMap, {
      style: function (feature) {
        let color: string = feature?.properties.density > 1000 ? '#800026' :
          feature?.properties.density > 500 ? '#BD0026' :
            feature?.properties.density > 200 ? '#E31A1C' :
              feature?.properties.density > 100 ? '#FC4E2A' :
                feature?.properties.density > 50 ? '#FD8D3C' :
                  feature?.properties.density > 20 ? '#FEB24C' :
                    feature?.properties.density > 10 ? '#FED976' :
                      '#FFEDA0';;
        return {
          color: "black",
          weight: 2,
          fillColor: color,
          fillOpacity: 0.4,
          opacity: 1,
          dashArray: '3',
        };
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup("<strong>" + feature.properties.name + "</strong></br>" + "<strong>" + "Density: " + feature.properties.density + "</strong>");
      }
    }).addTo(map);
  }
}
