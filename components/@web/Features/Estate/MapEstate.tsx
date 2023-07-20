import "@/assets/css/map.css";
import Mapir from "mapir-react-typescript";
import { useCallback } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPIR_TOKEN || "";

const Map = Mapir.setToken({
  accessToken: API_KEY,
  transformRequest: (url: string) => {
    return {
      url: url,
      headers: {
        "x-api-key": API_KEY,
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#51D5A0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    border: "2px solid gray",
    cursor: "pointer",
  },
};

const clusterMarker = (coordinates: number[][], pointCount: number) => (
  <Mapir.Marker coordinates={coordinates} style={styles.clusterMarker}>
    <div>{pointCount}</div>
  </Mapir.Marker>
);

const points = {
  type: "FeatureCollection",
  name: "cluster",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.438049280539616, 29.684091547429148] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.438620107768514, 29.681427687027611] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.441283968170055, 29.681237411284641] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.443377001342689, 29.682664479356895] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.440237451583734, 29.678858964497554] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.443377001342689, 29.67923951598349] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.4404277273267, 29.675624276867119] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.435765971624008, 29.678668688754588] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.437859004796643, 29.679049240240523] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.436622212467363, 29.681617962770577] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.436622212467363, 29.675624276867119] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.439190934997413, 29.672675002851129] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.444042966443071, 29.6762902419675] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.442140209013402, 29.677717310039753] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460406680338231, 29.685708891244367] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.459835853109333, 29.683806133814695] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.462785127125315, 29.681427687027611] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.464021919454602, 29.684567236786563] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.461643472667518, 29.684376961043597] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460121266723782, 29.680286032569807] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460501818209714, 29.681998514256509] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.464878160297957, 29.682569341485411] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.462404575639383, 29.68742137293107] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.463451092225704, 29.686279718473266] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.441949933270436, 29.671152796907393] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.442045071141919, 29.673911795180416] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.443377001342689, 29.674292346666348] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460216404595265, 29.688277613774421] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.457647682065208, 29.685899166987333] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.458694198651528, 29.688182475902938] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.45812337142263, 29.682569341485411] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.456220613992954, 29.68447209891508] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.438429832025548, 29.675909690481568] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.439190934997413, 29.677527034296787] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.440618003069666, 29.683520720200246] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.441474243913021, 29.684662374658046] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.442806174113784, 29.684281823172114] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.439000659254447, 29.685994304858816] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.456410889735928, 29.687992200159968] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.454983821663674, 29.685899166987333] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.452129685519168, 29.663541767188715] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.450512341703948, 29.663256353574265] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.449180411503178, 29.663351491445749] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.448990135760212, 29.666395903333221] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.450892893189881, 29.6653493867469] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460977507567129, 29.673245830080031] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.454508132306252, 29.6751485875097] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.454508132306252, 29.677812447911236] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.450036652346533, 29.681237411284641] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.447943619173898, 29.686279718473266] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.450988031061364, 29.668964625863275] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.446516551101645, 29.669535453092173] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.459169888008944, 29.668964625863275] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.441188830298564, 29.666871592690637] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.440237451583734, 29.665920213975802] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.441283968170055, 29.6653493867469] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.439761762226318, 29.667061868433603] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.447753343430925, 29.649746775823612] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.44727765407351, 29.651554395381797] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.44860958427428, 29.651173843895862] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.446421413230162, 29.650412740923993] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.445850586001256, 29.651744671124764] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.448894997888729, 29.659355700843442] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.448514446402797, 29.657643219156739] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.451844271904719, 29.655359910241135] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.449846376603567, 29.655074496626685] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.446135999615706, 29.655835599598554] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.443186725599723, 29.65878487361454] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.44594572387274, 29.66125845827311] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.445374896643841, 29.664873697389485] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.449085273631695, 29.674577760280798] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.460406680338231, 29.662209836987945] } },
    { type: "Feature", properties: { id: null }, geometry: { type: "Point", coordinates: [52.453651891462904, 29.659736252329377] } },
  ],
};

const MapEstate = (props: IProps) => {
  const {} = props;

  return (
    <>
      <div className="relative z-10 h-full w-full">
        <Mapir
          //
          Map={Map}
          center={[51.42, 35.71]}
          zoom={[16]}
          userLocation
          className="!h-full !w-full overflow-hidden"
          // onClick={(m: any, e: any) => setMarkerAndAddress([e.lngLat.lng, e.lngLat.lat])}
          interactive
          hash
        >
          {/* zoom */}
          <Mapir.ZoomControl position="bottom-right" />
          {/* marker */}
          <Mapir.Cluster zoomOnClick ClusterMarkerFactory={clusterMarker}>
            {points.features.map((feature, key) => (
              <Mapir.Marker key={key} coordinates={feature.geometry.coordinates} />
            ))}
          </Mapir.Cluster>
          <Mapir.Marker coordinates={[51.42, 35.71]} />
        </Mapir>
      </div>
    </>
  );
};

export default MapEstate;

export type IProps = {};
