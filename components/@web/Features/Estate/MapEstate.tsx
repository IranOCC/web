"use client";

import "@/assets/css/map.css";
import EmptyMarker from "@/assets/images/icons/emptyMarker.png";
import { Icon, StorageFile, WebEstate } from "@/types/interfaces";
import { Spinner, Image, Card, CardBody, Button } from "@nextui-org/react";
import Mapir from "mapir-react-typescript";
import { useContext, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { ThemeContext, ThemeContextType } from "@/context/theme.context";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1NTg4YzVkM2I3YjFjYWU0NWE2OWNjZTM4ZjU3ZTdmN2U1Yjg4YTkxNWMwM2JhOTdiYWJlZWI4OWE2NDMxNDg1Nzc4YTYyNGQ0ZDMwMTc5In0.eyJhdWQiOiI5OTk2IiwianRpIjoiZDU1ODhjNWQzYjdiMWNhZTQ1YTY5Y2NlMzhmNTdlN2Y3ZTViODhhOTE1YzAzYmE5N2JhYmVlYjg5YTY0MzE0ODU3NzhhNjI0ZDRkMzAxNzkiLCJpYXQiOjE1OTQyMDM0MzMsIm5iZiI6MTU5NDIwMzQzMywiZXhwIjoxNTk2Nzk1NDMzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.RfZI-G-vJsKB8AaAXLtoR93ilorPnOWqEkGnap18EVEOoiWsFwuQaxSpNzYrzSbPeskmo68FdWvfrfcS0IaXvtU2rwI3D1udVrUlz5oDD_Z7NJMB-Dm9qY6mWC2OTsaTyTgNJ2ZC2q8ZK1aTdoEWUv27QrAsYEu_thQgTvSIPn0RoSFwMa-MHH6v7ATGTFY8MNdrazi2VdvTSR49REcssAn5iNjxFX7C9XLwltOA3VKTtCjY6MjkeVOhVrc2Bgo1QDukFTNSWGiEX0nSm1xKAs-OIXRKxvmmt9Sm6lcaT_2WbyPVn6Mo3aO7AjjhtxPjQZZk1PKtFwRH4r-JJdY2SA";
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
    borderRadius: "50%",
    backgroundColor: "#FFC70029",
    border: "1px solid #FFC700",
  },
};
const clusterMarker = (coordinates: any, pointCount: number) => (
  <Mapir.Marker coordinates={coordinates} Image={EmptyMarker.src} style={styles.clusterMarker}>
    <div>{pointCount}</div>
  </Mapir.Marker>
);

type SelectedMarker = { id: string; coordinates: number[]; loading: boolean; data?: WebEstate };

