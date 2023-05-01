window.onload=inicio;
function inicio(){

    var vistaMapa = new ol.View({
        center:[-78.9343949119816,-1.5561165473452587], // longitud, latitud
        zoom: 7, 
        projection: 'EPSG:4326' //Datum: WGS84 Geográficas: 4326
    });

    //Constructor del mapa
    const map = new ol.Map({
        view: vistaMapa,
        //layers:[basemapOSM,wmsLayer,restLayer],
        target:"map",
        controls:[]
    })

    var basemapBlanco = new ol.layer.Tile({
        title: 'Blanco',
        type: 'base',
        visible: false
    });
    
    var basemapOSM = new ol.layer.Tile({
        title: 'Open Street Map',
        visible: true,
        type: 'base',
        source: new ol.source.OSM()
    });

    var basemapGoogleSatelite = new ol.layer.Tile({
        title: 'Google Satelite',
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        })
    });
    
    var basemapGoogle = new ol.layer.Tile({
        title: 'Google Callejero',
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: "http://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
        })
    });

    var basemapBing = new ol.layer.Tile({
        title: 'Bing Map',
        type: 'base',
        visible: false,
        source: new ol.source.BingMaps({
            key:'Anzbo5_U1A0SuxVZpc8rqUBSRLsHmJ1ZgCGzhYnxXKpkpm9k3SuyK7OgitBhBPUs',
            imagerySet:'Aerial'
        })
    });

    var baseGroup = new ol.layer.Group({
        title: 'Base maps',
        fold: true,
        layers: [basemapBing, basemapGoogle, basemapGoogleSatelite, basemapOSM, basemapBlanco]
    });
    map.addLayer(baseGroup);
    
    
    var relleno = new ol.style.Fill({
        color:[255,0,0,.6]
    });

    var borde = new ol.style.Stroke({
        color:[0,0,0,1],
        width:2,
        lineDash:[3,5]
    });

    // cargar capa de Pais
    var wmsPais=new ol.layer.Vector({
        title:'País',
        source: new ol.source.Vector({
            url:'Datos/geoJson/pais.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'Pais',
        style: new ol.style.Style({
            stroke: borde,
            fill: relleno
        })
    });

    // Define estilos de provincia    
    var style_provincias = function(feature){
        var color = feature.get('color'); //Color provincia
        var color2 = color.split(",").map(Number) // Transparencia en colores
        color2 = [...color2,0.8]
        var name_prov = feature.get('name_1')//Nombre provincia
        var style= new ol.style.Style({
            fill: new ol.style.Fill({
                color: color2
            }),
            text: new ol.style.Text({
                font: 'bold 6px arial',
                text: name_prov,
                scale: 1.5,
                fill: new ol.style.Fill({
                    color: [0,0,0,1]
                })
            })
        })

        feature.setStyle([style])
        
    }

    // cargar capa de Provincias
    var wmsProvincias=new ol.layer.Vector({
        title:'Provincias',
        source: new ol.source.Vector({
            url:'Datos/geoJson/provincias.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        title: 'Provincias',
        style: style_provincias
        
    });

    // Define estilos de cantones    
    var style_cantones = function(feature){
        var color = feature.get('color'); //Color provincia
        var color2 = color.split(",").map(Number) // Transparencia en colores
        color2 = [...color2,0.8]
        var name_canton = feature.get('name_2')//Nombre provincia
        var style= new ol.style.Style({
            fill: new ol.style.Fill({
                color: color2
            }),
            text: new ol.style.Text({
                font: 'bold 6px arial',
                text: name_canton,
                scale: 1.5,
                fill: new ol.style.Fill({
                    color: [0,0,0,1]
                })
            })
        })

        feature.setStyle([style])
        
    }

    // cargar capa de Cantones
    var wmsCantones=new ol.layer.Vector({
        title:'Cantones',
        source: new ol.source.Vector({
            url:'Datos/geoJson/cantones.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        title: 'Cantones',
        style: style_cantones
    });

    // Define estilos de parroquias    
    var style_parroquias = function(feature){
        var color = feature.get('color'); //Color parroquias 
        var name_parroquia = feature.get('name_3')//Nombre parroquias
        var color2 = color.split(",").map(Number) // Transparencia en colores
        color2 = [...color2,0.8]
        
        var style= new ol.style.Style({
            fill: new ol.style.Fill({
                color: color2
            }),
            text: new ol.style.Text({
                font: 'bold 6px arial',
                text: name_parroquia,
                scale: 1.5,
                fill: new ol.style.Fill({
                    color: [0,0,0,1]
                })
            })
        })

        feature.setStyle([style])
        
    }
    
    // cargar capa de Parroquias
    var wmsParroquias=new ol.layer.Vector({
        title:'Parroquias',
        source: new ol.source.Vector({
            url:'Datos/geoJson/parroquias.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: false,
        title: 'Parroquias',
        style: style_parroquias
    });
	
    
	var overlayGroup = new ol.layer.Group({
		title: 'División Política',
		fold: true,
		layers: [wmsPais, wmsProvincias, wmsCantones, wmsParroquias]
	});
	map.addLayer(overlayGroup);
    

    //Agrega control de pantalla completa    
    var pantallaCompleta = new ol.control.FullScreen();
    map.addControl(pantallaCompleta);

    //Agrega control de barra de escala    
    var barraEscala = new ol.control.ScaleLine({
        bar: true,
        text: true
    });
    map.addControl(barraEscala);

    // vista de un mapa pequeño
    var overviewMap = new ol.control.OverviewMap({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        collapsed: true
    });
    map.addControl(overviewMap);

    //Coordenadas X, Y con la posición del mause
    var mostrarCoordenadas = new ol.control.MousePosition({
        projection: 'EPSG:4326',
        coordinateFormat: function(coordenada){
            return ol.coordinate.format(coordenada,'{y}, {x}', 6)
        }
    });
    map.addControl(mostrarCoordenadas);

    var controlCapas=new ol.control.LayerSwitcher({
		activationMode: 'click',
		startActive: false,
		groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
    });
    map.addControl(controlCapas);
    
    var container = document.getElementById('popup');
	var contenido = document.getElementById('popup-content');
    var titulo = document.getElementById('popup-titulo');
	var cerrar = document.getElementById('popup-closer');

	
	var popup = new ol.Overlay({
		element: container,
		autoPan: true,
		autoPanAnimation: {
			duration: 250
		},
	});

	map.addOverlay(popup);

	cerrar.onclick = function () {
		popup.setPosition(undefined);
		cerrar.blur();
		return false;
	};

	map.on('singleclick', function (e) {
		popup.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, (feature,layer) => {
            var nombProvincia = feature.get('name_1');
            var nombCanton = feature.get('name_2');
            var nombParroquia = feature.get('name_3');

            if (!(nombParroquia==undefined)){
                console.log(feature);
                map.addOverlay(popup);
                titulo.innerHTML = '<b>Datos:<br>';
                var str = "Provincia: "+nombProvincia+'<br>';
                str += "Cantón: "+nombCanton+'<br>';
                str += "Parroquia: "+nombParroquia;
                contenido.innerHTML = str;
                popup.setPosition(e.coordinate)
                return; 
            } 

            if (!(nombCanton==undefined)){
                console.log(feature);
                map.addOverlay(popup);
                titulo.innerHTML = '<b>Datos:<br>';
                var str = "Provincia: "+nombProvincia+'<br>';
                str += "Cantón: "+nombCanton;                
                contenido.innerHTML = str;
                popup.setPosition(e.coordinate)
                return; 
            }   

            if (!(nombProvincia==undefined)){
                console.log(feature);
                map.addOverlay(popup);
                titulo.innerHTML = '<b>Datos:<br>';
                var str = "Provincia: "+nombProvincia;
                contenido.innerHTML = str;
                popup.setPosition(e.coordinate)
                return; 
            }
        }
        
        );
	});	

}