const MapEstate = () => {
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker>();

  const router = useRouter();
  const { mapCoordinates } = useContext(WebPreviewContext) as WebPreviewContextType;
  const { fontFamily } = useContext(ThemeContext) as ThemeContextType;

  const [center, setCenter] = useState(mapCoordinates ? [+mapCoordinates[0], +mapCoordinates[1]] : [51.196246, 36.699735]);

  const onShowPopup = async (id: string, coordinates: number[]) => {
    setSelectedMarker({ id, coordinates, loading: true });

    try {
      setTimeout(() => {
        setSelectedMarker({
          //
          id,
          coordinates,
          loading: false,
          data: {
            _id: "",
            title: "خرید خانه خوب",
            slug: "",
            category: {
              _id: "",
              slug: "",
              title: "ویلا",
              description: "",
              icon: "",
              tags: [],
              parent: "",
            },
            gallery: [],
            image: {
              path: "property/I47tXy6CqYoX2KN0.jpeg",
              _id: "",
              title: "",
              alt: "",
              mimetype: "",
              filesize: 0,
              subject: "",
            },
            area: 400,
            province: "خراسان رضوی",
            city: "مشهد",
            district: "همین جا",
          },
        });
      }, 2000);
    } catch (err) {}
  };
  return (
    <div className="h-full" dir="ltr">
      <Mapir
        //

        Map={Map}
        center={center}
        className="!h-full !w-full"
        zoom={[16]}
        userLocation
        interactive
        onClick={() => setSelectedMarker(undefined)}
        hash
      >
        {/* zoom */}
        <Mapir.ZoomControl position="bottom-left" />
        <Mapir.Cluster zoomOnClick ClusterMarkerFactory={clusterMarker}>
          {nearPoints.map(({ coordinates, id }: { coordinates: number[]; id: string }, key: number) => (
            <Mapir.Marker
              //
              key={key}
              Image="https://map.ir/css/images/marker-default-yellow.svg"
              coordinates={coordinates}
              onClick={() => onShowPopup(id, coordinates)}
            />
          ))}
        </Mapir.Cluster>
        <div className={`absolute top-0 w-full bg-black/5 px-0 empty:hidden xl:pr-[1.5rem] ${fontFamily?.className}`}>
          <div className="relative h-full w-full px-[4.5rem] py-4 empty:hidden">
            {!mapCoordinates && (
              <div className="relative flex h-full w-full items-center justify-center bg-black/30 py-2.5 font-bold text-white">
                <span>موقعیت ملک ثبت نشده است</span>
              </div>
            )}
            {mapCoordinates && (
              <div className="relative flex h-full w-full items-center justify-center py-1 font-bold text-white">
                <Button
                  fullWidth
                  onClick={() => {
                    setCenter([+mapCoordinates[0], +mapCoordinates[1]]);
                  }}
                  size="sm"
                  color="secondary"
                >
                  موقعیت ملک
                </Button>
              </div>
            )}
          </div>
        </div>

        {!!mapCoordinates && (
          <>
            <Mapir.Marker
              //
              coordinates={mapCoordinates}
              className="[&>img]:animate-bounce"
              Image="https://map.ir/css/images/marker-default-green.svg"
            />
            {/* @ts-ignore */}
            <Mapir.Popup
              //
              coordinates={mapCoordinates}
              offset={[0, -50]}
              className="[&>.mapboxgl-popup-content]:overflow-hidden [&>.mapboxgl-popup-content]:rounded-2xl [&>.mapboxgl-popup-content]:p-0"
            >
              <Card isPressable shadow="none" className={fontFamily?.className}>
                <CardBody className="p-2">
                  <div className="h-full w-full">موقعیت ملک</div>
                </CardBody>
              </Card>
            </Mapir.Popup>
          </>
        )}

        {!!selectedMarker && (
          // @ts-ignore
          <Mapir.Popup
            //
            coordinates={selectedMarker.coordinates}
            offset={[0, -38]}
            className="[&>.mapboxgl-popup-content]:overflow-hidden [&>.mapboxgl-popup-content]:rounded-2xl [&>.mapboxgl-popup-content]:p-0"
          >
            <Card isPressable shadow="none" className={fontFamily?.className} onPress={() => router.push(`/property/${selectedMarker.data?.slug}`)}>
              <CardBody className="p-2">
                <div className="h-full w-full">
                  {selectedMarker.loading && (
                    <div className="flex items-center justify-center p-3">
                      <Spinner size="sm" />
                    </div>
                  )}
                  {!selectedMarker.loading && !selectedMarker.data && (
                    <div className="flex items-center justify-center p-3">
                      <p>چیزی پیدا نشد :(</p>
                    </div>
                  )}
                  {!selectedMarker.loading && !!selectedMarker.data && (
                    <div dir="rtl" className="flex flex-col items-start justify-center gap-1">
                      <Image
                        //
                        as={NextImage}
                        width={200}
                        height={200}
                        className="w-44"
                        src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + selectedMarker.data.image.path}
                        alt={selectedMarker.data.image.alt}
                      />
                      <h3 className="w-full whitespace-pre-wrap text-right font-bold">{selectedMarker.data.title}</h3>
                      {selectedMarker.data.category && (
                        <h6 className="flex items-center gap-1.5 font-bold">
                          {!!selectedMarker.data.category?.icon && <i className="h-4 w-4 fill-gray-800" dangerouslySetInnerHTML={{ __html: (selectedMarker.data.category.icon as Icon).content }} />}
                          <span>{selectedMarker.data.category?.title}</span>
                        </h6>
                      )}
                      <h5 className="flex items-center gap-1.5">
                        <b>متراژ:</b>
                        <span>{selectedMarker.data.area} مترمربع</span>
                      </h5>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Mapir.Popup>
        )}
      </Mapir>
    </div>
  );
};

export default MapEstate;

const nearPoints: { id: string; coordinates: number[] }[] = [];
